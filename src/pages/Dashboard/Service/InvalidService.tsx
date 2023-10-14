import { FC } from "react";
import Button from "../../../components/general/Button";
import { useNavigate } from "react-router-dom";

interface InvalidServiceProps {
  // Add your prop types here
}

const InvalidService: FC<InvalidServiceProps> = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center fixed w-full bottom-0 h-[calc(100vh-60px)] overflow-auto sm:px-4 px-2 py-3">
      <div className="flex flex-col justify-center items-center text-center">
        <h1 className="mx-2 text-xl">
          This service was not found, removed, or you don't have the access to
          it
        </h1>
        <Button className="mt-4" onClick={() => navigate("/dashboard", { replace: true })}>
          Services Page
        </Button>
      </div>
    </div>
  );
};

export default InvalidService;
