import { fDateSlash, fDay, fDayDate } from "@/utils/formatDate";
import React, { useEffect, useState } from "react";
import DatePicker from "../../molecules/date-picker/DatePicker";
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
import {
  summaryDaily,
  summaryRecentSales,
  summaryTopProducts,
} from "@/_dummyData/dashboard";
import { fNum } from "@/utils/formatNumber";
import { IDashboardSummaryDailyResponse } from "@/types/responses/DashboardResponse";
import { DashboardRepository } from "@/repositories/DashboardRepository";
import { subDays } from "date-fns";

type IProps = {
  selected: number;
};

function DashboardSummaryDaily({ selected }: IProps) {
  const lastItem = summaryDaily.lastProductSoldList.length - 1;

  const summaryData = summaryDaily;

  const [date, setDate] = useState<Date | undefined>(subDays(new Date(), 1));
  const [salesDate, setSalesDate] = useState<Date | undefined>(new Date());

  const [data, setData] = useState<IDashboardSummaryDailyResponse | null>(null);

  const dailySalesList = data?.dailySalesList.map((l) => {
    return {
      label: fDay(l.label),
      sales: l.sales,
    };
  });

  const getData = async () => {
    try {
      const res = await DashboardRepository.GetDashboardDaily({
        date: date,
        salesDate: salesDate,
      });
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [date, salesDate]);

  return (
    <div>
      <div className="flex justify-between mb-6">
        <p className="text-slate-500 font-semibold text-2xl">
          {fDayDate(date)}
        </p>
        <DatePicker selected={date} setSelected={setDate} />
      </div>

      {/* Summaries */}
      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-5 lg:gap-10 mb-16">
        <DashboardSummaryCard
          icon={<FileText color="#14B8A6" />}
          title="Total Transaksi"
          content={
            <p className="text-teal-500 text-5xl font-extrabold mt-8 mb-6">
              {fNum(data?.totalTransaction)}
            </p>
          }
          footer="Dari kemarin"
          footerIcon={
            data?.totalTransactionGrowth &&
            data?.totalTransactionGrowth <= 0 ? (
              <div className="flex gap-1 items-center bg-red-100 rounded-full px-3 py-1">
                {/* <CircleChevronDown size={12} color="#EF4444" /> */}
                <p className="text-red-500 text-sm font-semibold">
                  {data?.totalTransactionGrowth}%
                </p>
              </div>
            ) : (
              <div className="flex gap-1 items-center bg-teal-100 rounded-full px-3 py-1">
                <CircleChevronUp size={12} color="#14B8A6" />
                <p className="text-teal-500 text-sm font-semibold">
                  {data?.totalTransactionGrowth}%
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
              IDR {fNum(data?.totalSales)}
            </p>
          }
          footer="Dari kemarin"
          footerIcon={
            data?.totalSalesGrowth && data?.totalSalesGrowth <= 0 ? (
              <div className="flex gap-1 items-center bg-red-100 rounded-full px-3 py-1 lining-nums">
                {/* <CircleChevronDown size={12} color="#EF4444" /> */}
                <p className="text-red-500 text-sm font-semibold">
                  {data?.totalSalesGrowth}%
                </p>
              </div>
            ) : (
              <div className="flex gap-1 items-center bg-teal-100 rounded-full px-3 py-1 lining-nums">
                <CircleChevronUp size={12} color="#14B8A6" />
                <p className="text-teal-500 text-sm font-semibold">
                  {data?.totalSalesGrowth}%
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
              IDR {fNum(data?.totalTarget)}
            </p>
          }
          footer="Hari ini"
        />
        <DashboardSummaryCard
          icon={<DollarSign color="#14B8A6" />}
          title="Keuntungan"
          content={
            <p className="text-teal-500 text-3xl font-extrabold mt-4">
              IDR {fNum(data?.totalProfit)}
            </p>
          }
          footer="Hari ini"
        />
        <DashboardSummaryCard
          icon={<SquareSlash color="#14B8A6" />}
          title="Rata-rata Penjualan"
          content={
            <p className="text-teal-500 text-3xl font-extrabold mt-4">
              IDR {fNum(data?.averageSales)}
            </p>
          }
          footer="Hari ini"
        />
        <DashboardSummaryCard
          icon={<Trophy color="#14B8A6" />}
          title="Pencapaian"
          content={
            <div className="flex flex-col my-5">
              <p className="text-teal-500 text-3xl font-extrabold leading-[48px]">
                {fNum(data?.achievement)}%
              </p>
              <div className="w-[200px] h-4 bg-[#D9D9D9] rounded-full overflow-hidden">
                <div
                  style={{ width: `${data?.achievement}%` }}
                  className="h-4 bg-teal-500 rounded-full"
                ></div>
              </div>
            </div>
          }
          footer="Dari target hari ini"
        />
        <DashboardSummaryCard
          icon={<Medal color="#14B8A6" />}
          title="Produk Teratas"
          content={
            <p className="text-teal-500 text-3xl font-extrabold my-6">
              {data?.topProduct}
            </p>
          }
          footer={`${data?.topProductSold} terjual hari ini`}
        />
        <DashboardSummaryCard
          icon={<HandCoins color="#14B8A6" />}
          title="Total Pengeluaran"
          content={
            <p className="text-teal-500 text-3xl font-extrabold my-6">
              IDR {fNum(data?.totalExpense)}
            </p>
          }
          footer="Dari kemarin"
          footerIcon={
            data?.totalExpenseGrowth && data?.totalExpenseGrowth <= 0 ? (
              <div className="flex gap-1 items-center bg-red-100 rounded-full px-3 py-1 lining-nums">
                {/* <CircleChevronDown size={12} color="#EF4444" /> */}
                <p className="text-red-500 text-sm font-semibold">
                  {data?.totalExpenseGrowth}%
                </p>
              </div>
            ) : (
              <div className="flex gap-1 items-center bg-teal-100 rounded-full px-3 py-1 lining-nums">
                <CircleChevronUp size={12} color="#14B8A6" />
                <p className="text-teal-500 text-sm font-semibold">
                  {data?.totalExpenseGrowth}%
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
              {fNum(data?.totalProductSold)}
            </p>
          }
          footer="Stok terjual hari ini"
        />
      </div>

      {/* Line Chart */}
      <div className="mb-10">
        <DashboardSalesChartCard
          selected={selected}
          data={dailySalesList}
          salesDate={salesDate}
          setSalesDate={setSalesDate}
        />
      </div>

      {/* Summaries */}
      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-5 lg:gap-10">
        <DashboardSummaryCard
          title="Penjualan Terakhir"
          content={
            <div className="flex flex-col mt-7 gap-[10px]">
              <table className="table-auto w-full rounded-md">
                <tbody>
                  {data?.lastSalesList.map((l, index) => (
                    <tr key={index} className="border-t">
                      <td
                        className={`pt-2.5 pr-2  ${
                          index === lastItem ? "pb-0" : "pb-2.5"
                        }`}
                      >
                        <p className="text-teal-900">
                          {fDateSlash(l.salesDate)}
                        </p>
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
                  {data?.lastProfitList.map((l, index) => (
                    <tr key={index} className="border-t">
                      <td
                        className={`pt-2.5 pr-2  ${
                          index === lastItem ? "pb-0" : "pb-2.5"
                        }`}
                      >
                        <p className="text-teal-900">
                          {fDateSlash(l.profitDate)}
                        </p>
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
                  {data?.lastProductSoldList.map((l, index) => (
                    <tr key={index} className="border-t">
                      <td
                        className={`pt-2.5 pr-2  ${
                          index === lastItem ? "pb-0" : "pb-2.5"
                        }`}
                      >
                        <p className="text-teal-900">
                          {fDateSlash(l.productDate)}
                        </p>
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

export default DashboardSummaryDaily;
