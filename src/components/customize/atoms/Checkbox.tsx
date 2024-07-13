import React from "react";

type IProps = {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  recommendation?: any;
};

function Checkbox({
  label,
  description,
  checked,
  onChange,
  disabled,
  recommendation,
}: IProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <div
      className={`${
        disabled ? "bg-slate-100" : ""
      } flex items-center gap-4 border rounded-lg p-4 w-full`}
    >
      <input
        className="accent-teal-700 w-4 h-4"
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
      />
      <div className="flex flex-col gap-2">
        <div>
          <p className="text-sm font-semibold">{label}</p>
          <p className="text-xs text-slate-500">{description}</p>
        </div>
        {recommendation && recommendation}
      </div>
    </div>
  );
}

export default Checkbox;
