import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useUserContext } from "../../../contexts/UserContext";
import checkPerms from "../../../utils/permissions.util";
import AddService from "../../../components/Service/AddService";
import ServiceCard from "../../../components/Service/ServiceCard";

const CARDS_LOADING_ARRAY = Array.from(Array(16).keys());

interface ServicesListProps {}

const ServicesList: FC<ServicesListProps> = () => {
  const { fetchConfig, user } = useUserContext();
  const [services, setServices] = useState(CARDS_LOADING_ARRAY);
  const [isLoading, setIsLoading] = useState(true);
  const [hasManagingPerms, setHasManagingPerms] = useState(
    checkPerms(user, "services", true)
  );
  useEffect(() => {
    const handleFetch = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/service",
          fetchConfig
        );
        setServices(data);
      } catch (error) {
        return null;
      }
      setIsLoading(false);
    };
    handleFetch();
  }, [fetchConfig]);

  useEffect(() => {
    setHasManagingPerms(checkPerms(user, "services", true));
  }, [user]);

  const handleServiceAddSuccess = (service: any) => {
    setServices((prev) => [...prev, service]);
  };

  const handleServiceDelete = (serviceID: string) => {
    setServices((prev) =>
      prev.filter((service: any) => service.id !== serviceID)
    );
  };

  return (
    <div>
      <div
        className="flex justify-between items-center lg:px-6 pb-5"
        style={{
          borderBottom: "1px #999 solid",
        }}
      >
        <h1 className="font-medium text-3xl">Services</h1>
        {hasManagingPerms && (
          <>
            <AddService
              handleSuccess={handleServiceAddSuccess}
              hasManagingPerms={hasManagingPerms}
            />
          </>
        )}
      </div>
      <div className="mt-12 grid grid-cols-cards gap-4">
        {services.map((service: any, index) => {
          return (
            <ServiceCard
              key={`service-${index}`}
              isLoading={isLoading}
              service={service}
              hasManagingPerms={hasManagingPerms}
              onDeleteCallback={handleServiceDelete}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ServicesList;
