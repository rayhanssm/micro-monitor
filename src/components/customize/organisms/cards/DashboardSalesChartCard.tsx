import React from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { fNum } from "@/utils/formatNumber";
import YearPicker from "../../molecules/date-picker/YearPicker";
import MonthPicker from "../../molecules/date-picker/MonthPicker";

type IProps = {
  selected: number;
  data: any;
  salesDate: any;
  setSalesDate: any;
};

function DashboardSalesChartCard({
  selected,
  data,
  salesDate,
  setSalesDate,
}: IProps) {
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
        <p className="text-2xl font-semibold">
          {selected === 1 ? "Penjualan Harian" : "Penjualan Bulanan"}
        </p>
        {selected === 1 ? (
          <MonthPicker
            selectedDate={salesDate}
            setSelectedDate={setSalesDate}
          />
        ) : (
          <YearPicker selectedYear={salesDate} setSelectedYear={setSalesDate} />
        )}
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          width={50}
          data={data}
          margin={{ top: 50, right: 20, left: 0, bottom: 0 }}
        >
          <XAxis dataKey="label" tick={{ fontSize: 14 }} />
          <YAxis />
          <Tooltip content={customTooltip} />
          <Line type="monotone" dataKey="sales" stroke="#14B8A6" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DashboardSalesChartCard;
