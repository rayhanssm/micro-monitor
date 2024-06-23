"use client";

import useClickOutsideElement from "@/hooks/useClickOutsideElement";
import React, { useState } from "react";
import IconButton from "../../atoms/button/IconButton";
import { Calendar } from "lucide-react";
import { fDateSlash } from "@/utils/formatDate";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const css = `
  .selected:not([disabled]) { 
    font-weight: bold;
    background-color: #0f766e;
    color: white;
  }
  .selected:hover:not([disabled]) { 
    border-color: #0f766e;
    color: #0f766e;
  }
`;

type IProps = {
  selected: any;
  setSelected: (value: Date | undefined) => void;
};

function DatePicker({ selected, setSelected }: IProps) {
  const [isOpen, setIsOpen] = useState(false);
  const datePickerRef = useClickOutsideElement(setIsOpen);

  const handleClickDatePicker = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col items-end">
      <style>{css}</style>
      <IconButton
        icon={<Calendar />}
        text={selected ? `${fDateSlash(selected)} ` : "Pilih tanggal"}
        type="outlined"
        onClick={handleClickDatePicker}
      />

      <div
        ref={datePickerRef}
        className={`${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 invisible"
        } p-3 mt-12 bg-white absolute z-50 shadow-lg rounded-lg transition-all`}
      >
        <DayPicker
          mode="single"
          selected={selected}
          onSelect={setSelected}
          showOutsideDays
          captionLayout="dropdown-buttons"
          fromYear={2010}
          toYear={new Date().getFullYear()}
          modifiersClassNames={{
            selected: "selected",
          }}
        />
      </div>
    </div>
  );
}

export default DatePicker;
