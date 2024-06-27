import React from "react";
import { Controller, useFormContext } from "react-hook-form";

type IProps = {
  label: string;
  description: string;
  name: string;
  recommendation?: any;
};

function CheckboxField({ label, description, name, recommendation }: IProps) {
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
          <div className="flex flex-col gap-2">
            <div>
              <p className="text-sm font-semibold">{label}</p>
              <p className="text-xs text-slate-500">{description}</p>
            </div>
            {recommendation && recommendation}
          </div>
        </div>
      )}
    />
  );
}

export default CheckboxField;
