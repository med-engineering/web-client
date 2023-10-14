import { FC } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import Stats from "../Dashboard/Service/Stats";
import SideBar from "../../components/dashboard/SideBar";
import { useServiceContext } from "../../contexts/ServiceContext";
import InvalidService from "./Service/InvalidService";
import SetService from "./Service/SetService";
import ServiceSettings from "./Service/ServiceSettings";
import PreLoader from "../../components/loaders/PreLoader";

const Services: FC = () => {
  const { isServiceFetch, service } = useServiceContext();

  console.log(isServiceFetch || (!isServiceFetch && service));

  return (
    <>
      <Routes>
        <Route
          path="/:id/*"
          element={
            <>
              <SetService />
              {isServiceFetch || (!isServiceFetch && service) ? (
                <SideBar />
              ) : (
                <InvalidService />
              )}
            </>
          }
        />
      </Routes>

      {!isServiceFetch && service ? (
        <main className="main-services fixed w-dashboard-content left-[300px] bottom-0 h-[calc(100vh-60px)] overflow-auto sm:px-4 px-2 py-3">
          <Routes>
            <Route path="/:id" element={<Stats />} />
            <Route path="/:id/settings" element={<ServiceSettings />} />
          </Routes>
        </main>
      ) : (
        isServiceFetch &&
        service && (
          <main className="main-services fixed w-dashboard-content left-[300px] bottom-0 h-[calc(100vh-60px)] overflow-auto sm:px-4 px-2 py-3">
            <Routes>
              <Route
                path="/:id/*"
                element={
                  <>
                    <div className="h-full w-full flex items-center justify-center">
                      <PreLoader />
                    </div>
                  </>
                }
              />
            </Routes>
          </main>
        )
      )}
    </>
  );
};

export default Services;
