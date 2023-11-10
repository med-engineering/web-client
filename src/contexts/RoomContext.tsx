import {
  createContext,
  useState,
  useContext,
  FC,
  ReactNode,
  SetStateAction,
  Dispatch,
} from "react";

interface RoomContextValue {
  room: any;
  isRoomFetch: boolean;
  setIsRoomFetch: Dispatch<SetStateAction<boolean>>;
  setRoom: Dispatch<SetStateAction<any>>;
}

const RoomContext = createContext<RoomContextValue>({
  room: null,
  isRoomFetch: false,
  setIsRoomFetch: () => {},
  setRoom: () => {},
});

export const useRoomContext = () => useContext(RoomContext);
interface RoomProviderProps {
  children: ReactNode;
}
const RoomProvider: FC<RoomProviderProps> = ({ children }) => {
  const [room, setRoom] = useState<any>(null);
  const [isRoomFetch, setIsRoomFetch] = useState<boolean>(true);

  const value: RoomContextValue = {
    room,
    setRoom,
    isRoomFetch,
    setIsRoomFetch,
  };

  return (
    <RoomContext.Provider value={value}>{children}</RoomContext.Provider>
  );
};

export default RoomProvider;
