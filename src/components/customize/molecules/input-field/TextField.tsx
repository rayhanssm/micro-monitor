import React from "react";

type IProps = {
  label: string;
  name: string;
};

function TextField({ label, name }: IProps) {
  return (
    <div>
      <label className="w-fit text-slate-900 text-sm font-medium">
        {label}
      </label>
      <input
        type="text"
        name={name}
        className="w-full bg-white border border-slate-300 text-slate-900 text-sm rounded-lg px-3 py-2"
      />
    </div>
  );
}

export default TextField;
