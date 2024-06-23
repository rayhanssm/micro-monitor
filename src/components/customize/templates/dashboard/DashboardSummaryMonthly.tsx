import { fMonth, fMonthYear } from "@/utils/formatDate";
import React, { useState } from "react";
import DashboardSummaryCard from "../../organisms/cards/DashboardSummaryCard";
import {
  CircleChevronDown,
  CircleChevronUp,
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
import { summaryMonthly } from "@/_dummyData/dashboard";
import { fNum } from "@/utils/formatNumber";
import MonthYearPicker from "../../molecules/date-picker/MonthYearPicker";

type IProps = {
  selected: number;
};

function DashboardSummaryMonthly({ selected }: IProps) {
  const lastItem = summaryMonthly.lastSalesList.length - 1;

  const [date, setDate] = useState<Date | undefined>(new Date());

  const summaryData = summaryMonthly;

  const monthlySalesList = summaryData.monthlySalesList.map((l) => {
    return {
      label: fMonth(l.label),
      sales: l.sales,
    };
  });

  return (
    <div>
      <div className="flex justify-between mb-6 lining-nums">
        <p className="text-slate-500 font-semibold text-2xl">
          {fMonthYear(date)}
        </p>
        <MonthYearPicker selectedDate={date} setSelectedDate={setDate} />
      </div>

      {/* Summaries */}
      <div className="grid grid-cols-3 gap-10 mb-16">
        <DashboardSummaryCard
          icon={<FileText color="#14B8A6" />}
          title="Total Transaksi"
          content={
            <p className="text-teal-500 text-5xl font-extrabold mt-8 mb-6">
              {fNum(summaryData.totalTransaction)}
            </p>
          }
          footer="Dari bulan lalu"
          footerIcon={
            summaryData.totalTransactionGrowth <= 0 ? (
              <div className="flex gap-1 items-center bg-red-100 rounded-full px-3 py-1">
                {/* <CircleChevronDown size={12} color="#EF4444" /> */}
                <p className="text-red-500 text-sm font-semibold">
                  {summaryData.totalTransactionGrowth}%
                </p>
              </div>
            ) : (
              <div className="flex gap-1 items-center bg-teal-100 rounded-full px-3 py-1">
                <CircleChevronUp size={12} color="#14B8A6" />
                <p className="text-teal-500 text-sm font-semibold">
                  {summaryData.totalTransactionGrowth}%
                </p>
              </div>
            )
          }
        />
        <DashboardSummaryCard
          icon={<ShoppingBasket color="#14B8A6" />}
          title="Total Penjualan"
          content={
            <p className="text-teal-500 text-3xl font-extrabold mt-8 mb-6">
              IDR {fNum(summaryData.totalSales)}
            </p>
          }
          footer="Dari bulan lalu"
          footerIcon={
            summaryData.totalSalesGrowth <= 0 ? (
              <div className="flex gap-1 items-center bg-red-100 rounded-full px-3 py-1 lining-nums">
                {/* <CircleChevronDown size={12} color="#EF4444" /> */}
                <p className="text-red-500 text-sm font-semibold">
                  {summaryData.totalSalesGrowth}%
                </p>
              </div>
            ) : (
              <div className="flex gap-1 items-center bg-teal-100 rounded-full px-3 py-1 lining-nums">
                <CircleChevronUp size={12} color="#14B8A6" />
                <p className="text-teal-500 text-sm font-semibold">
                  {summaryData.totalSalesGrowth}%
                </p>
              </div>
            )
          }
        />
        <DashboardSummaryCard
          icon={<Target color="#14B8A6" />}
          title="Target"
          content={
            <p className="text-teal-500 text-3xl font-extrabold mt-4">
              IDR {fNum(summaryData.totalTarget)}
            </p>
          }
          footer="Bulan ini"
        />
        <DashboardSummaryCard
          icon={<DollarSign color="#14B8A6" />}
          title="Keuntungan"
          content={
            <p className="text-teal-500 text-3xl font-extrabold mt-4">
              IDR {fNum(summaryData.totalProfit)}
            </p>
          }
          footer="Bulan ini"
        />
        <DashboardSummaryCard
          icon={<SquareSlash color="#14B8A6" />}
          title="Rata-rata Penjualan"
          content={
            <p className="text-teal-500 text-3xl font-extrabold mt-4">
              IDR {fNum(summaryData.averageSales)}/hari
            </p>
          }
          footer="Dari bulan ini"
        />
        <DashboardSummaryCard
          icon={<Trophy color="#14B8A6" />}
          title="Pencapaian"
          content={
            <div className="flex flex-col my-5">
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
          footer="Bulan ini"
        />
        <DashboardSummaryCard
          icon={<Medal color="#14B8A6" />}
          title="Produk Teratas"
          content={
            <p className="text-teal-500 text-3xl font-extrabold my-6">
              {summaryData.topProduct}
            </p>
          }
          footer={`${summaryData.topProductSold} terjual bulan ini`}
        />
        <DashboardSummaryCard
          icon={<HandCoins color="#14B8A6" />}
          title="Total Pengeluaran"
          content={
            <p className="text-teal-500 text-3xl font-extrabold my-6">
              IDR {fNum(summaryData.totalExpense)}
            </p>
          }
          footer="Dari bulan lalu"
          footerIcon={
            summaryData.totalExpenseGrowth <= 0 ? (
              <div className="flex gap-1 items-center bg-red-100 rounded-full px-3 py-1 lining-nums">
                {/* <CircleChevronDown size={12} color="#EF4444" /> */}
                <p className="text-red-500 text-sm font-semibold">
                  {summaryData.totalExpenseGrowth}%
                </p>
              </div>
            ) : (
              <div className="flex gap-1 items-center bg-teal-100 rounded-full px-3 py-1 lining-nums">
                <CircleChevronUp size={12} color="#14B8A6" />
                <p className="text-teal-500 text-sm font-semibold">
                  {summaryData.totalExpenseGrowth}%
                </p>
              </div>
            )
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
          footer="Stok terjual bulan ini"
        />
      </div>

      {/* Line Chart */}
      <div className="mb-10">
        <DashboardSalesChartCard selected={selected} data={monthlySalesList} />
      </div>

      {/* Summaries */}
      <div className="grid grid-cols-3 gap-10">
        <DashboardSummaryCard
          title="Penjualan Terakhir"
          content={
            <div className="flex flex-col mt-7 gap-[10px]">
              <table className="table-auto w-full rounded-md">
                <tbody>
                  {summaryData.lastSalesList.map((l, index) => (
                    <tr key={index} className="border-t">
                      <td
                        className={`pt-2.5 pr-2  ${
                          index === lastItem ? "pb-0" : "pb-2.5"
                        }`}
                      >
                        <p className="text-teal-900">{fMonth(l.salesDate)}</p>
                      </td>
                      <td
                        className={`pt-2.5 ${
                          index === lastItem ? "pb-0" : "pb-2.5"
                        } text-slate-500 text-right font-semibold`}
                      >
                        <p className="text-right">IDR {fNum(l.salesValue)}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          }
        />

        <DashboardSummaryCard
          title="Keuntungan"
          content={
            <div className="flex flex-col mt-7 gap-[10px]">
              <table className="table-auto w-full rounded-md">
                <tbody>
                  {summaryData.lastProfitList.map((l, index) => (
                    <tr key={index} className="border-t">
                      <td
                        className={`pt-2.5 pr-2  ${
                          index === lastItem ? "pb-0" : "pb-2.5"
                        }`}
                      >
                        <p className="text-teal-900">{fMonth(l.profitDate)}</p>
                      </td>
                      <td
                        className={`pt-2.5 pr-2 ${
                          index === lastItem ? "pb-0" : "pb-2.5"
                        }`}
                      >
                        <p className="text-slate-500 text-right font-semibold">
                          IDR {fNum(l.profitValue)}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          }
        />

        <DashboardSummaryCard
          title="Produk Terjual"
          content={
            <div className="flex flex-col mt-7 gap-[10px]">
              <table className="table-auto w-full rounded-md">
                <tbody>
                  {summaryData.lastProductSoldList.map((l, index) => (
                    <tr key={index} className="border-t">
                      <td
                        className={`pt-2.5 pr-2  ${
                          index === lastItem ? "pb-0" : "pb-2.5"
                        }`}
                      >
                        <p className="text-teal-900">{fMonth(l.productDate)}</p>
                      </td>
                      <td
                        className={`pt-2.5 pr-2 ${
                          index === lastItem ? "pb-0" : "pb-2.5"
                        }`}
                      >
                        <p className="text-slate-500 text-right font-semibold">
                          x{l.productSold}
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

export default DashboardSummaryMonthly;