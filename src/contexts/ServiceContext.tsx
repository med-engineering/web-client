import {
  createContext,
  useState,
  useContext,
  FC,
  ReactNode,
  SetStateAction,
  Dispatch,
} from "react";

interface ServiceContextValue {
  service: any;
  isServiceFetch: boolean;
  setIsServiceFetch: Dispatch<SetStateAction<boolean>>;
  setService: Dispatch<SetStateAction<any>>;
}

const ServiceContext = createContext<ServiceContextValue>({
  service: null,
  isServiceFetch: false,
  setIsServiceFetch: () => {},
  setService: () => {},
});

export const useServiceContext = () => useContext(ServiceContext);
interface ServiceProviderProps {
  children: ReactNode;
}
const ServiceProvider: FC<ServiceProviderProps> = ({ children }) => {
  const [service, setService] = useState<any>(null);
  const [isServiceFetch, setIsServiceFetch] = useState<boolean>(true);

  const value: ServiceContextValue = {
    service,
    setService,
    isServiceFetch,
    setIsServiceFetch,
  };

  return (
    <ServiceContext.Provider value={value}>{children}</ServiceContext.Provider>
  );
};

export default ServiceProvider;
