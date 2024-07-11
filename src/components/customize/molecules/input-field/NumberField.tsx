import React from "react";
import { Controller, useFormContext } from "react-hook-form";

type IProps = {
  label: string;
  name: string;
  type?: "number" | "currency";
};

function NumberField({ label, name, type = "number" }: IProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <label className="w-fit text-slate-900 text-sm font-medium">
            {label}
          </label>
          {type === "number" ? (
            <input
              {...field}
              type="number"
              className="w-full bg-white border border-slate-300 text-slate-900 text-sm rounded-lg px-3 py-2 lining-nums"
            />
          ) : (
            <div className="flex bg-white text-slate-900">
              <p className="text-sm font-medium inline-block border border-slate-300 rounded-l-lg px-3 py-2">
                IDR
              </p>
              <input
                {...field}
                type="number"
                className="w-full lining-nums leading-3 border border-slate-300 text-sm rounded-r-lg px-3 py-2"
              />
            </div>
          )}
          <p className="text-sm text-red-500 mt-1">{error?.message}</p>
        </div>
      )}
    />
  );
}

export default NumberField;
