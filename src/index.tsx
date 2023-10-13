import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import UserProvider from "./contexts/UserContext";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import{ Toaster } from "react-hot-toast";

import "./index.css";

config.autoAddCss = false;
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <UserProvider>
      <Toaster />
      <App />
    </UserProvider>
  </React.StrictMode>
);
