import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import Stats from "../Dashboard/Service/Stats";
import SideBar from "../../components/dashboard/SideBar";

const Services: FC = () => {
  return (
    <>
    adasd
      <Routes>
        <Route path="/:id" element={<SideBar />} />
      </Routes>
      <main className="fixed w-dashboard-content left-[300px] bottom-0 h-[calc(100vh-60px)] overflow-auto sm:px-4 px-2 py-3">
        <Routes>
          <Route path="/:id" element={<Stats />} />
        </Routes>
      </main>
    </>
  );
};

export default Services;
