import { FC, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

import filePlaceholder from "../../assets/filePlaceholder.svg";
import Button from "../../components/general/Button";
import { Modal } from "../../components/general/Modal";
import FileInput from "../../components/general/FileInput";
import LabeledInput from "../../components/general/LabeledInput";
import { useUserContext } from "../../contexts/UserContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useServiceContext } from "../../contexts/ServiceContext";

interface AddRoomProps {
  hasManagingPerms: boolean;
  handleSuccess?: (data: any) => any;
}

const AddRoom: FC<AddRoomProps> = ({ hasManagingPerms, handleSuccess }) => {
  const { service } = useServiceContext();
  const { fetchConfig } = useUserContext();
  const [roomModalOpen, setRoomModalOpen] = useState(false);
  const [newRoomPicture, setNewRoomPicture] = useState<any>({});

  const [isLoading, setIsLoading] = useState(false);

  const [roomName, setRoomName] = useState("");
  const [roomDescription, setRoomDescription] = useState("");

  const [errors, setErrors] = useState<any>({
    name: null,
  });

  const handleAddRoom = async () => {
    if (!hasManagingPerms) return setRoomModalOpen(false);
    if (!roomName) {
      setErrors({
        name: "name field is required",
      });
      return;
    }
    setIsLoading(true);
    try {
      const image = newRoomPicture?.file;
      const formData = new FormData();
      formData.append("name", roomName);
      formData.append("description", roomDescription);
      image && formData.append("image", image, "image.jpg");

      const { data } = await axios.post(
        `http://localhost:5000/api/service/${service?.id}/rooms`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            ...fetchConfig.headers,
          },
        }
      );

      handleSuccess && handleSuccess(data);
      handleModalClose();
      setRoomModalOpen(false);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ??
        "An Error occurred while creating the room";
      toast.error(errorMessage);
    }
    setIsLoading(false);
  };

  const handleModalClose = () => {
    setErrors({
      name: null,
    });
    setRoomName("");
    setRoomModalOpen(false);
  };

  return (
    <>
      <Button onClick={() => setRoomModalOpen(true)}>Add Room</Button>
      <Modal
        isOpen={roomModalOpen}
        onRequestClose={handleModalClose}
        label="Add Room"
        useFooter
        confirmationButtonTitle="Create Room"
        confirmationButtonLoading={isLoading}
        onConfirm={handleAddRoom}
      >
        <div className="px-6 py-6">
          <div className="flex items-center justify-center">
            <FileInput
              width={"120px"}
              borderRadius="8px"
              className="bg-dark-2-lighter border-gray-300"
              style={{
                outline: "1px dashed #d1d5db",
              }}
              onDragOverStyles={{
                outline: "1px dashed #33ff33",
              }}
              onFileSelected={(formDataFile, displayFile) => {
                setNewRoomPicture({
                  file: formDataFile,
                  display: displayFile,
                });
              }}
            >
              {newRoomPicture?.display ? (
                <img
                  src={newRoomPicture?.display}
                  alt="room pic"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <img
                    src={filePlaceholder}
                    alt="room placeholder"
                    className="w-[50%] h-[50%] text-white"
                  />
                </div>
              )}
            </FileInput>
            <div className="ml-6 flex-1">
              <LabeledInput
                placeholder="Room Name"
                value={roomName}
                error={errors.name}
                setValue={setRoomName}
                autoFocus
              />
            </div>
          </div>
          <div className="mt-9">
            <TextareaAutosize
              className="bg-transparent rounded-[6px] px-3 py-3 min-h-[180px] resize-none border duration-200 border-solid border-gray-4 hover:border-primary focus:border-primary w-full"
              placeholder="Room Description"
              value={roomDescription}
              onChange={(e) => setRoomDescription(e.target?.value)}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddRoom;
