import React from 'react';
import styled from 'styled-components';
import { Btn1, Device, TotalPos, useCartVentasStore } from '../../../index';



export function AreaTecladoPos() {
  const { setStatePantallaCobro } = useCartVentasStore();
  return (
    <Container>
      <section className='areatipopago'>
        <article className='box'>
          <Btn1 funcion={() => setStatePantallaCobro({ tipoCobro: "efectivo" })} titulo="EFECTIVO" border="0" height="70px" width="100%" bgcolor="#a6f868" />
          <Btn1 funcion={() => setStatePantallaCobro({ tipoCobro: "credito" })} titulo="CREDITO" border="0" height="70px" width="100%" bgcolor="#fb816c" />
        </article>
        <article className='box'>
          <Btn1 funcion={() => setStatePantallaCobro({ tipoCobro: "tarjeta" })} titulo="TARJETA" height="70px" width="100%" bgcolor='#fba259' />
          <Btn1 funcion={() => setStatePantallaCobro({ tipoCobro: "mixto" })} titulo="MIXTO" height="70px" width="100%" bgcolor="#919afd" />
        </article>
      </section>
      <section className='totales'>
        <div className='subtotales'>
          <span>Sub Total: <strong>$ 9.99</strong></span>
          <span>IGV (18%): $0.00</span>
          <span>Sub Total: <strong>$ 9.99</strong></span>
        </div>
        <TotalPos />
      </section>
    </Container>
  );
};
const Container = styled.div`
  border: 2px solid ${({ theme }) => theme.color1};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  width: 100%;
  border-radius: 15px;

  @media ${Device.desktop} {
    z-index: 10;
    width: auto;
  }

  .areatipopago {
    display: none;

    @media ${Device.desktop} {
      display: flex;
      flex-direction: column;
    }

    .box {
      display: flex;
      gap: 20px;
      margin: 10px;
    }
  } 

  .totales {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;

    .subtotales {
      display: none;
      flex-direction: column;
      justify-content: end;
      text-align: end;
      gap: 10px;
      font-weight: 500;

      @media ${Device.desktop} {
        display: flex;
      }
    }
  }
`;
