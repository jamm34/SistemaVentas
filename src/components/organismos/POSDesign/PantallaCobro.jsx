import { Icon } from '@iconify/react/dist/iconify.js';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components'
import { useCartVentasStore } from '../../../store/CartVentasStore';
import { IngresoCobro } from './IngresoCobro';


export function PantallaCobro() {
    const [stateVerTicket, setStateVerTicket] = useState(false);
    const { setStatePantallaCobro } = useCartVentasStore();
    const ingresoCobro = useRef();
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Enter") {
                event.preventDefault(); //Evita el comportamiento por default de presionar enter (como cerrar la vista)
                if (ingresoCobro.current) {
                    ingresoCobro.current.mutateAsync();
                }
            }
            document.addEventListener('keydown', handleKeyDown);
            return () => {
                document.removeEventListener('keydown', handleKeyDown);
            }
        }
    }, [])

    return (
        <Container >
            <section className='contentingresocobro'>
                <article className='contentverticket' onClick={() => setStateVerTicket(!stateVerTicket)}>
                    <span >{stateVerTicket ? "ocultar" : "mostrar"} ticket</span>
                    {stateVerTicket ? (<Icon className='icono' icon="fluent-emoji:monkey-face" />) :
                        (<Icon className='icono' icon="fluent-emoji:see-no-evil-monkey" />)}
                </article>
                <IngresoCobro ref={ingresoCobro} />
                <article className='contentingresopago' onClick={setStatePantallaCobro}>
                    <Icon className='icono' icon="ep:arrow-left-bold" />
                    <span> Volver</span>
                </article>
            </section>
        </Container>
    )
}

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 100;
    background-color: ${({ theme }) => theme.bgTotal};
    .contentingresocobro{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
        height:calc(100% - 10rem);

        .contentverticket{
        align-self: flex-end;
        cursor: pointer;
        display: flex;
        gap: 20px;
        align-items: center;
        span{
            font-weight: 700;
            font-size: 18px;
            }
            .icono{
                font-size: 30px;
            }
        }
    }
`