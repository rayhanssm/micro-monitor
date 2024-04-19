import React from "react";
import DropdownButton from "../../atoms/button/DropdownButton";
import { monthOptionsDummy, yearOptionsDummy } from "@/_dummyData/options";
import { summaryDailyChart, summaryMonthlyChart } from "@/_dummyData/dashboard";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { fNum } from "@/utils/formatNumber";

type IProps = {
  selected: number;
};

function DashboardSalesChartCard({ selected }: IProps) {
  const customTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border rounded-lg p-3 shadow-md">
          <p className="text-md font-semibold">{label}:</p>
          <p className="text-xl font-bold text-teal-500">
            {fNum(payload[0].value)}
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="p-6 rounded-lg shadow-md border">
      <div className="flex justify-between ">
        <p className="text-2xl font-semibold">Daily Sales</p>
        <DropdownButton
          options={selected === 1 ? monthOptionsDummy : yearOptionsDummy}
        />
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          width={50}
          data={selected === 1 ? summaryDailyChart : summaryMonthlyChart}
          margin={{ top: 50, right: 20, left: 0, bottom: 0 }}
        >
          <XAxis dataKey="label" tick={{ fontSize: 14 }} />
          <YAxis />
          <Tooltip content={customTooltip} />
          <Line type="monotone" dataKey="sale" stroke="#14B8A6" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DashboardSalesChartCard;
