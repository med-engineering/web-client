import { FC, useState, useEffect } from "react";
import LabeledInput from "../../../components/general/LabeledInput";
import FileInput from "../../../components/general/FileInput";
import ReactTextareaAutosize from "react-textarea-autosize";
import axios from "axios";
import { useServiceContext } from "../../../contexts/ServiceContext";
import { useUserContext } from "../../../contexts/UserContext";
import filePlaceholder from "../../../assets/filePlaceholder.svg";
import toast from "react-hot-toast";
import Button from "../../../components/general/Button";

interface ServiceSettingsProps {}

const ServiceSettings: FC<ServiceSettingsProps> = () => {
  const { service, setService } = useServiceContext();
  const { fetchConfig } = useUserContext();

  const [isUpdateLoading, setIsUpdateLoading] = useState(false);

  const [serviceName, setServiceName] = useState(service?.name ?? "");
  const [serviceDescription, setServiceDescription] = useState(
    service?.description ?? ""
  );

  const [servicePicture, setServicePicture] = useState({
    display: service?.thumbnail ?? null,
    file: null,
  });

  const [errors, setErrors] = useState<any>({});

  const handleEdit = async () => {
    try {
      if (!serviceName) {
        setErrors({ name: "name field is required" });
        return;
      }
      const image = servicePicture?.file;
      const formData = new FormData();
      formData.append("name", serviceName);
      formData.append("description", serviceDescription);
      image && formData.append("image", image, "image.jpg");

      const serviceID: string = service?.id ?? null;
      if (!serviceID) throw new Error("invalid service id!");
      setIsUpdateLoading(true);

      const { data } = await axios.patch(
        `http://localhost:5000/api/service/${serviceID}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            ...fetchConfig.headers,
          },
        }
      );
      setService(data);
      toast.success("service has been updated");
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message ?? error.message;
      toast.error(errorMessage);
    }
    setIsUpdateLoading(false);
  };
  return (
    <>
      <div
        className="flex justify-between items-center lg:px-6 md:px:4 px:3 pb-4"
        style={{
          borderBottom: "1px #999 solid",
        }}
      >
        <h1 className="font-medium text-3xl">Settings</h1>
      </div>
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
              setServicePicture({
                file: formDataFile,
                display: displayFile,
              });
            }}
          >
            {servicePicture?.display ? (
              <img
                src={servicePicture?.display}
                alt="service picture"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <img
                  src={filePlaceholder}
                  alt="service placeholder"
                  className="w-[50%] h-[50%] text-white"
                />
              </div>
            )}
          </FileInput>
          <div className="ml-6 flex-1">
            <LabeledInput
              placeholder="Service Name"
              value={serviceName}
              defaultValue={serviceName}
              error={errors.name}
              setValue={setServiceName}
              autoFocus
            />
          </div>
        </div>
        <div className="mt-9">
          <ReactTextareaAutosize
            className="bg-transparent rounded-[6px] px-3 py-3 min-h-[180px] resize-none border duration-200 border-solid border-gray-4 hover:border-primary focus:border-primary w-full"
            placeholder="Service Description"
            value={serviceDescription}
            onChange={(e) => setServiceDescription(e.target?.value)}
          />
        </div>
        <div className="mt-8">
          <Button onClick={handleEdit} isLoading={isUpdateLoading}>
            Apply Changes
          </Button>
        </div>
      </div>
    </>
  );
};

export default ServiceSettings;
