"use client";
import { FC } from "react";
import LoginForm from "../../components/login/LoginForm";
import LoginInfo from "../../components/login/LoginInfo";

const Login: FC = () => {
  return (
    <div className="flex items-center justify-between w-full px-1 min-h-[100vh]">
      <LoginInfo />
      <LoginForm />
    </div>
  );
};

export default Login;
