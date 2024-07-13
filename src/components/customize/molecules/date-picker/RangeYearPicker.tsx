import { addDays } from "date-fns";
import { Calendar, ChevronDown } from "lucide-react";
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
  .react-datepicker-year-header {
    color: #14B8A6;
  }
  .react-datepicker__header {
    background-color: #FFFFFF;
    border-bottom: none
  }
  .react-datepicker__year-text--in-range {
    background-color: #14B8A6;
  }
  .react-datepicker__year-text--range-start {
    background-color: #14B8A650;
  }
  .react-datepicker__year-text--in-selecting-range {
    background-color: #14B8A650!important;
  }
  .react-datepicker__year-wrapper {
    max-width: 140px;
  }
`;

type IProps = {
  yearRange: any;
  setYearRange: any;
};

function RangeYearPicker({ yearRange, setYearRange }: IProps) {
  const [startDate, endDate] = yearRange;

  return (
    <div>
      <style>{css}</style>
      <DatePicker
        showIcon
        icon={<Calendar color="#0F766E" size={24} />}
        showYearPicker
        dateFormat="yyyy"
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={(update: any) => {
          setYearRange(update);
        }}
        className="flex justify-center py-2 px-3 border text-teal-700 text-sm font-medium border-slate-400 max-w-32 rounded-lg cursor-pointer lining-nums"
      />
      {/* <DatePicker
        showIcon
        selected={selectedYear}
        onChange={(date) => handleYearChange(date as Date)}
        showYearPicker
        dateFormat="yyyy"
        className="flex justify-center py-2 px-3 border text-teal-700 text-sm font-medium border-slate-400 max-w-20 rounded-lg cursor-pointer lining-nums"
        icon={<Calendar color="#0F766E" size={24} />}
        disabledKeyboardNavigation
      /> */}
    </div>
  );
}

export default RangeYearPicker;
