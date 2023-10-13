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

interface AddServiceProps {
  hasManagingPerms: boolean;
  handleSuccess?: (data: any) => any;
}

const AddService: FC<AddServiceProps> = ({
  hasManagingPerms,
  handleSuccess,
}) => {
  const { fetchConfig } = useUserContext();
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [newServicePicture, setNewServicePicture] = useState<any>(null);

  const [isLoading, setIsLoading] = useState(false);

  const [serviceName, setServiceName] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");

  const [errors, setErrors] = useState<any>({
    name: null,
  });

  const handleAddService = async () => {
    if (!hasManagingPerms) return setServiceModalOpen(false);
    if (!serviceName) {
      setErrors({
        name: "name field is required",
      });
      return;
    }
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/service",
        {
          name: serviceName,
          description: serviceDescription,
        },
        fetchConfig
      );
      handleSuccess && handleSuccess(data);
      setServiceModalOpen(false);
    } catch (error) {
      toast.error("An error occurred while creating the service");
    }
    setIsLoading(false);
  };

  return (
    <>
      <Button onClick={() => setServiceModalOpen(true)}>Add Service</Button>
      <Modal
        isOpen={serviceModalOpen}
        onRequestClose={() => setServiceModalOpen(false)}
        label="Add Service"
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
                setNewServicePicture(displayFile);
              }}
            >
              {newServicePicture ? (
                <img
                  src={newServicePicture}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <img
                    src={filePlaceholder}
                    className="w-[50%] h-[50%] text-white"
                  />
                </div>
              )}
            </FileInput>
            <div className="ml-6 flex-1">
              <LabeledInput
                placeholder="Service Name"
                value={serviceName}
                error={errors.name}
                setValue={setServiceName}
                autoFocus
              />
            </div>
          </div>
          <div className="mt-9">
            <TextareaAutosize
              className="bg-transparent rounded-[6px] px-3 py-3 min-h-[180px] resize-none border duration-200 border-solid border-gray-4 hover:border-primary focus:border-primary w-full"
              placeholder="Service Description"
              value={serviceDescription}
              onChange={(e) => setServiceDescription(e.target?.value)}
            />
          </div>
        </div>
        <div className="flex justify-start items-center  py-6 px-6">
          <Button isLoading={isLoading} onClick={handleAddService}>
            Create Service
          </Button>
          <Button
            onClick={() => setServiceModalOpen(false)}
            color="secondary"
            className="ml-4"
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default AddService;
