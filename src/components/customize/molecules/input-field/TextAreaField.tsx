import React from "react";

type IProps = {
  label: string;
  name: string;
};

function TextAreaField({ label, name }: IProps) {
  return (
    <div>
      <label className="w-fit text-slate-900 text-sm font-medium">
        {label}
      </label>
      <textarea
        name={name}
        className="w-full bg-white border border-slate-300 text-slate-900 text-sm rounded-lg px-3 py-2"
      />
    </div>
  );
}

export default TextAreaField;
