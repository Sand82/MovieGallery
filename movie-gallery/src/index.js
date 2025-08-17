import React from "react";
import { HashRouter as Router } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

import "./global.css";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <App />
  </Router>
);

reportWebVitals();
