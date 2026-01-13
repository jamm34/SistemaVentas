import styled from "styled-components";
import { useVentasStore } from "../../../store/VentasStore";
import { blur_in } from "../../../styles/Keyframes";
import { Icon } from "@iconify/react/dist/iconify.js";
import { FormatearNumeroDinero } from '../../../utils/Conversiones';
import LottieAnimation from "../../atomos/LottieAnimation";
import animacion from '../../../assets/animacion.json';
import { Btn1 } from "../../moleculas/Btn1";
import { useCartVentasStore } from "../../../store/CartVentasStore";

export function AreaDetalleVentaPos() {
    const { items, addCantidadItem, restarCantidadItem, removeItem } = useCartVentasStore();

    return (
        <AreaDetalleVenta className={items.length > 0 ? "" : "animacion"}>
            <Header>
                <div className="col producto">Producto</div>
                <div className="col precio">Precio</div>
                <div className="col importe">Importe</div>
                <div className="col cantidad">Cant.</div>
                <div className="col acciones">Agreg.</div>
                <div className="col acciones">Acc.</div>
            </Header>
            {
                items.length > 0 ? items.map((item, index) => {

                    return (
                        <ItemVenta key={index}>
                            <article className='producto'>
                                <span className="label">Producto:</span>
                                <span className='descripcion'>{item._descripcion}</span>
                            </article>

                            <article className='precio'>
                                <span className="label">Precio:</span>
                                <span> {FormatearNumeroDinero(item._precio_venta)}</span>
                            </article>

                            <article className='importe'>
                                <span className="label">Importe:</span>
                                <span><Icon icon="mdi:currency-usd" width="16" height="16" /> {item._total}</span>
                            </article>

                            <article className="cantidad">
                                <span className="label">Cant:</span>
                                <span><strong>{item._cantidad}</strong></span>
                            </article>
                            <article className="agregar">
                                <Btn1 funcion={() => addCantidadItem(item)} className="contentbtn" height="5px" width="5px" icono={<Icon icon="mdi:add-bold" />}>

                                </Btn1>
                                <Btn1 funcion={() => restarCantidadItem(item)} className="contentbtn" height="5px" width="5px" icono={<Icon icon="subway:subtraction-1" />}>

                                </Btn1>
                            </article>
                            <article className="acciones" title="Eliminar">
                                <span className="delete" onClick={() => removeItem(item)}><Icon icon="mdi:trash-can-outline" width="20" height="20" /></span>
                            </article>
                        </ItemVenta>
                    )
                }) : (<LottieAnimation animacion={animacion} />)
            }
        </AreaDetalleVenta>
    )
}

const AreaDetalleVenta = styled.section`
    display: flex;
    width: 100%;
    margin-top: 12px;
    flex-direction: column;
    gap: 10px;
    padding-bottom: 6px;
    flex-grow: 1;
    overflow-y: auto;
`;

/* Header row with column titles */
const Header = styled.header`
    display: grid;
    grid-template-columns: 1fr 90px 90px 70px 90px 54px;
    gap: 12px;
    align-items: center;
    font-size: 13px;
    color: ${({ theme }) => theme.muted || "#666"};
    padding: 6px 12px;
    border-radius: 8px;
    background: ${({ theme }) => theme.headerBackground || "transparent"};
    user-select: none;

    .col{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    @media (max-width: 520px){
        display: none; /* header hidden on small screens, labels appear inside items */
    }
`;

/* Card for each item: soft background, rounded, subtle shadow and animation */
const ItemVenta = styled.section`
    display: grid;
    grid-template-columns: 1fr 90px 90px 70px 90px 54px;
    gap: 12px;
    align-items: center;
    width: 100%;
    animation: ${blur_in} 0.35s ease both;
    background: ${({ theme }) => theme.cardBackground || "#ffffff"};
    color: ${({ theme }) => theme.text || "#222"};
    border-radius: 8px;
    padding: 12px;
    box-shadow: 0 1px 4px rgba(10,10,10,0.04);
    border: 1px solid ${({ theme }) => theme.color2 || "#e6e6e6"};
    transition: transform .12s ease, box-shadow .12s ease, border-color .12s ease;

    &:hover{
        transform: translateY(-3px);
        box-shadow: 0 6px 18px rgba(10,10,10,0.08);
        border-color: ${({ theme }) => theme.primary || "#cfcfcf"};
    }

    .producto{
        display: flex;
        gap: 12px;
        align-items: center;
        min-width: 0; /* allow truncation */
        .descripcion{
            font-weight: 700;
            font-size: 15px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: ${({ theme }) => theme.primaryText || "#111"};
            max-width: 100%;
        }
    }
    .contentbtn{
        display: flex;
        text-align: center;
        font-size: 13px;
        font-weight: 700;
        width: 28px;
        height: 100%;
        padding: 0;
        
        }

    .precio, .importe{
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 13px;
        color: ${({ theme }) => theme.muted || "#666"};
        justify-content: flex-start;
    }
    

    .importe{
        font-weight: 600;
        color: ${({ theme }) => theme.accent || "#1b7cff"};
    }

    .cantidad{
        display: flex;
        align-items: start;
        font-size: 13px;
        color: ${({ theme }) => theme.text || "#333"};
    }

    /* Ajuste para columna "agregar": botones alineados abajo */
    .agregar{
        display: flex;
        gap: 8px;
        align-items: center;
        justify-content: flex-end;
        align-self: end; /* empuja la columna hacia abajo dentro del grid */
        min-height: 48px; /* garantizar algo de espacio para que el align-self tenga efecto */
        font-size: 13px;
    }

    .acciones{
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .delete{
        color: ${({ theme }) => theme.danger || "#c23d3d"};
        cursor: pointer;
        opacity: 0;
        transform: translateY(2px);
        transition: opacity .14s ease, transform .14s ease;
        display: inline-flex;
        padding: 6px;
        border-radius: 6px;
    }

    &:hover .delete{
        opacity: 1;
        transform: translateY(0);
        background: rgba(0,0,0,0.03);
    }

    /* Labels visible only on small screens so header can be hidden */
    .label{
        display: none;
        font-weight: 700;
        margin-right: 6px;
        color: ${({ theme }) => theme.muted || "#666"};
    }

    @media (max-width: 520px){
        grid-template-columns: 1fr;
        align-items: stretch;
        padding: 10px;
        gap: 8px;

        .producto, .precio, .importe, .cantidad, .acciones{
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .producto{ margin-bottom: 2px; }
        .precio, .importe{ font-size: 14px; }
        .cantidad{ justify-content: space-between; }

        .label{
            display: inline-block;
        }

        .delete{
            opacity: 1; /* always visible on mobile for easier access */
            transform: none;
            background: transparent;
            padding: 4px;
        }

        /* En móvil, deja los botones en fila a la derecha */
        .agregar{
            flex-direction: row;
            gap: 8px;
            justify-content: flex-end;
            align-items: center;
            align-self: auto;
        }
    }
`;
