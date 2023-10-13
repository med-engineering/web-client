import { FC, ReactNode, useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PreLoaderScreen from "../loaders/PreLoaderScreen";
import { useUserContext } from "../../contexts/UserContext";

interface AuthPreCheckProps {
  children: ReactNode;
}

const AuthPreCheck: FC<AuthPreCheckProps> = ({ children }) => {
  const { isFirstUserFetch, user, token } = useUserContext();
  const [isDoneRendering, setIsDoneRendering] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isFirstUserFetch) return;
    if (!user) navigate("/login", { replace: true });
    else if (
      user &&
      (location.pathname === "/" || location.pathname === "/login")
    ) {
      navigate("/dashboard", { replace: true });
    }
    setIsDoneRendering(true);
  }, [isFirstUserFetch, user, token]);
  return <>{isDoneRendering ? children : <PreLoaderScreen />}</>;
};

export default AuthPreCheck;
