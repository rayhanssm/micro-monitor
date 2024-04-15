import { fDayDate, fMonthYear } from "@/utils/formatDate";
import React, { useState } from "react";
import DatePicker from "../../molecules/date-picker/DatePicker";
import DashboardSummaryCard from "../../organisms/cards/DashboardSummaryCard";
import {
  CircleChevronDown,
  CircleChevronUp,
  DollarSign,
  FileText,
  ShoppingBasket,
  Target,
  TrendingUp,
  Trophy,
} from "lucide-react";

type IProps = {
  selected: number;
};

function DashboardSummary({ selected }: IProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

  return (
    <div>
      <div className="flex justify-between mb-6">
        <p className="text-slate-500 font-semibold text-2xl">
          {selected === 1 ? fDayDate(new Date()) : fMonthYear(new Date())}
        </p>
        <DatePicker selected={selectedDate} setSelected={setSelectedDate} />
      </div>

      <div className="grid grid-cols-3 gap-10">
        <DashboardSummaryCard
          icon={<FileText color="#14B8A6" />}
          title="Total Transaction"
          data={
            <p className="text-teal-500 text-5xl font-extrabold mt-8 mb-6">
              IDR 5M
            </p>
          }
          footer="From yesterday"
          footerIcon={
            <div className="flex gap-1 items-center bg-red-100 rounded-full px-3 py-1">
              <CircleChevronDown size={12} color="#EF4444" />
              <p className="text-red-500 text-sm font-semibold">4%</p>
            </div>
          }
        />
        <DashboardSummaryCard
          icon={<ShoppingBasket color="#14B8A6" />}
          title="Total Sales"
          data={
            <p className="text-teal-500 text-5xl font-extrabold mt-8 mb-6">
              45
            </p>
          }
          footer="From yesterday"
          footerIcon={
            <div className="flex gap-1 items-center bg-teal-100 rounded-full px-3 py-1">
              <CircleChevronUp size={12} color="#14B8A6" />
              <p className="text-teal-500 text-sm font-semibold">4%</p>
            </div>
          }
        />
        <DashboardSummaryCard
          icon={<Target color="#14B8A6" />}
          title="Target"
          data={
            <div className="flex flex-col">
              <p className="text-teal-500 text-3xl font-extrabold leading-[48px]">
                50%
              </p>
              <div className="w-[200px] h-4 bg-[#D9D9D9] rounded-full overflow-hidden">
                <div className="w-[50%] h-4 bg-teal-500 rounded-full"></div>
              </div>
            </div>
          }
          footer="120 sales/month"
        />
        <DashboardSummaryCard
          icon={<DollarSign color="#14B8A6" />}
          title="Total Transaction"
          data={
            <p className="text-teal-500 text-5xl font-extrabold mt-8 mb-6">
              Product 10
            </p>
          }
          footer="120 sales/month "
        />
        <DashboardSummaryCard
          icon={<TrendingUp color="#14B8A6" />}
          title="Growth vs Yesterday"
          data={
            <p className="text-teal-500 text-5xl font-extrabold mt-8 mb-6">
              Product 10
            </p>
          }
          footer="120 sales/month"
        />
        <DashboardSummaryCard
          icon={<Trophy color="#14B8A6" />}
          title="Achievement"
          data={
            <p className="text-teal-500 text-5xl font-extrabold mt-8 mb-6">
              Product 10
            </p>
          }
          footer="120 sales/month"
        />
      </div>
    </div>
  );
}

export default DashboardSummary;
