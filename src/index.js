import React from "react";
import * as ReactDOMClient from "react-dom/client";
import App from "./App";
import "./assets/scss/style.scss";
import { Provider } from "react-redux";
import { store } from "./Store/state.js";

ReactDOMClient.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
