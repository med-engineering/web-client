import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from '../components/dashboard/NavBar'
import ServicesList from "./Dashboard/Service/ServicesList";
import Services from "./Dashboard/Services";

const DashboardPage: FC = () => {
  return (
    <>
      <NavBar />
      <main className="fixed w-full bottom-0 h-[calc(100vh-60px)] overflow-auto sm:px-4 px-2 py-3">
        <Routes>
          <Route path="/" element={<ServicesList />} />
        </Routes>
      </main>
      <Routes>
        <Route path="/services/*" element={<Services />} />
      </Routes>
    </>
  );
};

export default DashboardPage;
