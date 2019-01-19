import React from "react";
import { render } from "react-dom";
import { hot } from "react-hot-loader";
// import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/js/bootstrap";

// import store from "./store";
import App from "./app";

render(
  // <Provider className="app" store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  document.getElementById("neurodocker")
);
