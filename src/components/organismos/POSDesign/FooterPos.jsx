import styled from "styled-components";
import { Device } from "../../../styles/Breakpoints";
import { Btn1 } from "../../moleculas/Btn1";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useCartVentasStore } from "../../../store/CartVentasStore";


export function FooterPos() {
  const { resetState } = useCartVentasStore();

  return (
    <Footer>
      <article className="content">
        <Btn1 color="#fff" bgcolor="#f44141" backfuncion={resetState} titulo="ELIMINAR VENTA" icono={<Icon icon="mdi:delete" />} />
        <Btn1 titulo="Ver ventas del dia y devoluciones" />
      </article>
    </Footer>
  );
};
const Footer = styled.div`
  grid-area: footer;  
  display: none;
  width: 100%;
  padding: 10px 10px;

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