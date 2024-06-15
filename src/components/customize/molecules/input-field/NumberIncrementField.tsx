import { IProductListResponse } from "@/types/responses/ProductResponse";
import { CircleMinus, CirclePlus } from "lucide-react";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

type IProps = {
  name: string;
};

function NumberIncrementField({ name }: IProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <div className="flex gap-2 items-center">
            <button
              type="button"
              onClick={() =>
                field.value === 0 ? () => {} : field.onChange(field.value - 1)
              }
            >
              <CircleMinus />
            </button>
            <input
              {...field}
              type="number"
              className="w-16 text-center bg-white border border-slate-300 text-slate-900 text-sm rounded-lg px-3 py-2 lining-nums"
              min={0}
              value={field.value}
              onChange={(e) => field.onChange(Number(e.target.value))}
            />
            <button
              type="button"
              onClick={() => field.onChange(field.value + 1)}
            >
              <CirclePlus />
            </button>
          </div>
          <p className="text-sm text-red-500 mt-1">{error?.message}</p>
        </div>
      )}
    />
  );
}

export default NumberIncrementField;
