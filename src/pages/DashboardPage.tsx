import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import Stats from "./Dashboard/Stats";
import SideBar from "../components/dashboard/SideBar";

const DashboardPage: FC = () => {
  return (
    <>
      <SideBar />
      <main className="fixed w-dashboard-content left-[300px] bottom-0 h-screen overflow-auto sm:px-4 px-2 py-3">
        <Routes>
          <Route path="/" element={<Stats />} />
        </Routes>
      </main>
    </>
  );
};

export default DashboardPage;
