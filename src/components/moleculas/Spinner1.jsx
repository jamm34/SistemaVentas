import styled from "styled-components";
import { GridLoader } from "react-spinners";

export function Spinner1() {
    return (
    <Container>
        <GridLoader color="#080696ff" size={40} />
    </Container>
    )
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;