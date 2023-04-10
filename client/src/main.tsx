import React from "react";
import ReactDOM from "react-dom/client";

import GeneralValuesProvider from "./Context/GeneralValuesContext";
import { Provider } from "react-redux";

import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* @ts-ignore */}
    <GeneralValuesProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GeneralValuesProvider>
  </React.StrictMode>
);
