import styled from "styled-components";
import { Btn1 } from "../../moleculas/Btn1";
import { Device } from "../../../styles/Breakpoints";


export function TotalPos() {
    return (
        <Container>
            <section className="imagen">
                <img src="https://i.ibb.co/HdYgDdp/corazon-2.png" alt="" />
            </section>
            <section className="contentTotal">
                <section className="contentTituloTotal">
                    <Btn1 titulo="COBRAR" />
                    <Btn1 titulo="..." />
                </section>
                <span>$ 9.99</span>
            </section>

        </Container>
    );
};
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;
  border-radius: 15px;
  font-weight: 700;
  font-size: 40px;
  background-color: #3ff563;
  padding: 10px;
  color: #207c33;
  position: relative;
  overflow: hidden;
  z-index: 1;

  &::after {
    content: "";
    display: block;
    width: 100px;
    height: 100px;
    background-color: #03ec03d3;
    position: absolute;
    border-radius: 50%;
    top: -20px;
    left: -15px;
    z-index: 0;
  }

  &::before {
    content: "";
    display: block;
    width: 20px;
    height: 20px;
    background-color: #03ec03d3;
    position: absolute;
    border-radius: 50%;
    top: 5px;
    right: 5px;
    z-index: 0;
  }

  .imagen {
    z-index: 2;
    width: 55px;
    position: relative;

    @media ${Device.desktop} {
      bottom: initial;
    }

    img {
      width: 100%;
    }
  }

  .contentTotal {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .contentTituloTotal {
      display: flex;
      align-items: center;
      gap: 10px;

      @media ${Device.desktop} {
        display: none;
      }
    }
  }
`;