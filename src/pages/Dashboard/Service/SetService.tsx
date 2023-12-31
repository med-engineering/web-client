import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useServiceContext } from "../../../contexts/ServiceContext";
import axios from "axios";
import { useUserContext } from "../../../contexts/UserContext";

const SetService: FC = () => {
  const { service, setService, setIsServiceFetch } = useServiceContext();
  const { fetchConfig } = useUserContext();

  const params = useParams();

  const handleFetchService = async () => {
    setIsServiceFetch(true);
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/service/${params?.serviceID}`,
        fetchConfig
      );
      setService(data);
    } catch (error: any) {
      setService(null);
    }
    setIsServiceFetch(false);
  };

  useEffect(() => {
    if (!params?.serviceID) {
      setIsServiceFetch(true);
      return;
    }
    if (params?.serviceID === service?.id) return;
    console.log(params);

    handleFetchService();
  }, [params?.serviceID, fetchConfig]);
  return <></>;
};

export default SetService;
