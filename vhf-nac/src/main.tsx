import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { DataStore } from "./core/dataStore.ts";
import { AppContextProvider } from "./providers/AppContextProvider.tsx";
import { NACApp } from "./nac-app.tsx";

const store = new DataStore();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppContextProvider store={store}>
      <App>
        <NACApp />
      </App>
    </AppContextProvider>
  </StrictMode>,
);
