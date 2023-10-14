import { FC } from "react";
import { useParams } from "react-router-dom";
import { useServiceContext } from "../../../contexts/ServiceContext";

interface SetServiceProps {}

const SetService: FC<SetServiceProps> = () => {
  const { serviceID, setServiceID } = useServiceContext();

  const params = useParams();
  if (serviceID !== params.id) setServiceID(params.id ? params.id : null);
  console.log(params);
  return <div></div>;
};

export default SetService;
