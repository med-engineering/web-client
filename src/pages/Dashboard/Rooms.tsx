import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import RoomsList from "./Rooms/RoomsList";

interface RoomsProps {}

const Rooms: FC<RoomsProps> = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<RoomsList />} />
      </Routes>
    </>
  );
};

export default Rooms;
