import { FC, ReactNode, useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PreLoaderScreen from "../loaders/PreLoaderScreen";
import { useUserContext } from "../../contexts/UserContext";
import OnChildrenMount from "./OnChildrenMount";

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
  }, [isFirstUserFetch, user, token]);
  return (
    <>
      {!isDoneRendering && <PreLoaderScreen />}
      {!isFirstUserFetch && (
        <OnChildrenMount
          children={children}
          onMount={() => setIsDoneRendering(true)}
        />
      )}
    </>
  );
};

export default AuthPreCheck;
