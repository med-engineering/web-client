import { FC, useState } from "react";
import FormInput from "./FormInput";
import { useUserContext } from "../../contexts/UserContext";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "../general/Button";
import { useNavigate } from "react-router-dom";

const LoginForm: FC = () => {
  const navigate = useNavigate();
  const { setToken } = useUserContext();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      setErrors({
        username: null,
        password: null,
      });
      const { data } = await axios.post(
        "http://localhost:5000/api/admins/login",
        {
          username,
          password,
        }
      );
      setToken(data.token);
      navigate("/dashboard", { replace: true });
    } catch (error: any) {
      const status = error?.response?.status ?? 500;
      let errorsObject: any = {};
      if (status === 404) {
        errorsObject = {
          username: "invalid username",
          password: "invalid username",
        };
      } else if (status === 401) {
        errorsObject = {
          password: "incorrect password",
        };
      } else if (status === 500) {
        errorsObject = {
          username: "internal server error",
          password: "internal server error",
        };
      }
      setErrors(errorsObject);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-[100vh] w-[50%]">
      <div className="bg-dark-2 px-4 py-16 w-full max-w-[400px] rounded-md shadow-lg">
        <h1 className="text-center text-2xl font-bold">Welcome back!</h1>
        <h2 className="text-center text-[14px] font-semibold text-gray-2">
          Please Login to your account
        </h2>
        <div className="mt-6 flex flex-col gap-4">
          <FormInput
            placeholder="username"
            error={errors.username}
            value={username}
            setValue={setUsername}
            disabled={isLoading}
            autoFocus
          />
          <div>
            <FormInput
              placeholder="password"
              type="password"
              value={password}
              error={errors.password}
              disabled={isLoading}
              setValue={setPassword}
              onEnterPressed={handleLogin}
            />
          </div>
          <div className="w-full flex flex-col items-center justify-center">
            <Button width="full" isLoading={isLoading} onClick={handleLogin}>
              Login
            </Button>
            <Link
              to="/login/forget"
              className="underline text-primary text-center mt-6"
            >
              forgot account info?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
