import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./i18n.ts";
import { DarkModeProvider } from "./contexts/dark_mode/DarkModeProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DarkModeProvider>
      <App />
    </DarkModeProvider>
  </StrictMode>
);
