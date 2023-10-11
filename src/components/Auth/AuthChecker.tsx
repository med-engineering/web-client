import { useUserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { FC, useEffect } from "react";

interface AuthCheckerProps {}

const AuthChecker: FC<AuthCheckerProps> = () => {
  const navigate = useNavigate();
  const { isFirstUserFetch, user, token } = useUserContext();

  useEffect(() => {
    if ((!user || !token) && !isFirstUserFetch) {
      navigate("/login", { replace: true });
    }
  }, [isFirstUserFetch, user, token]);
  return <></>;
};

export default AuthChecker;
