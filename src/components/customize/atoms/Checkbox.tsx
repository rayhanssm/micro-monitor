import React from "react";

type IProps = {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

function Checkbox({ label, description, checked, onChange }: IProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <div className="flex items-center gap-4 border rounded-lg p-4 w-full">
      <input
        className="accent-teal-700 w-4 h-4"
        type="checkbox"
        checked={checked}
        onChange={handleChange}
      />
      <div>
        <p className="text-sm font-semibold lining-nums">{label}</p>
        <p className="text-xs text-slate-500 lining-nums">{description}</p>
      </div>
    </div>
  );
}

export default Checkbox;
