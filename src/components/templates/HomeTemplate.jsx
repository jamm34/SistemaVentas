import styled from "styled-components";
import { useAuthStore } from "../../store/AuthStore";
import { UserAuth } from "../../index";


export function HomeTemplate() {
  const { cerrarSesion } = useAuthStore();
 const {user} = UserAuth();

  return <Container>
    <span className="text-center">Home template</span>
    <button className="btn btn-primary" onClick={cerrarSesion}>Cerrar sesion</button>
    
  </Container>;
}
const Container = styled.div`
  height: 100vh;
`;
