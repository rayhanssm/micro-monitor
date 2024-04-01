import { fNum } from "@/utils/formatNumber";
import React, { useState } from "react";
import NumberFormat from "react-number-format";

type IProps = {
  label: string;
  name: string;
};

function NumberField({ label, name }: IProps) {
  return (
    <div>
      <label className="w-fit text-slate-900 text-sm font-medium">
        {label}
      </label>
      <NumberFormat
        name={name}
        thousandSeparator={true}
        prefix={"IDR "}
        className="w-full bg-white border border-slate-300 text-slate-900 text-sm rounded-lg px-3 py-2"
      />
      {/* TODO: remove later
      
      <input
        type="number"
        name={name}
        className="w-full bg-white border border-slate-300 text-slate-900 text-sm rounded-lg px-3 py-2"
      /> */}
    </div>
  );
}

export default NumberField;
