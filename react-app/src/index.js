import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./commom/commom.scss";
import "./commom/rest.scss";
import { Provider } from "react-redux";
import store from "./redux/Store";

ReactDOM.render(
  <Provider store={store}>
    {console.log(store)}
    <App />
  </Provider>,
  document.getElementById("root")
);
