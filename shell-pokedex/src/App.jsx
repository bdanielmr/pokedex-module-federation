import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { useAppStore } from "./shared/store";
import { GlobalStyle } from "./styles/GlobalStyle";
import { themes } from "./styles/themes";
import { TopBar } from "./components/TopBar";
import { ToastLastVisited } from "./components/ToastLastVisited";
import { LoadingFallback } from "./components/LoadingFallback";
import { AppRoutes } from "./routes/AppRoutes";

export default function App() {
  const theme = useAppStore((s) => s.theme);

  return (
    <ThemeProvider theme={themes[theme]}>
      <GlobalStyle />
      <BrowserRouter>
        <TopBar />
        <ToastLastVisited />
        <Suspense fallback={<LoadingFallback />}>
          <AppRoutes />
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}