"use client";

import IconButton from "@/components/customize/atoms/button/IconButton";
import RangeDatePicker from "@/components/customize/molecules/date-picker/RangeDatePicker";
import SearchField from "@/components/customize/molecules/input-field/SearchField";
import ExpenseTable from "@/components/customize/organisms/tables/ExpenseTable";
import { CirclePlus, Download } from "lucide-react";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";

function ExpenseView() {
  const [selected, setSelected] = useState<DateRange>();
  const [isShowAddModal, setIsShowAddModal] = useState(false);

  return (
    <div className="px-[116px] py-[112px]">
      <div className="flex justify-between mb-6">
        <SearchField name="expenseSearch" />

        <div className="flex gap-6">
          <RangeDatePicker selected={selected} setSelected={setSelected} />
          <IconButton
            icon={<Download />}
            text="Export to Excel"
            type="outlined"
          />
          <IconButton
            icon={<CirclePlus />}
            text="Add"
            type="filled"
            onClick={() => setIsShowAddModal(true)}
          />
        </div>
      </div>

      <ExpenseTable
        isShowAddModal={isShowAddModal}
        setIsShowAddModal={setIsShowAddModal}
      />
    </div>
  );
}

export default ExpenseView;
