import styled from "styled-components"
import { useCartVentasStore } from "../../../store/CartVentasStore"
import { Icon } from "@iconify/react/dist/iconify.js";
import { InputText } from "../formularios/inputText";
import { FormatearNumeroDinero } from "../../../utils/Conversiones";
import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { Btn1 } from "../../moleculas/Btn1";
import { useUsuariosStore } from "../../../store/UsuariosStore";
import { useSucursalesStore } from "../../../store/SucursalesStore";
import { useEmpresaStore } from "../../../store/EmpresaStore";
import { useVentasStore } from "../../../store/VentasStore";
import { useDetalleVentasStore } from "../../../store/DetalleVentasStore";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

export const IngresoCobro = forwardRef((props, ref) => {
    const { tipoCobro, total, items, setStatePantallaCobro, resetState } = useCartVentasStore();
    const { dataUsuarios } = useUsuariosStore();
    const { dataSucursalesAsignadas } = useSucursalesStore();
    const { dataempresa } = useEmpresaStore();
    const { idVenta, insertarVentas, resetearVentas } = useVentasStore();
    const { insertarDetalleVentas } = useDetalleVentasStore();

    //Valores a calcular
    const [precioVenta, setPrecioVenta] = useState(total);
    const [valorTarjeta, setValorTarjeta] = useState(tipoCobro === "tarjeta" ? total : 0);
    const [valorCredito, setValorCredito] = useState(tipoCobro === "credito" ? total : 0);
    const [valorEfectivo, setValorEfectivo] = useState(tipoCobro === "efectivo" ? total : 0);

    // Valores a mostrar
    const [vuelto, setVuelto] = useState(0);
    const [restante, setRestante] = useState(0)


    const calcularVueltoYRestante = () => {
        const totalPagado = valorTarjeta + valorCredito + valorEfectivo
        if (totalPagado >= precioVenta) {
            setVuelto(totalPagado - precioVenta)
            setRestante(0)
        } else {
            setVuelto(0)
            setRestante(precioVenta - totalPagado)
        }
    }
    //Manejadores de cambio
    const handleChangeValorEfectivo = (event) => {
        const value = parseFloat(event.target.value) || 0;
        setValorEfectivo(value)
    }
    const handleChangeValorCredito = (event) => {
        const value = parseFloat(event.target.value) || 0;
        setValorCredito(value)
    }
    const handleChangeValorTarjeta = (event) => {
        const value = parseFloat(event.target.value) || 0;
        setValorTarjeta(value)
    }
    //exponiendo la mutacion
    useImperativeHandle(ref, () => ({
        mutateAsync: mutation.mutateAsync
    }))
    //Funcion para insertar ventas
    const mutation = useMutation({
        mutationKey: "Insertar ventas",
        mutationFn: funcion_insertarVenta,
        onSuccess: () => {
            if (restante != 0) {
                return;
            }
            setStatePantallaCobro({ tipoCobro: "" })
            resetState()
            resetearVentas()
            toast.success("Venta realizada con exito")
        }
    })
    async function funcion_insertarVenta() {
        if (restante === 0) {
            const pVentas = {
                id_usuario: dataUsuarios?.id,
                id_sucursal: dataSucursalesAsignadas?.id_sucursal,
                id_empresa: dataempresa?.id_empresa,
                estado: "confirmada",
                vuelto: vuelto,
                efectivo: parseFloat(valorEfectivo),
                tarjeta: parseFloat(valorTarjeta),
                credito: parseFloat(valorCredito),
                monto_total: total,
                tipo_de_pago: tipoCobro
            };
            if (idVenta === 0) {
                const result = await insertarVentas(pVentas)
                items.forEach(async (item) => {
                    if (result?.id > 0) {
                        item._id_venta = result?.id
                        await insertarDetalleVentas(item)
                    }
                })
            }
        } else {
            toast.warning("Falta completar el pago el restante tien que ser cero")
        }


    }
    //Useefect para recalcula cuando los valores cambian
    useEffect(() => {
        calcularVueltoYRestante()
    }, [valorTarjeta, valorCredito, valorEfectivo, precioVenta])

    return (
        <Container>
            {
                mutation.isPending ? (<span>Guardando...</span>) : (<>
                    {
                        mutation.isError && <span>{mutation.error.message}</span>
                    }
                    <section className="area1">
                        <span className="tipocobro">{tipoCobro}</span>
                        <Icon className="" icon="fluent-emoji:smiling-face-with-sunglasses" />
                        <span>Cliente</span>
                        <span className="cliente">Apellido</span>
                    </section>
                    <Linea />
                    <section className="area2">
                        {tipoCobro != 'efectivo' && tipoCobro != "mixto" ? null : (
                            <InputText textalign="center">
                                <input onChange={handleChangeValorEfectivo} defaultValue={tipoCobro === "mixto" ? "" : total} className="form__field" type="number" />
                                <label className="form__label">Efectivo</label>

                            </InputText>
                        )}
                        {tipoCobro != 'tarjeta' && tipoCobro != "mixto" ? null : (
                            <InputText textalign="center">
                                <input onChange={handleChangeValorTarjeta} defaultValue={tipoCobro === "mixto" ? "" : total} disabled={tipoCobro === "mixto" ? false : true} className="form__field" type="number" />
                                <label className="form__label">Tarjeta</label>

                            </InputText>
                        )}
                        {tipoCobro != 'credito' && tipoCobro != "mixto" ? null : (
                            <InputText textalign="center">
                                <input onChange={handleChangeValorCredito} defaultValue={tipoCobro === "mixto" ? "" : total} disabled={tipoCobro === "mixto" ? false : true} className="form__field" type="number" />
                                <label className="form__label">Credito</label>

                            </InputText>
                        )}

                    </section>
                    <Linea />
                    <section className="area3">
                        <article>
                            <span className="total">Total:</span>
                            <span>Vuelto:</span>
                            <span>Restante:</span>
                        </article>
                        <article>
                            <span className="total">{FormatearNumeroDinero(total)}</span>
                            <span>{vuelto}</span>
                            <span>{restante}</span>
                        </article>
                    </section>
                    <Linea />
                    <section className="area4">
                        <Btn1 funcion={() => mutation.mutateAsync()} border="2px" titulo="Cobrar" bgcolor="#0aca21" color="#ffffff" width="100%" />
                    </section>
                </>)
            }

        </Container>

    )
})

const Container = styled.div`
    position: relative;
    width: 100%;
    max-width: 330px; /* Reducido */
    padding: 18px;
    border-radius: 14px;

    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(6px);
    border: 1px solid rgba(255, 255, 255, 0.4);
    box-shadow: 0 4px 14px rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
    gap: 10px;

    font-size: 16px;
    color: #222;

    .area1 {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3px;

        .tipocobro {
            position: absolute;
            right: 8px;
            top: 8px;
            background: linear-gradient(90deg, #ff85d8, #ff44b5);
            padding: 4px 8px;
            border-radius: 6px;
            font-size: 11px;
            font-weight: 700;
            color: white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.15);
        }
        .cliente{
            font-weight: 700;
            font-size: 18px;
        }

        svg {
            font-size: 30px; /* Más pequeño */
        }

        .cliente {
            font-size: 18px;
            font-weight: 600;
        }
    }

    .area2 {
        display: flex;
        flex-direction: column;
        gap: 10px;

        input {
            font-size: 24px; /* Reducido */
            text-align: center;
            font-weight: 700;
            padding: 4px 0;
            border-radius: 8px;
            border: 2px solid #e7e7e7;
            transition: 0.2s;

            &:focus {
                border-color: #46a5ff;
                box-shadow: 0 0 6px rgba(70,165,255,0.25);
            }
        }
    }

    .area3 {
        display: flex;
        justify-content: space-between;
        padding: 3px 0;

        article {
            display: flex;
            flex-direction: column;
            gap: 3px;
        }

        span {
            font-size: 16px;
        }

        .total {
            font-weight: 700;
            font-size: 15px;
            color: #0b7de1;
        }
    }

    .area4 {
        width: 100%;
        margin-top: 5px;
    }
`;



const Linea = styled.div`
    width: 100%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    margin: 5px 0;
`;

