import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./i18n.ts";
import { DarkModeProvider } from "./contexts/dark_mode/DarkModeProvider.tsx";
import { CurrentUserProvider } from "./contexts/user/UserProvider.tsx";
import { BrowserRouter as Router } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <DarkModeProvider>
        <CurrentUserProvider>
          <App />
        </CurrentUserProvider>
      </DarkModeProvider>
    </Router>
  </StrictMode>
);
