import React from "react";

type IButton = {
  text: string;
  type: "filled" | "outlined";
  onClick?: () => void;
};

export default function Button({ text, type, onClick }: IButton) {
  return (
    <button
      className={
        type === "filled"
          ? "bg-teal-700 hover:bg-teal-700/70 text-sm text-white hover:text-gray-200 font-medium border py-2 px-4 rounded transition-all"
          : "bg-transparent hover:bg-teal-700 text-sm text-teal-700 hover:text-white font-medium border py-2 px-4 rounded transition-all"
      }
      onClick={onClick}
    >
      {text}
    </button>
  );
}
