import styled from "styled-components";
import { Reloj, InputText2, Btn1, Device, ListaDesplegable, useProductosStore, useSucursalesStore, useCartVentasStore } from '../../../index';
import { v } from "../../../styles/Variables";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useRef, useState } from "react";

export function HeaderPos() {
    const [stateLectora, setStateLectora] = useState(true)
    const [stateTeclado, setStateTeclado] = useState(false)
    const [stateListaProductos, setStateListaProductos] = useState(false)

    const { setBuscador, dataProductos, selectProductos, buscador } = useProductosStore();
    const { sucursalesItemSelectAsignadas } = useSucursalesStore();
    const { addItem } = useCartVentasStore();
    const buscadorRef = useRef(null);

    function focusClick() {
        buscadorRef.current.focus();
        buscadorRef.current.value.trim() === "" ? setStateListaProductos(false) :
            setStateListaProductos(true)
    }

    function buscar(e) {
        setBuscador(e.target.value)
        let texto = e.target.value;
        if (texto.trim() === "" || stateLectora) {
            setStateListaProductos(false);
        }
        else {
            setStateListaProductos(true);
        }
    };

    async function funcion_insertarVenta() {
        const productosItemSelect = useProductosStore.getState().productosItemSelect;
        const pDetalleVenta = {
            _id_venta: 1,
            _cantidad: 1,
            _precio_venta: productosItemSelect.precio_venta,
            _total: 1 * productosItemSelect.precio_venta,
            _descripcion: productosItemSelect.nombre,
            _id_producto: productosItemSelect.id,
            _precio_compra: productosItemSelect.precio_compra,
            _id_sucursal: sucursalesItemSelectAsignadas.id_sucursal,
        };
        addItem(pDetalleVenta);
        setBuscador("");
        buscadorRef.current.focus();

    }

    useEffect(() => {
        if (stateLectora) {
            setStateListaProductos(prev => (prev ? false : prev))
        }
    }, [stateLectora])

    useEffect(() => {
        buscadorRef.current.focus();
        // eliminarventasIncompletas({ id_usuario: dataUsuarios?.id })
    }, [])

    return (
        <Header>
            <ContentSucursal>
                <strong>Sucursal: </strong> {sucursalesItemSelectAsignadas?.sucursal}
            </ContentSucursal>
            <section className='contentprincipal'>
                <ContentUser className='area1'>
                    <div className='contentimg'>
                        <img src="https://th.bing.com/th/id/OIP.LFafu9L4K2CcP5kJMvAsdgHaHa?w=205&h=205&c=7&r=0&o=7&pid=1.7&rm=3" />
                    </div>
                    <div className='textos'>
                        <span className="usuario">Carlitos</span>
                        <span>cajero</span>
                    </div>
                </ContentUser>
                <article className='contentlogo area2'>
                    <img src={v.logo} alt="" />
                    <span>JAM web 3.0</span>
                </article>
                <article className='contentfecha area3'>
                    <Reloj />
                </article>
            </section>
            <section className='contentbuscador'>
                <article className='area1'>
                    <InputText2 >
                        <input
                            value={buscador}
                            ref={buscadorRef}
                            onChange={buscar}
                            className='form__field'
                            type='search'
                            placeholder='Buscar...' />
                        <ListaDesplegable
                            funcionCrud={funcion_insertarVenta}
                            funcion={selectProductos}
                            setState={() =>
                                setStateListaProductos(!stateListaProductos)}
                            data={dataProductos}
                            state={stateListaProductos} />
                    </InputText2>
                </article>
                <article className='area2'>
                    <Btn1
                        funcion={() => {
                            setStateLectora(true)
                            setStateTeclado(false)
                            setStateListaProductos(false)
                            focusClick()
                        }}
                        bgcolor={stateLectora ? "#5849fe" : ({ theme }) => theme.bgtotal}
                        border="2px"
                        titulo="Lectora"
                        color={stateLectora ? "#fff" : ({ theme }) => theme.bgtotal}
                        icono={<Icon icon="material-symbols:barcode-reader-outline" />} />
                    <Btn1
                        funcion={() => {
                            setStateLectora(false)
                            setStateTeclado(true)
                            focusClick()
                        }}
                        bgcolor={stateTeclado ? "#5849fe" : ({ theme }) => theme.bgtotal}
                        color={stateTeclado ? "#fff" : ({ theme }) => theme.color1}
                        border="2px"
                        titulo="Teclado"
                        icono={<Icon icon="icon-park:enter-the-keyboard" />} />

                </article>
            </section>
        </Header>
    )
};
const ContentSucursal = styled.section`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    
`;
const Header = styled.div`
    grid-area: header;  
    display: flex;
    gap: 10px;
    height: 100%; 
    flex-direction: column;
    @media ${Device.desktop}{
    border-bottom:2px solid ${({ theme }) => theme.color1};
    }
    .contentprincipal{
    width: 100%;
    display: grid;
    margin-top: -5px;   
    border-top:2px solid ${({ theme }) => theme.color1};
    grid-template-areas: "area1 area2 area3";
    grid-template-columns: auto 1fr auto;
    align-items: center;
        .area1{
            grid-area: area1;
        }
        .area2{
            grid-area: area2;
            justify-self: center;
        }
        .area3{
            grid-area: area3;
        }
            @media ${Device.desktop}{
            display: flex;
            justify-content: space-between;
            }
    .contentlogo{
        display: flex;
        align-items: center;
        font-weight: 700;
        font-size: 12px;
        img{
            width: 40px;
            object-fit: contain;
        }
    }
    .contentfecha{
        display: flex;  
        justify-content: flex-end;
        font-size: 14px;

        }
}
    .contentbuscador {
    display: grid;
    
    grid-template-areas:
            "area2 area2"
            "area1 area1";
            gap: 10px;
            align-items: center;
            position-relative;

    .area1 {
        grid-area: area1;
    }
    .area2 {
        grid-area: area2;
        display: flex;
        gap: 10px;
    }
        @media ${Device.desktop}{
        display: flex;
        justify-content: flex-start;
        gap: 10px;
        area1{
            width: 400vw;}
        }
}
`;

const ContentUser = styled.div`
display: flex;
align-items:center ;
gap: 12px;

    .contentimg{
        display: flex;
        align-items: center;
        width: 40px;
        height:40px;
        border-radius: 50%;
        overflow: hidden;
        img{
            width: 100%;
            object-fit: cover;            
            }
        }
        .textos{
        display: flex;
        flex-direction: column;
        .usuario{
            font-weight: 700;
            font-size: 12px;}
        }
        
`;