import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const css = `
  .react-datepicker-wrapper,
  .react-datepicker__input-container,
  .react-datepicker__input-container input {
    width: 100%;
    display: flex;
    align-items: center;
  }
`;

type IProps = {
  selectedYear: any;
  setSelectedYear: any;
};

function YearPicker({ selectedYear, setSelectedYear }: IProps) {
  return (
    <div>
      <style>{css}</style>
      <DatePicker
        showIcon
        selected={selectedYear}
        onChange={(date) => setSelectedYear(date)}
        showYearPicker
        dateFormat="yyyy"
        className="flex justify-center py-2 px-3 border border-slate-400 max-w-20 rounded-lg cursor-pointer lining-nums"
        icon={<ChevronDown />}
        disabledKeyboardNavigation
      />
    </div>
  );
}

export default YearPicker;
