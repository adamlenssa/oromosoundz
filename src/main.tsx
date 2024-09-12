import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import GlobalProvider from "./Providers/GlobalProvider.tsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GlobalProvider>
  </React.StrictMode>
);
