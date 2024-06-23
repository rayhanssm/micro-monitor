import { ChevronDown } from "lucide-react";
import React from "react";
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
  const handleYearChange = (date: Date) => {
    const selectedDate = new Date(date.getFullYear(), 0, 1);
    setSelectedYear(selectedDate);
  };

  return (
    <div>
      <style>{css}</style>
      <DatePicker
        showIcon
        selected={selectedYear}
        onChange={(date) => handleYearChange(date as Date)}
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
