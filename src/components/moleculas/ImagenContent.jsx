import styled from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { v } from "../../styles/variables";
import 'react-lazy-load-image-component/src/effects/blur.css';


export function ImagenContent({imagen}) {
    return (
        <Container>
            <LazyLoadImage placeholderSrc={<v.iconoreact/>}>
                effect="blur"
                src={imagen}
                width={50}
                height={50}
            </LazyLoadImage>
        </Container>
    )
}
const Container = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 10%;
    overflow: hidden;
    img{
        object-fit: cover;
    }
`;