"use client";
import { CSSProperties, FC } from "react";
import {
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";


interface DashboardPieChartProps {
  chartData: {
    name: string | number;
    stat: string | number;
    color: string;
  }[];
  style?: CSSProperties;
}

const DashboardPieChart: FC<DashboardPieChartProps> = ({
  chartData,
  style,
}) => {
  return (
    <>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <PieChart
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <Tooltip labelStyle={{ color: "#111" }} />
            <Pie
              className="w-[80%]"
              data={chartData}
              dataKey="stat"
              cx="50%"
              cy="50%"
              label
            >
              {chartData.map((data, index) => (
                <Cell key={`cell-${index}`} fill={data.color} />
              ))}
            </Pie>
            <Legend layout="horizontal" verticalAlign="bottom" align="center" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default DashboardPieChart;
