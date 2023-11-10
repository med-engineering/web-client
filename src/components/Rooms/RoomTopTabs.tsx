import { FC } from "react";
import { Link } from "react-router-dom";
import { useServiceContext } from "../../contexts/ServiceContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import SkeletonLoading from "../general/SkeletonLoading";

interface RoomTopTabsProps {
  room: any;
  isLoading: boolean;
}

const RoomTopTabs: FC<RoomTopTabsProps> = ({ room, isLoading }) => {
  const { service } = useServiceContext();
  return (
    <div className="mt-3 flex items-center justify-between">
      <div className="flex-1">
        <SkeletonLoading width="90%" height="18px" loadingCondition={isLoading}>
          <Link
            to={`/dashboard/services/${service?.id}/rooms`}
            className="hover:bg-gray-800 rounded-[4px] flex items-center justify-center w-max px-3 h-[40px] cursor-pointer"
          >
            <div className="flex items-center">
              <FontAwesomeIcon icon={faArrowLeft} fontSize="17px" />
              <img
                src={room?.thumbnail}
                alt={room?.name}
                className="ml-3 rounded-md min-w-[25px] max-w-[25px] min-h-[25px] max-h-[25px]"
              />
              <p className="font-semibold text-[17px] ml-2">{room?.name}</p>
            </div>
          </Link>
        </SkeletonLoading>
      </div>
      <div className="flex items-center justify-end gap-3">
        
      </div>
    </div>
  );
};

export default RoomTopTabs;
