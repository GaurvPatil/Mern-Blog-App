import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import 'react-alice-carousel/lib/alice-carousel.css';
import { Provider } from "react-redux";
import store from "./redux/store/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
