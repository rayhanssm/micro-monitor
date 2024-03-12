import React from "react";

type IButton = {
  text: string;
  type: "filled" | "outlined";
};

export default function Button({ text, type }: IButton) {
  return (
    <button
      className={
        type === "filled"
          ? "bg-teal-700 hover:bg-teal-950 text-sm text-white hover:text-gray-200 font-medium border py-2 px-4 rounded transition-all"
          : "bg-transparent hover:bg-teal-700 text-sm text-teal-700 hover:text-white font-medium border py-2 px-4 rounded transition-all"
      }
    >
      {text}
    </button>
  );
}
