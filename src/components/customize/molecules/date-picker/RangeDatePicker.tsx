import React, { useEffect, useState } from "react";
import IconButton from "../../atoms/button/IconButton";
import { Calendar } from "lucide-react";
import "react-day-picker/dist/style.css";
import { DateRange, DayPicker } from "react-day-picker";
import useClickOutsideElement from "@/hooks/useClickOutsideElement";
import Button from "../../atoms/button/Button";
import { fDateSlash } from "@/utils/formatDate";

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
  selected: DateRange | undefined;
  setSelected: (value: DateRange | undefined) => void;
};

function RangeDatePicker({ selected, setSelected }: IProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const datePickerRef = useClickOutsideElement(setIsOpen);

  const handleClickDatePicker = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const footer = (
    <div className="mt-3 flex gap-2 justify-end">
      <style>{css}</style>
      <Button
        text="Cancel"
        btnStyle="outlined"
        onClick={() => {
          setIsOpen(false);
          setSelected(undefined);
        }}
      />
      <Button
        text="Reset"
        btnStyle="outlined"
        onClick={() => {
          setSelected(undefined);
        }}
      />
      <Button
        text="Filter"
        btnStyle="filled"
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
            : "Pilih tanggal"
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
        <DayPicker
          mode="range"
          selected={selected}
          onSelect={setSelected}
          numberOfMonths={isDesktop ? 2 : 1}
          showOutsideDays
          captionLayout="dropdown-buttons"
          fromYear={2018}
          toYear={new Date().getFullYear()}
          modifiersClassNames={{
            selected: "selected",
          }}
        />
        {footer}
      </div>
    </div>
  );
}

export default RangeDatePicker;
