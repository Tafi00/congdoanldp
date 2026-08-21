import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "@fontsource/be-vietnam-pro/vietnamese-400.css";
import "@fontsource/be-vietnam-pro/vietnamese-500.css";
import "@fontsource/be-vietnam-pro/vietnamese-600.css";
import "@fontsource/be-vietnam-pro/vietnamese-700.css";
import "@fontsource/be-vietnam-pro/vietnamese-800.css";
import "@fontsource/roboto-condensed/vietnamese-500.css";
import "@fontsource/roboto-condensed/vietnamese-600.css";
import "@fontsource/roboto-condensed/vietnamese-700.css";
import "@fontsource/roboto-condensed/vietnamese-800.css";
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
