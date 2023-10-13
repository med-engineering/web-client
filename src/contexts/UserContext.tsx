"use client";
import axios from "axios";
import {
  createContext,
  useState,
  useContext,
  FC,
  ReactNode,
  SetStateAction,
  Dispatch,
  useEffect,
} from "react";

interface UserContextValue {
  token: string | null;
  user: any;
  fetchConfig: any;
  isFirstUserFetch: boolean;
  setIsFirstUserFetch: Dispatch<SetStateAction<boolean>>;
  setToken: Dispatch<SetStateAction<string | null>>;
  setUser: Dispatch<SetStateAction<any>>;
}

const UserContext = createContext<UserContextValue>({
  token: null,
  user: null,
  fetchConfig: {},
  isFirstUserFetch: false,
  setIsFirstUserFetch: () => {},
  setToken: () => {},
  setUser: () => {},
});

export const useUserContext = () => useContext(UserContext);
interface UserProviderProps {
  children: ReactNode;
}
const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [token, setToken] = useState(
    typeof window === "undefined" ? null : window.localStorage.getItem("token")
  );
  const [user, setUser] = useState<any>(null);
  const [fetchConfig, setFetchConfig] = useState({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const [isFirstUserFetch, setIsFirstUserFetch] = useState<boolean>(true);

  const handleFetchUser = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/admins/@me",
        fetchConfig
      );
      setUser(data);
    } catch (error) {
      setUser(null);
    }
    setIsFirstUserFetch(false);
  };

  useEffect(() => {
    if (!token) {
      setIsFirstUserFetch(false);
      setUser(null);
      return;
    }
    if (typeof window !== "undefined") {
      window.localStorage.setItem("token", token);
    }
    setFetchConfig({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    handleFetchUser();
  }, [token]);

  const value: UserContextValue = {
    token,
    user,
    fetchConfig,
    isFirstUserFetch,
    setIsFirstUserFetch,
    setToken,
    setUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
