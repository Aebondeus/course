import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import ScrollToTop from "./utils/scrollToTop.js"
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

const Router = BrowserRouter;

ReactDOM.render(
  <Router>
    <ScrollToTop />
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Router>,
  document.getElementById("root")
);

reportWebVitals();
