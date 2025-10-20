import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { GlobalStyles, MyRoutes, Sidebar, useThemeStore, Login, SwitchHambur } from "./index";
import { Device } from "./styles/Breakpoints";
import { AuthContextProvider } from "./context/AuthContext";
import { useLocation } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { themeStyle } = useThemeStore();
  const { pathname } = useLocation();
  return (
    <ThemeProvider theme={themeStyle}>
      <AuthContextProvider >
        <GlobalStyles />
        {
          pathname != "/login" ? (<Container className={sidebarOpen ? "active" : ""}>

            <section className="contentSidebar">
              <Sidebar
                state={sidebarOpen}
                setState={() => setSidebarOpen(!sidebarOpen)}
              />
            </section>
            <section className="contentMenuHamburg"><SwitchHambur /></section>
            <section className="contentRouters">
              <MyRoutes />
            </section>
          </Container>) : (<Login />)
        }
        <ReactQueryDevtools initialIsOpen={true} />
      </AuthContextProvider>
    </ThemeProvider>
  );
}
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

  .contentRouters {
    grid-column: 1;
    width: 100%;
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
    .contentRouters {
      grid-column: 2;
    }
  }
`;
export default App;
