"use client";

import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type IProps = {
  label: string;
  name: string;
};

function DateField({ label, name }: IProps) {
  const { control, setValue, getValues } = useFormContext();

  const [selected, setSelected] = useState();

  const handleChangeDateValue = (dateChange: any) => {
    setValue("dateOfBirth", dateChange, {
      shouldDirty: true,
    });
    setSelected(dateChange);
  };

  return (
    <div>
      <label className="w-fit text-slate-900 text-sm font-medium">
        {label}
      </label>

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div className="border">
            <DatePicker selected={selected} onChange={handleChangeDateValue} />
            <p className="text-sm text-red-500 mt-1">{error?.message}</p>
          </div>
        )}
      />
    </div>
  );
}

export default DateField;
