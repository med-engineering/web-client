import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useServiceContext } from "../../../contexts/ServiceContext";
import axios from "axios";
import { useUserContext } from "../../../contexts/UserContext";
import { useRoomContext } from "../../../contexts/RoomContext";

const SetService: FC = () => {
  const { setRoom, setIsRoomFetch } = useRoomContext();
  const { fetchConfig } = useUserContext();

  const params = useParams();

  const handleFetchService = async () => {
    setIsRoomFetch(true);
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/service/${params?.serviceID}/room/${params?.roomID}`,
        fetchConfig
      );
      setRoom(data);
    } catch (error: any) {
      setRoom(null);
    }
    setIsRoomFetch(false);
  };

  useEffect(() => {
    handleFetchService();
  }, [params?.serviceID, params?.roomID, fetchConfig]);
  return <></>;
};

export default SetService;
