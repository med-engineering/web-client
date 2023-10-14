import { FC } from "react";
import machineIcon from "../../../assets/machine.svg";
import { pageSpacings } from "../../../styles";
import StateCard from "../../../components/dashboard/StateCard";
import DashboardLineChart from "../../../components/dashboard/DashboardLineChart";
import DashboardBarsChart from "../../../components/dashboard/DashboardBarsChart";
import DashboardPieChart from "../../../components/dashboard/DashboardPieChart";
import AuthChecker from "../../../components/Auth/AuthChecker";
import { useServiceContext } from "../../../contexts/ServiceContext";

const Stats: FC = () => {
  const { service, isServiceFetch } = useServiceContext();
  return (
    <div className={`${pageSpacings}`}>
      <div className="grid grid-cols-cards gap-6 mt-4">
        <StateCard
          name="Machines"
          value={service?.machines?.length ?? 0}
          isLoading={isServiceFetch}
          icon={machineIcon}
        />
        <StateCard
          name="Rooms"
          value={service?.rooms?.length ?? 0}
          isLoading={isServiceFetch}
          icon={machineIcon}
        />
        <StateCard name="State 3" value={64} icon={machineIcon} />
      </div>
      <div className="mt-7 w-full">
        <div className="grid grid-cols-2 w-full gap-3">
          <div className="px-2 py-2 bg-dark-2 rounded-md">
            <h1 className="text-xl mb-4 ml-2 font-extralight">State 1 (7d)</h1>
            <DashboardLineChart
              style={{ maxWidth: "max-content" }}
              chartData={[0, 76, 23, 67, 12, 7, 21]}
              color={"#813be3"}
            />
          </div>
          <div className="px-2 flex-1 py-2 bg-dark-2 rounded-md">
            <h1 className="text-xl mb-4 ml-2 font-extralight">State 2</h1>
            <DashboardLineChart
              style={{ maxWidth: "max-content" }}
              chartData={[40, 65, 40, 20, 12, 18, 22]}
              color={"#96e3e3"}
            />
          </div>
        </div>
        <div className="px-2 w-full py-2 bg-dark-2 rounded-md mt-3">
          <h1 className="text-xl mb-4 ml-2 font-extralight">State 3 (14d)</h1>
          <DashboardBarsChart
            style={{ maxWidth: "max-content" }}
            chartData={[12, 50, 60, 99, 13, 24, 45]}
            color={"#113be3"}
          />
        </div>{" "}
        <div className="grid grid-cols-2 w-full gap-3 mt-3">
          <div className="px-2 py-2 bg-dark-2 rounded-md">
            <h1 className="text-xl mb-4 ml-2 font-extralight">State 4 (7d)</h1>
            <DashboardLineChart
              style={{ maxWidth: "max-content" }}
              chartData={[10, 65, 85, 90, 100, 96, 121]}
              color={"#813be3"}
            />
          </div>
          <div className="px-2 flex-1 py-2 bg-dark-2 rounded-md">
            <h1 className="text-xl mb-4 ml-2 font-extralight">
              Machines status
            </h1>
            <DashboardPieChart
              style={{ maxWidth: "max-content" }}
              chartData={[
                {
                  name: "functional",
                  stat: 33,
                  color: "#8eff7a",
                },
                {
                  name: "has-issues",
                  stat: 42,
                  color: "#ffc336",
                },
                {
                  name: "non-functional",
                  stat: 25,
                  color: "#ff4a36",
                },
              ]}
            />
          </div>
        </div>
        <div className="px-2 w-full py-2 bg-dark-2 rounded-md mt-3">
          <h1 className="text-xl mb-4 ml-2 font-extralight">State 6 (7d)</h1>
          <DashboardLineChart
            style={{ maxWidth: "max-content" }}
            chartData={[12, 50, 60, 99, 13, 24, 45]}
            color={"#113be3"}
          />
        </div>
      </div>
      <AuthChecker />
    </div>
  );
};

export default Stats;
