import styled from "styled-components";
import { Device } from "../../../styles/Breakpoints";
import { Btn1 } from "../../moleculas/Btn1";

export function FooterPos() {
    return (
        <Footer>
            <article className="content">
                <Btn1 titulo="ELIMINAR" />
                <Btn1 titulo="Ver ventas del dia y devoluciones" />
                <Btn1 titulo="ACTUALIZAR" />
                <Btn1 titulo="ELIMINAR" />
            </article>
        </Footer>
    );
};
const Footer = styled.div`
  grid-area: footer;  
  display: none;
  width: 100%;
  padding: 10px 15px;

  @media ${Device.desktop} {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .content {
    display: flex;
    align-items: center;
    gap: 6px;
  }
`;