import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import UserDropDown from "./UserDropDown";

interface NavBarProps {}

const NavBar: FC<NavBarProps> = () => {
  return (
    <>
      {" "}
      <div className="h-[60px] w-full fixed top-0 bg-dark-2">
        <div className="w-full h-full flex items-center px-12">
          <div className="flex-1">
            <div className="hover:bg-gray-800 rounded-[4px] flex items-center justify-center w-max px-3 h-[40px] cursor-pointer">
              <div className="font-semibold text-[17px]">Dashboard</div>
            </div>
          </div>
          <div className="flex items-center gap-2 h-full">
            <div className="hover:bg-gray-800 rounded-[4px] flex items-center justify-center w-[40px] h-[40px] cursor-pointer">
              <FontAwesomeIcon icon={faBell} fontSize={"19px"} />
            </div>
            <UserDropDown />
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;