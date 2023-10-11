import { FC } from "react";
import PreLoader from "./PreLoader";

interface PreLoaderScreenProps {
  // Add your prop types here
}

const PreLoaderScreen: FC<PreLoaderScreenProps> = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-dark-2-lighter">
      <PreLoader />
    </div>
  );
};

export default PreLoaderScreen;
