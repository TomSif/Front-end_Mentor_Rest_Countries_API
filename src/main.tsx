import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { CountriesProvider } from "./context/CountriesProvider.tsx";
import { ThemeProvider } from "./context/ThemeProvider.tsx";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <CountriesProvider>
          <App />
        </CountriesProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
