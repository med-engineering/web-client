import { FC } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import Stats from "../Dashboard/Service/Stats";
import SideBar from "../../components/dashboard/SideBar";
import { useServiceContext } from "../../contexts/ServiceContext";
import InvalidService from "./Service/InvalidService";
import SetService from "./Service/SetService";
import ServiceSettings from "./Service/ServiceSettings";
import PreLoader from "../../components/loaders/PreLoader";
import Rooms from "./Rooms";
import MainContainer from "../../components/dashboard/MainContainer";

const Services: FC = () => {
  const { isServiceFetch, service } = useServiceContext();

  return (
    <>
      <Routes>
        <Route
          path="/:serviceID/*"
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
        <MainContainer>
          <Routes>
            <Route path="/:serviceID" element={<Stats />} />
            <Route path="/:serviceID/rooms/*" element={<Rooms />} />
            <Route path="/:serviceID/settings" element={<ServiceSettings />} />
          </Routes>
        </MainContainer>
      ) : (
        isServiceFetch && (
          <MainContainer>
            <Routes>
              <Route
                path="/:serviceID/*"
                element={
                  <>
                    <div className="h-full w-full flex items-center justify-center">
                      <PreLoader />
                    </div>
                  </>
                }
              />
            </Routes>
          </MainContainer>
        )
      )}
    </>
  );
};

export default Services;
