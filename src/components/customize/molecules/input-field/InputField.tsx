import React from "react";

type IProps = {
  label: string;
  type: string;
  name: string;
};

function InputField({ label, type = "text", name }: IProps) {
  return (
    <div>
      <label className="text-slate-900 text-sm font-medium">{label}</label>
      <input
        type={type}
        name={name}
        className="bg-white border border-slate-300 text-slate-900 focus:border-teal-600 text-sm rounded-lg block w-full px-3 py-2 transition-all"
        required
      />
    </div>
  );
}

export default InputField;
