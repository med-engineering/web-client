import { FC, useState, useEffect } from "react";
import { sidebarOptions } from "../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import { useLocation } from "react-router-dom";
import { useServiceContext } from "../../contexts/ServiceContext";
import SkeletonLoading from "../general/SkeletonLoading";

interface SideBarProps {}

const SideBar: FC<SideBarProps> = () => {
  const { serviceID, service, isServiceFetch } = useServiceContext();
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <nav className="fixed left-0 bottom-0 h-[calc(100vh-60px)] w-[300px] bg-dark-2-lighter duration-200">
      <div className="flex flex-col justify-center items-center mt-6">
        <SkeletonLoading
          loadingCondition={isServiceFetch}
          borderRadius="10px"
          width="80px"
        >
          <img
            src={service?.thumbnail}
            className="w-[80px] h-[80px] rounded-[10px]"
            alt={`service-${service?.name}`}
          />
        </SkeletonLoading>
        <SkeletonLoading
          loadingCondition={isServiceFetch}
          width="140px"
          height="16px"
          marginTop="16px"
        >
          <h1 className="mt-4 text-xl font-medium">{service?.name}</h1>
        </SkeletonLoading>
      </div>
      <div className="mt-6 flex flex-col gap-3 px-2">
        {sidebarOptions.map((option) => {
          const fullPath = option.route.replace(/:serviceID:/gi, serviceID!);
          return (
            <SkeletonLoading
              loadingCondition={isServiceFetch}
              key={option.name}
              width="100%"
              height="34px"
              marginTop="16px"
            >
              <Link
                to={fullPath}
                className={`flex items-center justify-start gap-2 py-2 px-1 rounded-md duration-100 cursor-pointer ${
                  pathname === fullPath
                    ? "bg-primary"
                    : "hover:bg-gray-700 active:bg-gray-600"
                }`}
              >
                <FontAwesomeIcon
                  icon={option.icon}
                  className="w-[30px] text-[18px]"
                />
                <p className="text-[17px] capitalize">{option.name}</p>
              </Link>
            </SkeletonLoading>
          );
        })}
      </div>
    </nav>
  );
};

export default SideBar;
