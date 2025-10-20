import { createGlobalStyle } from "styled-components";
import fondocuadros from "../assets/fondocuadros.svg";
export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    font-family: 'Rubik', sans-serif;
  }

  * {
    box-sizing: border-box;
  }
`;
