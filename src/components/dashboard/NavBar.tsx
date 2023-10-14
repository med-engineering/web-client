import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBell } from "@fortawesome/free-solid-svg-icons";
import UserDropDown from "./UserDropDown";
import { Link, Route, Routes } from "react-router-dom";

interface NavBarProps {}

const NavBar: FC<NavBarProps> = () => {
  return (
    <>
      <div className="h-[60px] w-full fixed top-0 bg-dark-2">
        <div className="w-full h-full flex items-center px-12">
          <Routes>
            <Route
              path="/service/:id/*"
              element={
                <div className="flex-1">
                  <Link
                    to="/dashboard"
                    className="hover:bg-gray-800 rounded-[4px] flex items-center justify-center w-max px-3 h-[40px] cursor-pointer"
                  >
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={faArrowLeft} fontSize="17px" />
                      <p className="font-semibold text-[17px] ml-3">Services</p>
                    </div>
                  </Link>
                </div>
              }
            />
          </Routes>
          <h2 className="w-max font-semibold text-gray-300 capitalize text-xl">bio eng</h2>
          <div className="flex items-center justify-end flex-1 gap-2 h-full">
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
