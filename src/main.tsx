import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "@fontsource/montserrat/latin-400.css";
import "@fontsource/montserrat/latin-500.css";
import "@fontsource/montserrat/latin-600.css";
import "@fontsource/montserrat/latin-700.css";
import "@fontsource/montserrat/latin-800.css";
import "@fontsource/montserrat/vietnamese-400.css";
import "@fontsource/montserrat/vietnamese-500.css";
import "@fontsource/montserrat/vietnamese-600.css";
import "@fontsource/montserrat/vietnamese-700.css";
import "@fontsource/montserrat/vietnamese-800.css";
import "./styles/tokens.css";
import "./styles/typography.css";
import "./styles/global.css";
import { App } from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
