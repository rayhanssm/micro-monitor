import React from "react";
import { Controller, useFormContext } from "react-hook-form";

type IProps = {
  label: string;
  description: string;
  name: string;
};

function CheckboxField({ label, description, name }: IProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="flex items-center gap-4 border rounded-lg p-4 w-full">
          <input
            className="accent-teal-700 w-4 h-4"
            type="checkbox"
            {...field}
          />
          <div>
            <p className="text-sm font-semibold">{label}</p>
            <p className="text-xs text-slate-500">{description}</p>
          </div>
        </div>
      )}
    />
  );
}

export default CheckboxField;
