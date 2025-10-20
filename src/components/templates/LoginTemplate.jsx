import styled from "styled-components";
import { Title, InputText2, Btn1, Linea, Device, Footer, useAuthStore, v } from "../../index";


export function LoginTemplate() {
  const {loginGoogle} = useAuthStore()
  
  return (
    <Container>
      <div className="card">
        <ContentLogo>
          <img src={v.logo} />
          <span>Rosa's Shop</span>
        </ContentLogo>
        <Title $paddingbottom="20px">Ingresar</Title>
        <form>
          <InputText2>
            <input className="form__field" placeholder="email" type="text" />
            <input
              className="form__field"
              placeholder="contraseña "
              type="password"
            />
          </InputText2>
          <Btn1
            titulo="INGRESAR"
            bgcolor="#1CB0F6"
            color="255,255,255"
            width="100%"
          />
        </form> 
        <Linea>
          <span></span>
        </Linea>
        <Btn1
          funcion={loginGoogle}
            titulo="Google"
            bgcolor="#fff"
            icono={<v.iconogoogle />}>
        </Btn1>
      </div>
      <Footer />
    </Container>
  );
}
const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  padding:0 10px;
  color: ${({ theme }) => theme.text};
  .card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    width: 100%;
    margin: 35px;
    @media ${Device.tablet} {
      width: 400px;
    }
  }
`;
const ContentLogo = styled.div`
display:flex;
align-items: center;
justify-content: center;
margin: 20px;
span {
  font-weight: 700;
}
img {
width: 10%;
};
`
