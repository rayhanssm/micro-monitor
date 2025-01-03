import { id } from "date-fns/locale";
import { Calendar } from "lucide-react";
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
  .react-datepicker-year-header {
    color: #14B8A6;
  }
  .react-datepicker__header {
    background-color: #FFFFFF;
    border-bottom: none
  }
  .react-datepicker__month-text--selected {
    background-color: #14B8A6;
  }
`;

type IProps = {
  selectedDate: any;
  setSelectedDate: any;
};

function MonthYearPicker({ selectedDate, setSelectedDate }: IProps) {
  return (
    <div>
      <style>{css}</style>
      <DatePicker
        showIcon
        selected={selectedDate}
        onChange={(date: Date | null) => setSelectedDate(date)}
        showMonthYearPicker
        dateFormat="MM/yyyy"
        className="flex text-teal-700 text-sm font-medium border border-slate-400 max-w-28 rounded-lg cursor-pointer lining-nums"
        icon={<Calendar color="#0F766E" size={24} />}
        disabledKeyboardNavigation
        locale={id}
      />
    </div>
  );
}

export default MonthYearPicker;
