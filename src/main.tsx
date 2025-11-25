import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/globals.css";
import App from "./App.tsx";
import { HeroUIProvider, ToastProvider } from "@heroui/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HeroUIProvider>
      <ToastProvider placement="bottom-right" />
      <App />
    </HeroUIProvider>
  </StrictMode>
);
