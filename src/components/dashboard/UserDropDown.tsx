import { FC } from "react";
import { useUserContext } from "../../contexts/UserContext";
import ActivityIndicator from "../loaders/ActivityIndicator";

interface UserDropDownProps {}

const UserDropDown: FC<UserDropDownProps> = () => {
  const { user } = useUserContext();
  return (
    <div className="h-[80%] hover:bg-gray-800 rounded-[4px] flex items-center justify-center px-3 max-w-[220px] cursor-pointer">
      {user ? (
        <>
          <img
            className="min-w-[35px] min-h-[35px] max-w-[35px] max-h-[35px] rounded-full"
            src={user?.avatar}
          />
          <div className="truncate font-semibold ml-[10px]">{user?.name}</div>
        </>
      ) : (
        <ActivityIndicator />
      )}
    </div>
  );
};

export default UserDropDown;
