import styled from "styled-components";

export function SpinnerSecundario({ texto }) {
    return (
        <Container>
            <span>Texto</span>
        </Container>
    );
}

const Container = styled.div`
    height: 100%vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;    
`