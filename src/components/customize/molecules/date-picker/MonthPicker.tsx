import { id } from "date-fns/locale";
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
  selectedDate: any;
  setSelectedDate: any;
};

function MonthPicker({ selectedDate, setSelectedDate }: IProps) {
  return (
    <div>
      <style>{css}</style>
      <DatePicker
        showIcon
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        showMonthYearPicker
        dateFormat="MMMM"
        className="flex justify-center py-2 px-3 border border-slate-400 max-w-32 rounded-lg cursor-pointer lining-nums"
        icon={<ChevronDown />}
        disabledKeyboardNavigation
        locale={id}
      />
    </div>
  );
}

export default MonthPicker;
