import React, { useState } from "react";
import IconButton from "../../atoms/button/IconButton";
import { Calendar } from "lucide-react";
import "react-day-picker/dist/style.css";
import { DateRange, DayPicker } from "react-day-picker";
import useClickOutsideElement from "@/hooks/useClickOutsideElement";
import Button from "../../atoms/button/Button";
import { fDateSlash } from "@/utils/formatDate";

type IProps = {
  selected: any;
  setSelected: (value: DateRange | undefined) => void;
};

function RangeDatePicker({ selected, setSelected }: IProps) {
  const [isOpen, setIsOpen] = useState(false);
  const datePickerRef = useClickOutsideElement(setIsOpen);

  const handleClickDatePicker = () => {
    setIsOpen(!isOpen);
  };

  const footer = (
    <div className="mt-3 flex gap-2 justify-end">
      <Button
        text="Cancel"
        type="outlined"
        onClick={() => {
          setIsOpen(false);
          setSelected(undefined);
        }}
      />
      <Button
        text="Reset"
        type="outlined"
        onClick={() => {
          setSelected(undefined);
        }}
      />
      <Button
        text="Filter"
        type="filled"
        onClick={() => {
          setIsOpen(false);
        }}
      />
    </div>
  );

  return (
    <div className="flex flex-col items-end">
      <IconButton
        icon={<Calendar />}
        text={
          selected
            ? `${fDateSlash(selected?.from)} - ${
                selected.to ? fDateSlash(selected?.to) : ""
              }`
            : "Select a date"
        }
        type="outlined"
        onClick={handleClickDatePicker}
      />

      <div
        ref={datePickerRef}
        className={`${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 invisible"
        } p-3 mt-12 bg-white absolute shadow-lg rounded-lg transition-all`}
      >
        {/* TODO: adjust styling later */}
        <DayPicker
          mode="range"
          selected={selected}
          onSelect={setSelected}
          numberOfMonths={2}
          showOutsideDays
          captionLayout="dropdown-buttons"
          fromYear={2010}
          toYear={new Date().getFullYear()}
        />
        {footer}
      </div>
    </div>
  );
}

export default RangeDatePicker;
