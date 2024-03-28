import React from "react";

type IButton = {
  text: string;
  type: "filled" | "outlined";
  additionClassname?: string;
  onClick?: () => void;
};

export default function Button({
  text,
  type,
  additionClassname,
  onClick,
}: IButton) {
  return (
    <button
      className={`font-medium border py-2 px-4 rounded-lg transition-colors text-sm ${
        type === "filled"
          ? `bg-teal-700 hover:bg-teal-700/70 text-white hover:text-gray-200`
          : `bg-transparent hover:bg-slate-50 text-teal-700`
      } ${additionClassname}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
