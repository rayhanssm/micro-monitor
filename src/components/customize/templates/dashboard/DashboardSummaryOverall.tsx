import { fMonth, fMonthYear } from "@/utils/formatDate";
import React, { useState } from "react";
import DashboardSummaryCard from "../../organisms/cards/DashboardSummaryCard";
import {
  DollarSign,
  FileText,
  HandCoins,
  HandPlatter,
  Medal,
  ShoppingBasket,
  SquareSlash,
  Target,
  Trophy,
} from "lucide-react";
import DashboardSalesChartCard from "../../organisms/cards/DashboardSalesChartCard";
import { summaryOverall } from "@/_dummyData/dashboard";
import { fNum } from "@/utils/formatNumber";

type IProps = {
  selected: number;
};

function DashboardSummaryOverall({ selected }: IProps) {
  const lastItem = summaryOverall.topProductList.length - 1;

  const summaryData = summaryOverall;

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

  const monthlySalesList = summaryData.monthlySalesList.map((l) => {
    return {
      label: fMonth(l.label),
      sales: l.sales,
    };
  });

  return (
    <div>
      <div className="flex justify-between mb-6 linin">
        <p className="text-slate-500 font-semibold text-2xl">
          {fMonthYear(new Date())}
        </p>
      </div>

      {/* Summaries */}
      <div className="grid grid-cols-3 gap-10 mb-16 lining-nums">
        <DashboardSummaryCard
          icon={<FileText color="#14B8A6" />}
          title="Total Transaksi"
          content={
            <p className="text-teal-500 text-5xl font-extrabold mt-4">
              {fNum(summaryData.totalTransaction)}
            </p>
          }
        />
        <DashboardSummaryCard
          icon={<ShoppingBasket color="#14B8A6" />}
          title="Total Penjualan"
          content={
            <p className="text-teal-500 text-4xl font-extrabold mt-4">
              IDR {fNum(summaryData.totalSales)}
            </p>
          }
        />
        <DashboardSummaryCard
          icon={<Target color="#14B8A6" />}
          title="Target"
          content={
            <p className="text-teal-500 text-4xl font-extrabold mt-4">
              IDR {fNum(summaryData.totalTarget)}
            </p>
          }
        />
        <DashboardSummaryCard
          icon={<DollarSign color="#14B8A6" />}
          title="Keuntungan"
          content={
            <p className="text-teal-500 text-3xl font-extrabold mt-4">
              IDR {fNum(summaryData.totalProfit)}
            </p>
          }
        />
        <DashboardSummaryCard
          icon={<SquareSlash color="#14B8A6" />}
          title="Rata-rata Penjualan"
          content={
            <p className="text-teal-500 text-3xl font-extrabold mt-4">
              IDR {fNum(summaryData.averageSales)}/hari
            </p>
          }
        />
        <DashboardSummaryCard
          icon={<Trophy color="#14B8A6" />}
          title="Pencapaian"
          content={
            <div className="flex flex-col">
              <p className="text-teal-500 text-3xl font-extrabold leading-[48px]">
                {fNum(summaryData.achievement)}%
              </p>
              <div className="w-[200px] h-4 bg-[#D9D9D9] rounded-full overflow-hidden">
                <div
                  style={{ width: `${summaryData.achievement}%` }}
                  className="h-4 bg-teal-500 rounded-full"
                ></div>
              </div>
            </div>
          }
        />
        <DashboardSummaryCard
          icon={<Medal color="#14B8A6" />}
          title="Produk Teratas"
          content={
            <p className="text-teal-500 text-3xl font-extrabold mt-4">
              {summaryData.topProduct}
            </p>
          }
        />
        <DashboardSummaryCard
          icon={<HandCoins color="#14B8A6" />}
          title="Total Pengeluaran"
          content={
            <p className="text-teal-500 text-3xl font-extrabold mt-4">
              IDR {fNum(summaryData.totalExpense)}
            </p>
          }
        />
        <DashboardSummaryCard
          icon={<HandPlatter color="#14B8A6" />}
          title="Produk Terjual"
          content={
            <p className="text-teal-500 text-3xl font-extrabold mt-4">
              {fNum(summaryData.totalProductSold)}
            </p>
          }
        />
      </div>

      {/* Line Chart */}
      <div className="mb-10">
        <DashboardSalesChartCard selected={selected} data={monthlySalesList} />
      </div>

      {/* Summaries */}
      <div className="grid grid-cols-3 gap-10">
        <DashboardSummaryCard
          title="Produk Teratas"
          content={
            <div className="flex flex-col mt-7 gap-[10px]">
              <table className="table-auto w-full rounded-md">
                <tbody>
                  {summaryData.topProductList.map((item, index) => (
                    <tr key={index} className="border-t">
                      <td
                        className={`pt-2.5 pr-2  ${
                          index === lastItem ? "pb-0" : "pb-2.5"
                        }`}
                      >
                        <p className="text-teal-900">{item.productName}</p>
                      </td>
                      <td
                        className={`pt-2.5 ${
                          index === lastItem ? "pb-0" : "pb-2.5"
                        }`}
                      >
                        <p className="text-right">{fNum(item.productSold)}</p>
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

export default DashboardSummaryOverall;
