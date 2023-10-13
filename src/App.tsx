import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardPage, LoginPage } from "./pages";
import AuthPreCheck from "./components/Auth/AuthPreCheck";

function App() {
  return (
    <>
      <BrowserRouter>
        {
          <AuthPreCheck>
            <Routes>
              <Route path="/login/*" Component={LoginPage} />
              <Route path="/dashboard/*" Component={DashboardPage} />
            </Routes>
          </AuthPreCheck>
        }
      </BrowserRouter>
    </>
  );
}

export default App;
