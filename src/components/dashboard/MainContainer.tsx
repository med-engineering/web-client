import { FC, ReactNode } from "react";

interface MainContainerProps {
  children: ReactNode;
}

const MainContainer: FC<MainContainerProps> = ({ children }) => {
  return (
    <main className="main-services fixed w-full sidebar:w-dashboard-content left-0 sidebar:left-[300px] duration-200 bottom-0 h-[calc(100vh-60px)] overflow-auto sm:px-4 px-2 py-3">
      {children}
    </main>
  );
};

export default MainContainer;
