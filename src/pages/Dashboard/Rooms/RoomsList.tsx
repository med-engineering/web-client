import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useUserContext } from "../../../contexts/UserContext";
import checkPerms from "../../../utils/permissions.util";
import AddRoom from "../../../components/Rooms/AddRoom";
import RoomCard from "../../../components/Rooms/RoomCard";
import { useParams } from "react-router-dom";

const CARDS_LOADING_ARRAY = Array.from(Array(16).keys());

interface RoomsListProps {}

const RoomsList: FC<RoomsListProps> = () => {
  const { fetchConfig, user } = useUserContext();
  const [rooms, setRooms] = useState(CARDS_LOADING_ARRAY);
  const [isLoading, setIsLoading] = useState(true);
  const [hasManagingPerms, setHasManagingPerms] = useState(
    checkPerms(user, "rooms", true)
  );

  const { serviceID } = useParams();
  useEffect(() => {
    const handleFetch = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/service/${serviceID}/rooms`,
          fetchConfig
        );
        setRooms(data);
      } catch (error) {
        return null;
      }
      setIsLoading(false);
    };
    handleFetch();
  }, [fetchConfig]);

  useEffect(() => {
    setHasManagingPerms(checkPerms(user, "rooms", true));
  }, [user]);

  const handleRoomAddSuccess = (room: any) => {
    setRooms((prev) => [...prev, room]);
  };

  const handleRoomDelete = (roomID: string) => {
    setRooms((prev) => prev.filter((room: any) => room.id !== roomID));
  };

  return (
    <div>
      <div
        className="flex justify-between items-center lg:px-6 pb-5"
        style={{
          borderBottom: "1px #999 solid",
        }}
      >
        <h1 className="font-medium text-3xl">Rooms</h1>
        {hasManagingPerms && (
          <>
            <AddRoom
              handleSuccess={handleRoomAddSuccess}
              hasManagingPerms={hasManagingPerms}
            />
          </>
        )}
      </div>
      <div className="mt-12 grid grid-cols-cards gap-4">
        {rooms.map((room: any, index) => {
          return (
            <RoomCard
              key={`room-${index}`}
              isLoading={isLoading}
              room={room}
              hasManagingPerms={hasManagingPerms}
              onDeleteCallback={handleRoomDelete}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RoomsList;
