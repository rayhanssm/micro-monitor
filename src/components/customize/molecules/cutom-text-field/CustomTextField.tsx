import React from "react";

type IProps = {
  label: string;
  type: string;
  name: string;
};

function CustomTextField({ label, type = "text", name }: IProps) {
  return (
    <div>
      <label className="w-fit text-slate-900 text-sm font-medium">
        {label}
      </label>
      <input
        type={type}
        name={name}
        className="w-full bg-white border border-slate-300 text-slate-900 text-sm rounded-lg px-3 py-2 transition-all"
        required
      />
    </div>
  );
}

export default CustomTextField;
