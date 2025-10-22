import styled from 'styled-components';
import { Sidebar, SwitchHambur, useUsuariosStore, Spinner1, useEmpresaStore, } from '../index';
import { useState } from 'react';
import { Device } from "../styles/Breakpoints";
import { useQuery } from "@tanstack/react-query";


export function Layout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { dataUsuarios, MostrarUsuarios } = useUsuariosStore();
    const { mostrarEmpresa } = useEmpresaStore();
    const { isLoading, error } = useQuery({ queryKey: ["mostrar usuarios"], queryFn: MostrarUsuarios, refetchOnWindowFocus: false });

    const { data: dtempresa } = useQuery({
        queryKey: ["mostrar empresa", dataUsuarios?.id],
        queryFn: () => mostrarEmpresa
            ({ _id_usuario: dataUsuarios?.id }), enabled: !!dataUsuarios?.id, refetchOnWindowFocus: false
    });

    if (isLoading) {
        return <Spinner1 />
    }
    if (error) {
        return <span>Error: {error.message}</span>
    }
    return (
        <Container className={sidebarOpen ? "active" : ""}>

            <section className="contentSidebar">
                <Sidebar
                    state={sidebarOpen}
                    setState={() => setSidebarOpen(!sidebarOpen)}
                />
            </section>
            <section className="contentMenuHamburg"><SwitchHambur /></section>
            <ContainerBody>
                {children}
            </ContainerBody>
        </Container>
    );
};

const Container = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  transition: 0.1s ease-in-out;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.bgtotal};
  .contentSidebar {
    display: none;
  }
  .contentMenuHamburg {
    display: block;
    position: absolute;
  }

  @media ${Device.desktop} {
    grid-template-columns: 88px 1fr;
    &.active {
      grid-template-columns: 260px 1fr;
    }
    .contentSidebar {
      display: initial;
    }
    .contentMenuHamburg {
      position: none;
      display: none;
    }
    
  }
`;
const ContainerBody = styled.div`
    grid-column: 1;
    width: 100%;
    @media ${Device.desktop} {
        grid-column: 2;
    }
`