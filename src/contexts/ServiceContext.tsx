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
import { useUserContext } from "./UserContext";

interface ServiceContextValue {
  serviceID: string | null;
  service: any;
  fetchConfig: any;
  isServiceFetch: boolean;
  setIsServiceFetch: Dispatch<SetStateAction<boolean>>;
  setServiceID: Dispatch<SetStateAction<string | null>>;
  setService: Dispatch<SetStateAction<any>>;
}

const ServiceContext = createContext<ServiceContextValue>({
  serviceID: null,
  service: null,
  fetchConfig: {},
  isServiceFetch: false,
  setIsServiceFetch: () => {},
  setServiceID: () => {},
  setService: () => {},
});

export const useServiceContext = () => useContext(ServiceContext);
interface ServiceProviderProps {
  children: ReactNode;
}
const ServiceProvider: FC<ServiceProviderProps> = ({ children }) => {
  const { fetchConfig } = useUserContext();
  const [serviceID, setServiceID] = useState<string | null>(null);
  const [service, setService] = useState<any>(null);
  const [isServiceFetch, setIsServiceFetch] = useState<boolean>(true);

  const handleFetchService = async () => {
    setIsServiceFetch(true);
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/service/${serviceID}`,
        fetchConfig
      );
      setService(data);
    } catch (error: any) {
      setService(null);
    }
    setIsServiceFetch(false);
  };

  useEffect(() => {
    if (!serviceID) {
      setIsServiceFetch(true);
      return;
    }
    handleFetchService();
  }, [serviceID, fetchConfig]);

  const value: ServiceContextValue = {
    serviceID,
    setServiceID,
    service,
    setService,
    fetchConfig,
    isServiceFetch,
    setIsServiceFetch,
  };

  return (
    <ServiceContext.Provider value={value}>{children}</ServiceContext.Provider>
  );
};

export default ServiceProvider;
