import { FC } from "react";
import { sidebarOptions } from "../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import { useLocation } from "react-router-dom";

interface SideBarProps {
  // Add your prop types here
}

const SideBar: FC<SideBarProps> = () => {
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <nav className="fixed left-0 h-screen w-[300px] bg-dark-2-lighter">
      <div className="flex items-center justify-start gap-3 border-solid border-0 border-b-[1px]  border-b-gray-600 px-2 py-3">
        <img
          src="https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg?crop=0.66698xw:1xh;center,top&resize=1200:*"
          alt="Picture of the author"
          width={50}
          height={50}
          className="rounded-full"
        />
        <div>
          <h3 className="font-bold text-lg">Dr. Sifedine</h3>
          <p className="-mt-1 text-sm">cardiology</p>
        </div>
      </div>
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
