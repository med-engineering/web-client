import { FC } from "react";

interface StateCardProps {
  name: string;
  value: number;
  icon: any;
}

const StateCard: FC<StateCardProps> = ({ name, value, icon }) => {
  return (
    <div className="flex items-center justify-start bg-dark-2-lighter shadow-lg rounded-md py-6 px-3">
      <div className="min-w-[40px] w-[40px] min-h-[40px] h-[40px]">
        <img src={icon} alt={name} className="w-full" />
      </div>
      <div className="ml-3">
        <p className="text-[15px] capitalize">{name}</p>
        <p className="text-[29px] -mt-2 capitalize">{value}</p>
      </div>
    </div>
  );
};

export default StateCard;
