import { FC } from "react";
import SkeletonLoading from "../general/SkeletonLoading";

interface StateCardProps {
  name: string;
  value: number;
  icon: any;
  isLoading?: boolean;
}

const StateCard: FC<StateCardProps> = ({
  name,
  value,
  isLoading = false,
  icon,
}) => {
  return (
    <div className="flex items-center justify-start bg-dark-2-lighter shadow-lg rounded-md py-6 px-3">
      <div className="min-w-[40px] w-[40px] min-h-[40px] h-[40px]">
        <img src={icon} alt={name} className="w-full" />
      </div>
      <div className="ml-3">
        <p className="text-[15px] capitalize">{name}</p>
        <SkeletonLoading
          loadingCondition={isLoading}
          width="80px"
          height="20px"
          marginTop="10px"
        >
          <p className="text-[29px] -mt-2 capitalize">{value}</p>
        </SkeletonLoading>
      </div>
    </div>
  );
};

export default StateCard;
