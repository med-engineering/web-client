import { FC, useState } from "react";
import { useUserContext } from "../../contexts/UserContext";
import ActivityIndicator from "../loaders/ActivityIndicator";
import { DropdownMenu } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import { Modal } from "../general/Modal";
import copyText from "../../utils/copy.util";

interface UserDropDownProps {}

const UserDropDown: FC<UserDropDownProps> = () => {
  const navigate = useNavigate();
  const { user, setUser, setToken } = useUserContext();

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = () => {
    setIsLogoutModalOpen(false);
    setUser(null);
    setToken(null);
    navigate("/login", { replace: true });
  };

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <div className="h-[80%] hover:bg-gray-800 rounded-[4px] flex items-center justify-center px-3 py-[7px] max-w-[220px] cursor-pointer">
            {user ? (
              <>
                <img
                  className="min-w-[35px] min-h-[35px] max-w-[35px] max-h-[35px] rounded-full"
                  src={user?.avatar}
                  alt={user?.name}
                />
                <div className="truncate font-semibold ml-[10px]">
                  {user?.name}
                </div>
              </>
            ) : (
              <ActivityIndicator />
            )}
          </div>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content
          style={{
            minWidth: "200px",
            backgroundColor: "#293346",
            marginRight: "20px",
          }}
        >
          <DropdownMenu.Item onClick={() => copyText(user?.id)}>
            Copy user ID
          </DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item
            onClick={() => setIsLogoutModalOpen(true)}
            color="red"
          >
            Log Out
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <Modal
        isConfirmation
        isOpen={isLogoutModalOpen}
        label="Logout?"
        onRequestClose={() => setIsLogoutModalOpen(false)}
        confirmationDialogue="Are you sure you want to logout?"
        onConfirm={handleLogout}
        confirmationButtonColor="danger"
        confirmationButtonTitle="Logout"
      />
    </>
  );
};

export default UserDropDown;
