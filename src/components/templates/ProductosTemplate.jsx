import styled from "styled-components";
import { Btn1, Buscador, Title, RegistrarProductos, TablaProductos, useProductosStore, GenerarCodigo } from "../../index";
import { v } from "../../styles/variables";
import { useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";

export function ProductosTemplate() {
    const [openRegistro, SetopenRegistro] = useState(false)
    const { dataProductos, setBuscador, generarCodigo } = useProductosStore();
    const [accion, setAccion] = useState("");
    const [dataSelect, setDataSelect] = useState([]);
    const [isExploding, setIsExploding] = useState(false);

    function nuevoRegistro() {
        SetopenRegistro(!openRegistro)
        setAccion("Nuevo")
        setDataSelect([])
        setIsExploding(false)
        generarCodigo();
    }

    return (
        <Container>
            {

                <RegistrarProductos setIsExploding={setIsExploding}
                    onClose={() => SetopenRegistro(!openRegistro)}
                    dataSelect={dataSelect}
                    accion={accion} state={openRegistro} />

            }
            <section className="area1">
                <Title>Productos</Title>
                <Btn1 funcion={nuevoRegistro} titulo="Nuevo" bgcolor={v.colorPrincipal} icono={<v.iconoagregar />} />
            </section>
            <section className="area2">
                <Buscador setBuscador={setBuscador} />
            </section>
            <section className="main">
                {
                    isExploding && <ConfettiExplosion />
                }
                <TablaProductos setDataSelect={setDataSelect} SetopenRegistro={SetopenRegistro} setAccion={setAccion} data={dataProductos} />
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
