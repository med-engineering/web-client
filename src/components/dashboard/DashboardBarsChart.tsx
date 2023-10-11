"use client";
import moment from "moment";
import { CSSProperties, FC } from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";


interface DashboardBarsChartProps {
  chartData: number[];
  color: string;
  style?: CSSProperties;
}

const DashboardBarsChart: FC<DashboardBarsChartProps> = ({
  chartData,
  color,
  style,
}) => {
  const nextDays = (length = 7) => {
    let days = [];
    for (var i = 1; i <= length; i++) {
      const day = moment().add(i, "days").format("DD-MM-YYYY");
      days.push(day);
    }
    return days;
  };

  const lastDays = (length = 7, minimum: number) => {
    var daysAgo = [];
    for (var i = 0; i < length; i++) {
      const day = moment().subtract(i, "days").format("DD-MM-YYYY");
      if (minimum && !isNaN(minimum)) {
        const time = moment(`${day} 11-59`, "DD-MM-YYYY hh-mm")
          .toDate()
          .getTime();
        if (minimum > time) {
          if (i < length) {
            const next = nextDays(length - i);
            next.map((day) => daysAgo.unshift(day));
          }
          break;
        }
      }
      daysAgo.push(day);
    }
    return daysAgo;
  };

  const days = lastDays(7, Date.now()).reverse();

  const data = days.map((day, index) => ({
    name: day,
    stat: chartData[index],
  }));

  return (
    <>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              labelStyle={{ color: "#111" }}
              
              cursor={{ fill: "#00000000", color: "red" }}
            />

            <Bar dataKey="stat" barSize={20} fill={color} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default DashboardBarsChart;
