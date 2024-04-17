import { fDateSlash, fDayDate, fMonthYear } from "@/utils/formatDate";
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
import DashboardSalesChartCard from "../../organisms/cards/DashboardSalesChartCard";
import { summaryRecentSales, summaryTopProducts } from "@/_dummyData/dashboard";

type IProps = {
  selected: number;
};

function DashboardSummary({ selected }: IProps) {
  const lastItem = summaryRecentSales.length - 1;

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

      {/* Summaries */}
      <div className="grid grid-cols-3 gap-10 mb-16">
        <DashboardSummaryCard
          icon={<FileText color="#14B8A6" />}
          title="Total Transaction"
          content={
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
          content={
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
          content={
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
          content={
            <p className="text-teal-500 text-3xl font-extrabold mt-8 mb-6">
              Product 10
            </p>
          }
          footer="120 sales/month "
        />
        <DashboardSummaryCard
          icon={<TrendingUp color="#14B8A6" />}
          title="Growth vs Yesterday"
          content={
            <p className="text-teal-500 text-3xl font-extrabold mt-8 mb-6">
              Product 10
            </p>
          }
          footer="120 sales/month"
        />
        <DashboardSummaryCard
          icon={<Trophy color="#14B8A6" />}
          title="Achievement"
          content={
            <p className="text-teal-500 text-3xl font-extrabold mt-8 mb-6">
              Product 10
            </p>
          }
          footer="120 sales/month"
        />
      </div>

      {/* Line Chart */}
      <div className="mb-10">
        <DashboardSalesChartCard selected={selected} />
      </div>

      {/* Summaries */}
      <div className="grid grid-cols-3 gap-10">
        <DashboardSummaryCard
          title="Recent Sales"
          content={
            <div className="flex flex-col mt-7 gap-[10px]">
              <table className="table-auto w-full rounded-md">
                <tbody>
                  {summaryRecentSales.map((sale, index) => (
                    <tr key={index} className="border-t">
                      <td
                        className={`pt-2.5 pr-2  ${
                          index === lastItem ? "pb-0" : "pb-2.5"
                        }`}
                      >
                        <p className="text-teal-900">{sale.name}</p>
                      </td>
                      <td
                        className={`pt-2.5 pr-2 ${
                          index === lastItem ? "pb-0" : "pb-2.5"
                        }`}
                      >
                        <p className="text-slate-500 font-semibold">
                          x{sale.quantity}
                        </p>
                      </td>
                      <td
                        className={`pt-2.5 ${
                          index === lastItem ? "pb-0" : "pb-2.5"
                        }`}
                      >
                        <p className="text-right">{fDateSlash(sale.date)}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          }
        />

        <DashboardSummaryCard
          title="Top Products"
          content={
            <div className="flex flex-col mt-7 gap-[10px]">
              <table className="table-auto w-full rounded-md">
                <tbody>
                  {summaryTopProducts.map((product, index) => (
                    <tr key={index} className="border-t">
                      <td
                        className={`pt-2.5 pr-2  ${
                          index === lastItem ? "pb-0" : "pb-2.5"
                        }`}
                      >
                        <p className="text-teal-900">{product.name}</p>
                      </td>
                      <td
                        className={`pt-2.5 pr-2 ${
                          index === lastItem ? "pb-0" : "pb-2.5"
                        }`}
                      >
                        <p className="text-slate-500 text-right font-semibold">
                          x{product.quantity}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          }
        />
      </div>
    </div>
  );
}

export default DashboardSummary;
