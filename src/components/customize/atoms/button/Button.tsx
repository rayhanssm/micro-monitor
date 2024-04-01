import React from "react";

type IProps = {
  text: string;
  btnStyle: "filled" | "outlined";
  additionClassname?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "reset" | "submit";
};

export default function Button({
  text,
  btnStyle,
  additionClassname,
  onClick,
  disabled = false,
  type = "button",
}: IProps | any) {
  return (
    <button
      className={`font-medium border py-2 px-4 rounded-lg transition-colors text-sm ${
        btnStyle === "filled"
          ? `bg-teal-700 hover:bg-teal-700/70 text-white hover:text-gray-200`
          : `bg-transparent ${
              disabled
                ? "text-slate-300 border-slate-300"
                : "text-teal-700 border-teal-700 hover:bg-slate-50"
            }`
      } ${additionClassname}`}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
}
