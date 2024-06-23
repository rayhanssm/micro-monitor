"use client";

import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { id } from "date-fns/locale";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const css = `
  .react-datepicker-wrapper,
  .react-datepicker__input-container,
  .react-datepicker__input-container input {
    width: 100%;
  }
`;

type IProps = {
  label: string;
  name: string;
  disabled?: boolean;
};

function MonthField({ label, name, disabled }: IProps) {
  const { control, setValue, getValues } = useFormContext();
  const initialDate = getValues(name);
  const [selected, setSelected] = useState();

  const handleChangeDateValue = (dateChange: any) => {
    setValue(name, dateChange, {
      shouldDirty: true,
    });
    setSelected(dateChange);
  };

  useEffect(() => {
    if (initialDate) {
      setSelected(initialDate);
    }
  }, [initialDate]);

  return (
    <div className="w-full">
      <style>{css}</style>
      <label className="text-slate-900 text-sm font-medium">{label}</label>

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div>
            <DatePicker
              {...field}
              selected={selected}
              onChange={handleChangeDateValue}
              showMonthYearPicker
              dateFormat="MMMM"
              locale={id}
              disabled={disabled}
              className={`${
                disabled ? "bg-slate-200" : "bg-white"
              } border border-slate-300 text-slate-900 text-sm rounded-lg px-3 py-2 lining-nums`}
            />
            <p className="text-sm text-red-500 mt-1">{error?.message}</p>
          </div>
        )}
      />
    </div>
  );
}

export default MonthField;
