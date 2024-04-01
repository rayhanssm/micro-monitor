"use client";

import useClickOutsideElement from "@/hooks/useClickOutsideElement";
import React, { useState } from "react";
import { DayPicker } from "react-day-picker";

type IProps = {
  label: string;
  name: string;
};

function DatePickerField({ label, name }: IProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Date>();

  const datePickerRef = useClickOutsideElement(setIsOpen);

  const handleClickDatePicker = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <label className="w-fit text-slate-900 text-sm font-medium">
        {label}
      </label>
      <input
        type={"date"}
        name={name}
        value="12/12/2002"
        className="w-full bg-white border border-slate-300 text-slate-900 text-sm rounded-lg px-3 py-2"
      />

      {/* TODO: adjust later
      <div onClick={handleClickDatePicker}>tes</div>

      <div
        ref={datePickerRef}
        className={`${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 invisible"
        } p-3 mt-12 bg-white absolute shadow-lg rounded-lg transition-all`}
      >
        <DayPicker
          mode="single"
          selected={selected}
          captionLayout="dropdown-buttons"
          fromYear={2010}
          toYear={new Date().getFullYear()}
          onSelect={setSelected}
          showOutsideDays
        />
      </div> */}
    </div>
  );
}

export default DatePickerField;
