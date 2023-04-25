import React from "react";
import ReactDOM from "react-dom/client";
// config base
import App from "./App";
import "./index.css";
// router
import { BrowserRouter } from "react-router-dom";
// context & store
import { GeneralValuesProvider } from "./Context/GeneralValuesContext";
// import { store } from "./store";
// import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    {/* @ts-ignore */}
    <GeneralValuesProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GeneralValuesProvider>
    {/* </Provider> */}
  </React.StrictMode>
);
