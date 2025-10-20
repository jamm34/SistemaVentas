import styled from "styled-components";
import { Reloj, InputText2, Btn1, Device, ListaDesplegable } from '../../../index';
import { v } from "../../../styles/variables";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";

export function HeaderPos() {
    const [stateLectora, setStateLectora] = useState(true)
    const [stateTeclado, setStateTeclado] = useState(false)
    const [stateListaProductos, setStateListaProductos] = useState(false)
    return (
        <Header>
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
                        <input className='form__field' type='text' placeholder='Buscar...' />
                        <ListaDesplegable state={stateListaProductos} />
                    </InputText2>
                </article>
                <article className='area2'>
                    <Btn1
                        funcion={() => {
                            setStateLectora(true)
                            setStateTeclado(false)
                        }}
                        bgcolor={stateLectora ? "#5849fe" : ({ theme }) => theme.bgtotal}
                        border="2px"
                        titulo="Lectora"
                        color={stateLectora ? "#fff" : ({ theme }) => theme.text}
                        icono={<Icon icon="material-symbols:barcode-reader-outline" />} />
                    <Btn1
                        funcion={() => {
                            setStateLectora(false)
                            setStateTeclado(true)
                        }}
                        bgcolor={stateTeclado ? "#5849fe" : ({ theme }) => theme.bgtotal}
                        color={stateTeclado ? "#fff" : ({ theme }) => theme.text}

                        border="2px"
                        titulo="Teclado"
                        icono={<Icon icon="icon-park:enter-the-keyboard" />} />

                </article>
            </section>
        </Header>
    )
};
const Header = styled.div`
    grid-area: header;  
    display: flex;
    height: 100%; 
    
    flex-direction: column;
    gap: 10px;
    @media ${Device.desktop}{
    border-bottom:2px solid ${({ theme }) => theme.color1};
    }
    .contentprincipal{
    width: 100%;
    display: grid;
    grid-template-areas: "area1 area2"
        "area3 area3";
        .area1{
            grid-area: area1;
        }
        .area2{
            grid-area: area2;
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
        img{
            width: 40px;
            object-fit: contain;
        }
    }
}
    .contentbuscador {
    display: grid;
    grid-template-areas:
            "area2 area2"
            "area1 area1";
            gap: 10px;
            height: 100%;
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
            font-size: 14px;}
        }
        
`;