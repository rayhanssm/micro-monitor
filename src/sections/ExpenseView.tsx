"use client";

import { expenseList } from "@/_dummyData/expense";
import IconButton from "@/components/customize/atoms/button/IconButton";
import ExpenseButtonGroup from "@/components/customize/molecules/button-group/ExpenseButtonGroup";
import RangeDatePicker from "@/components/customize/molecules/date-picker/RangeDatePicker";
import RangeYearPicker from "@/components/customize/molecules/date-picker/RangeYearPicker";
import ExpenseDaily from "@/components/customize/templates/expense/ExpenseDaily";
import ExpenseMonthly from "@/components/customize/templates/expense/ExpenseMonthly";
import { addDays } from "date-fns";
import { CirclePlus } from "lucide-react";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";

function ExpenseView() {
  const [selectedExpense, setSelectedExpense] = useState(1);
  const [dateRange, setDateRange] = useState<DateRange>();
  const [yearRange, setYearRange] = useState([
    new Date(addDays(new Date(), -365)),
    new Date(),
  ]);
  const [isShowAddModal, setIsShowAddModal] = useState(false);

  const expenseTab = () => {
    switch (selectedExpense) {
      case 1:
        return (
          <ExpenseDaily
            selected={dateRange}
            setSelected={setDateRange}
            isShowAddModal={isShowAddModal}
            setIsShowAddModal={setIsShowAddModal}
          />
        );
      case 2:
        return (
          <ExpenseMonthly
            selected={yearRange}
            isShowAddModal={isShowAddModal}
            setIsShowAddModal={setIsShowAddModal}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="px-4 py-[112px] lg:px-[116px]">
      <div className="flex flex-col lg:flex-row lg:justify-between mb-6">
        <ExpenseButtonGroup
          selected={selectedExpense}
          setSelected={setSelectedExpense}
        />
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          {selectedExpense === 1 ? (
            <RangeDatePicker selected={dateRange} setSelected={setDateRange} />
          ) : (
            <RangeYearPicker
              yearRange={yearRange}
              setYearRange={setYearRange}
            />
          )}
          <IconButton
            icon={<CirclePlus />}
            text="Tambah"
            type="filled"
            onClick={() => {
              setIsShowAddModal(true);
            }}
          />
        </div>
      </div>
      {expenseTab()}
    </div>
  );
}

export default ExpenseView;
