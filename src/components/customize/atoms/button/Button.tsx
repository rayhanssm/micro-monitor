import React from "react";

type IProps = {
  text: string;
  type: "filled" | "outlined";
  additionClassname?: string;
  onClick?: () => void;
  disabled?: boolean;
};

export default function Button({
  text,
  type,
  additionClassname,
  onClick,
  disabled = false,
}: IProps | any) {
  return (
    <button
      className={`font-medium border py-2 px-4 rounded-lg transition-colors text-sm ${
        type === "filled"
          ? `bg-teal-700 hover:bg-teal-700/70 text-white hover:text-gray-200`
          : `bg-transparent ${
              disabled
                ? "text-slate-300 border-slate-300"
                : "text-teal-700 border-teal-700 hover:bg-slate-50"
            }`
      } ${additionClassname}`}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
