import React from "react";
import ReactDOM from "react-dom/client";
// config base
import App from "./App";
import "./index.css";
// router
import { BrowserRouter } from "react-router-dom";
// context & store
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { GeneralValuesProvider } from "./Context/GeneralValuesContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    {/* @ts-ignore */}
    <GeneralValuesProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </GeneralValuesProvider>
  </Provider>
);
