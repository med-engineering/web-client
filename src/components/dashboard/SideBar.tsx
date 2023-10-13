import { FC } from "react";
import { sidebarOptions } from "../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import { useLocation } from "react-router-dom";
import SkeletonLoading from "../general/SkeletonLoading";
import { useUserContext } from "../../contexts/UserContext";

interface SideBarProps {}

const SideBar: FC<SideBarProps> = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const { user } = useUserContext();

  return (
    <nav className="fixed left-0 bottom-0 h-[calc(100vh-60px)] w-[300px] bg-dark-2-lighter">
      <div className="mt-4 flex flex-col gap-3 px-2">
        {sidebarOptions.map((option) => (
          <Link
            key={option.name}
            to={option.route}
            className={`flex items-center justify-start gap-2 py-2 px-1 rounded-md duration-100 cursor-pointer ${
              pathname === option.route
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
        ))}
      </div>
    </nav>
  );
};

export default SideBar;
