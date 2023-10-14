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

interface ServiceCardProps {
  service: any;
  isLoading: boolean;
  hasManagingPerms: boolean;
  onDeleteCallback?: (id: string) => void;
}

const ServiceCard: FC<ServiceCardProps> = ({
  service,
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
      const serviceID: string = service?.id ?? null;
      if (!serviceID) throw new Error("invalid service id!");
      setIsDeleteLoading(true);
      await axios.delete(
        `http://localhost:5000/api/service/${serviceID}`,
        fetchConfig
      );
      if (onDeleteCallback) onDeleteCallback(serviceID);
      setIsDeleteLoading(false);
      setIsDeleteModalOpen(false);
      toast.success("service has been deleted");
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message ?? error.message;
      toast.error(errorMessage);
    }
  };

  const handleMenuNavigate = (e: MouseEvent, path: string) => {
    e.stopPropagation();
    navigate(`/dashboard/service/${service?.id}/${path}`);
  };

  const handleDeleteModalOpen = (e: MouseEvent) => {
    e.stopPropagation();
    setIsDeleteModalOpen(true);
  };

  return (
    <>
      <button
        onClick={() => navigate(`/dashboard/service/${service.id}`)}
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
            src={service.thumbnail}
            alt={service.name}
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
              {service.name}
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
                <DropdownMenu.Item onClick={(e) => handleMenuNavigate(e, "")}>
                  Stats
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  onClick={(e) => handleMenuNavigate(e, "rooms")}
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
                    copyText(service?.id);
                  }}
                >
                  Copy service ID
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
          label="Delete service?"
          onRequestClose={() => setIsDeleteModalOpen(false)}
          isConfirmation
          confirmationButtonColor="danger"
          confirmationDialogue={`are you sure you want to delete this service (${service?.name})`}
          confirmationButtonLoading={isDeleteLoading}
          confirmationButtonTitle="Delete"
          onConfirm={handleDelete}
        />
      </>
    </>
  );
};

export default ServiceCard;
