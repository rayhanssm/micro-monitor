import React from "react";
import NumberFormat from "react-number-format";

type IProps = {
  label: string;
  name: string;
  type?: "number" | "currency";
};

function NumberField({ label, name, type = "number" }: IProps) {
  return (
    <div>
      <label className="w-fit text-slate-900 text-sm font-medium">
        {label}
      </label>
      <NumberFormat
        name={name}
        thousandSeparator={true}
        prefix={type === "currency" ? "IDR " : undefined}
        className="w-full bg-white border border-slate-300 text-slate-900 text-sm rounded-lg px-3 py-2"
      />
    </div>
  );
}

export default NumberField;
