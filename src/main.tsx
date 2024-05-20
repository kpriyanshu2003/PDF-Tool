import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ThemeContextProvider from "./context/ThemeContextProvider.tsx";
import FormDataContextProvider from "./context/FormDataContextProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <FormDataContextProvider>
        <App />
      </FormDataContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);
