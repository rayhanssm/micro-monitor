"use client";

import IconButton from "@/components/customize/atoms/button/IconButton";
import RangeDatePicker from "@/components/customize/molecules/date-picker/RangeDatePicker";
import { Calendar, CirclePlus, Download } from "lucide-react";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";

function ExpenseView() {
  const [selected, setSelected] = useState<DateRange>();

  return (
    <div className="px-[116px] py-[112px]">
      <div className="mb-6 flex justify-end gap-6">
        <RangeDatePicker selected={selected} setSelected={setSelected} />
        <IconButton
          icon={<Download />}
          text="Export to Excel"
          type="outlined"
        />
        <IconButton icon={<CirclePlus />} text="Add" type="filled" />
      </div>
    </div>
  );
}

export default ExpenseView;
