import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useUserContext } from "../../../contexts/UserContext";
import checkPerms from "../../../utils/permissions.util";
import SkeletonLoading from "../../../components/general/SkeletonLoading";
import { Link } from "react-router-dom";
import AddService from "../../../components/Service/AddService";

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
  }, []);

  useEffect(() => {
    setHasManagingPerms(checkPerms(user, "services", true));
  }, [user]);

  const handleServiceAddSuccess = (service: any) => {
    setServices((prev) => [...prev, service]);
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
            <div
              className="bg-dark-2-lighter flex items-center py-4 px-3 rounded-[4px] relative"
              key={`service-${index}`}
            >
              {!isLoading && (
                <Link
                  className="absolute w-full h-full bg-transparent cursor-pointer"
                  to={`/dashboard/service/${service.id}`}
                />
              )}
              <SkeletonLoading
                width="50px"
                isCircle
                loadingCondition={isLoading}
              >
                <img
                  src={service.thumbnail}
                  alt={service.name}
                  className="rounded-full min-w-[50px] max-w-[50px] min-h-[50px] max-h-[50px]"
                />
              </SkeletonLoading>
              <div className="ml-3 flex-1">
                <SkeletonLoading
                  width="75%"
                  height="15px"
                  loadingCondition={isLoading}
                >
                  <div className="font-medium max-w-[85%] truncate ml-2">
                    {service.name}
                  </div>
                </SkeletonLoading>
              </div>

              {/* {hasManagingPerms && (
                <SkeletonLoading width="30px" loadingCondition={isLoading}>
                  <div className="font-medium max-w-[85%] truncate ml-2">
                    {service.name}
                  </div>
                </SkeletonLoading>
              )} */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ServicesList;
