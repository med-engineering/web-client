import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login/Login";

const LoginPage: FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </>
  );
};

export default LoginPage;
