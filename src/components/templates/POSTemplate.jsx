import React from 'react';
import styled from 'styled-components';
import { Device } from "../../styles/Breakpoints";
import { blur_in } from "../../styles/Keyframes";
import { AreaDetalleVentaPos, HeaderPos, AreaTecladoPos, FooterPos } from '../../index';



export function POSTemplate({ }) {
  return (
    <Container>
      <HeaderPos />
      <Main>
        <AreaDetalleVentaPos />
        <AreaTecladoPos />
      </Main>
      <FooterPos />
    </Container>
  );
};

const Container = styled.div`
  height: calc(100vh - 40px);
  padding: 10px;
  padding-top: 50px;
  display: grid;
  gap: 10px;
  grid-template-areas:
  "header"
  "main";
  grid-template-rows: auto 1fr;

  animation ${blur_in} 0.5s linear both;

  @media ${Device.desktop} {
    grid-template-areas:
      "header header"
      "main main"
      "footer footer";
    /* main queda en blanco (ocupa el espacio restante) */
    grid-template-rows: 140px minmax(0, 1fr) 0px;
  }
`;

const Main = styled.div`
    grid-area: main;    
    display: flex;
    flex-direction: column;
    width: 100%;
    position: relative;
    overflow: hidden;
    gap: 10px;
    @media ${Device.desktop} {
    flex-direction: row;
    }
`;

