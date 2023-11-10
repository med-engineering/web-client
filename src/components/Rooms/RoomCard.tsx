import { FC, useState, MouseEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SkeletonLoading from "../general/SkeletonLoading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { DropdownMenu } from "@radix-ui/themes";
import { useUserContext } from "../../contexts/UserContext";
import axios from "axios";
import toast from "react-hot-toast";
import { Modal } from "../general/Modal";
import copyText from "../../utils/copy.util";

interface RoomCardProps {
  room: any;
  isLoading: boolean;
  hasManagingPerms: boolean;
  onDeleteCallback?: (id: string) => void;
}

const RoomCard: FC<RoomCardProps> = ({
  room,
  isLoading,
  hasManagingPerms,
  onDeleteCallback,
}) => {
  const navigate = useNavigate();

  const { fetchConfig } = useUserContext();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const handleDelete = async () => {
    try {
      const roomID: string = room?.id ?? null;
      if (!roomID) throw new Error("invalid room id!");
      setIsDeleteLoading(true);
      await axios.delete(
        `http://localhost:5000/api/service/${room?.service?.id}/rooms/${room?.id}`,
        fetchConfig
      );
      if (onDeleteCallback) onDeleteCallback(roomID);
      setIsDeleteModalOpen(false);
      toast.success("room has been deleted");
    } catch (error: any) {
        const errorMessage = error?.response?.data?.message ?? error.message;
        toast.error(errorMessage);
    }
        setIsDeleteLoading(false);
  };

  const handleMenuNavigate = (e: MouseEvent, path: string) => {
    e.stopPropagation();
    navigate(
      `/dashboard/services/${room?.service?.id}/rooms/${room?.id}/${path}`
    );
  };

  const handleDeleteModalOpen = (e: MouseEvent) => {
    e.stopPropagation();
    setIsDeleteModalOpen(true);
  };

  return (
    <>
      <button
        onClick={(e) => handleMenuNavigate(e, "")}
        className="bg-dark-2-lighter overflow-hidden flex justify-start text-start items-center py-4 px-3 rounded-[4px] relative"
        style={{
          pointerEvents: isLoading ? "none" : "auto",
        }}
      >
        <SkeletonLoading
          width="50px"
          borderRadius="10px"
          loadingCondition={isLoading}
        >
          <img
            src={room?.thumbnail}
            alt={room?.name}
            className="rounded-[10px] min-w-[50px] max-w-[50px] min-h-[50px] max-h-[50px]"
          />
        </SkeletonLoading>
        <div className="ml-3 flex-1 overflow-hidden">
          <SkeletonLoading
            width="75%"
            height="15px"
            loadingCondition={isLoading}
          >
            <div className="font-medium max-w-[85%] truncate ml-2">
              {room?.name}
            </div>
          </SkeletonLoading>
        </div>

        {hasManagingPerms && (
          <SkeletonLoading width="30px" loadingCondition={isLoading}>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="w-[30px] h-[30px] hover:bg-secondary duration-200 rounded-[4px] z-3 flex items-center justify-center"
                >
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content
                style={{
                  minWidth: "200px",
                  backgroundColor: "#293346",
                  marginRight: "20px",
                }}
              >
                <DropdownMenu.Item
                  onClick={(e) => handleMenuNavigate(e, "machines")}
                >
                  Rooms
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item
                  onClick={(e) => handleMenuNavigate(e, "settings")}
                >
                  Settings
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  onClick={(e) => {
                    e?.stopPropagation();
                    copyText(room?.id);
                  }}
                >
                  Copy room ID
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item onClick={handleDeleteModalOpen} color="red">
                  Delete
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </SkeletonLoading>
        )}
      </button>
      <>
        <Modal
          isOpen={isDeleteModalOpen}
          label="Delete room?"
          onRequestClose={() => setIsDeleteModalOpen(false)}
          isConfirmation
          confirmationButtonColor="danger"
          confirmationDialogue={`are you sure you want to delete this room (${room?.name})`}
          confirmationButtonLoading={isDeleteLoading}
          confirmationButtonTitle="Delete"
          onConfirm={handleDelete}
        />
      </>
    </>
  );
};

export default RoomCard;
