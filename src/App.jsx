
import styled, { ThemeProvider } from "styled-components";
import { GlobalStyles, MyRoutes, useThemeStore } from "./index";
import { AuthContextProvider } from "./context/AuthContext";
import { useLocation } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  const { themeStyle } = useThemeStore();
  return (
    <ThemeProvider theme={themeStyle}>
      <AuthContextProvider >
        <GlobalStyles />
        <MyRoutes />
        <ReactQueryDevtools initialIsOpen={true} />
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;
