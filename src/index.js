import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles/style.scss";
import "material-symbols";
import reportWebVitals from "./reportWebVitals";
import { AppProvider } from "./Pages/AppContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AppProvider>
    <App />
  </AppProvider>
);

reportWebVitals();
