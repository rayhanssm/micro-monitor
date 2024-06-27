import React from "react";

type IProps = {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
};

function Checkbox({ label, description, checked, onChange, disabled }: IProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <div
      className={`${
        disabled ? "bg-slate-200" : ""
      } flex items-center gap-4 border rounded-lg p-4 w-full`}
    >
      <input
        className="accent-teal-700 w-4 h-4"
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
      />
      <div>
        <p className="text-sm font-semibold lining-nums">{label}</p>
        <p className="text-xs text-slate-500 lining-nums">{description}</p>
      </div>
    </div>
  );
}

export default Checkbox;
