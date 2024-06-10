import React from "react";

type IProps = {
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
};

function Checkbox({ label, description, checked, onChange }: IProps) {
  return (
    <div className="flex items-center gap-4 border rounded-lg p-4 w-full">
      <input
        className="accent-teal-700 w-4 h-4"
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <div>
        <p className="text-sm font-semibold">{label}</p>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
    </div>
  );
}

export default Checkbox;
