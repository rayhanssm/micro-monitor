"use client";

import useClickOutsideElement from "@/hooks/useClickOutsideElement";
import { fDateInputValue } from "@/utils/formatDate";
import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import Button from "../../atoms/button/Button";

type IProps = {
  label: string;
  name: string;
};

function DateField({ label, name }: IProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Date>();

  const datePickerRef = useClickOutsideElement(setIsOpen);

  const handleClickDatePicker = (e: any) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleChangeDateValue = (e: any) => {
    setSelected(new Date(e.target.value));
  };

  const footer = (
    <div ref={datePickerRef} className="mt-3 flex gap-2 justify-end">
      <Button
        text="Go to Today"
        btnStyle="outlined"
        onClick={() => {
          setSelected(new Date());
        }}
      />
      <Button
        text="Reset"
        btnStyle="outlined"
        onClick={() => {
          setSelected(undefined);
        }}
      />
    </div>
  );

  return (
    <div>
      <label className="w-fit text-slate-900 text-sm font-medium">
        {label}
      </label>
      <input
        type="date"
        name={name}
        value={selected && fDateInputValue(selected)}
        onChange={handleChangeDateValue}
        onClick={handleClickDatePicker}
        className="w-full bg-white border border-slate-300 text-slate-900 text-sm rounded-lg px-3 py-2"
      />

      <div
        ref={datePickerRef}
        className={`${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 invisible"
        } p-3 bg-white absolute -top-6 -right-24 shadow-lg rounded-lg transition-all`}
      >
        <DayPicker
          mode="single"
          selected={selected}
          captionLayout="dropdown-buttons"
          fromYear={2010}
          toYear={new Date().getFullYear()}
          onSelect={setSelected}
          showOutsideDays
          footer={footer}
        />
      </div>
    </div>
  );
}

export default DateField;
