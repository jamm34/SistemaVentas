import styled from "styled-components"
import { Title, Btn1, Buscador, useCategoriasStore, TablaCategorias, RegistrarCategorias } from "../../index"
import { v } from "../../styles/variables";
import {useState} from "react";
import ConfettiExplosion from "react-confetti-explosion";

export function CategoriasTemplate(){
    const [openRegistro, SetopenRegistro] = useState(false)
    const {datacategorias, setBuscador } = useCategoriasStore()
    const [accion, setAccion] = useState("");
    const [dataSelect, setDataSelect] = useState([null]);
    const [isExploding, setIsExploding] = useState(false);

    function nuevoRegistro (){
        SetopenRegistro(!openRegistro)
        setAccion("Nuevo")
        setDataSelect([])
        setIsExploding(false)
    }

    return(
    <Container>
        {
            openRegistro && (
            <RegistrarCategorias setIsExploding={setIsExploding}
                onClose={()=> SetopenRegistro(!openRegistro)} 
                dataSelect={dataSelect}
                accion={accion}/>)
                
        }
        <section className="area1">
            <Title>Categorias</Title>
            <Btn1 funcion={nuevoRegistro} titulo="Nuevo" bgcolor={v.colorPrincipal} icono={<v.iconoagregar/>}/>
        </section>
        <section className="area2">
            <Buscador setBuscador={setBuscador}/>
        </section>
        <section className="main">
            {
                isExploding && <ConfettiExplosion />
            }
            <TablaCategorias setdataSelect={setDataSelect} SetopenRegistro={SetopenRegistro} setAccion={setAccion} data={datacategorias}/>
        </section>
    </Container>)
}
const Container = styled.div`
    height: calc(100vh -30px);
    padding: 15px;
    display: grid;
    grid-template:
    "area1" 60px
    "area2" 60px
    "main" auto;
    .area1{
        grid-area: area1;
        display: flex;
        justify-content: end;
        align-items: center;
        gap: 15px;
    }
    .area2{
    grid-area: area2;      
    display: flex;
    justify-content: end;
    align-items: center;
    }
    .main{
        grid-area: main;
    }
`