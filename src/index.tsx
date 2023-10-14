import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import UserProvider from "./contexts/UserContext";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { Toaster } from "react-hot-toast";
import { Theme } from "@radix-ui/themes";
import "./index.css";

import "@radix-ui/themes/styles.css";
import ServiceProvider from "./contexts/ServiceContext";

config.autoAddCss = false;
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <UserProvider>
      <ServiceProvider>
        <Toaster />
        <Theme color="#ffffff">
          <App />
        </Theme>
      </ServiceProvider>
    </UserProvider>
  </React.StrictMode>
);
