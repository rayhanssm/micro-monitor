import React from "react";

type IProps = {
  text: string | any;
  type: "filled" | "outlined";
  icon: any;
  onClick?: () => void;
};

function IconButton({ text, type, icon, onClick }: IProps) {
  return (
    <div className="w-full lg:w-auto">
      <button
        className={`flex w-full justify-center items-center gap-2 font-medium border py-2 px-4 rounded-lg transition-colors lining-nums text-sm ${
          type === "filled"
            ? `bg-teal-700 hover:bg-teal-700/70 text-white hover:text-gray-200`
            : `bg-transparent hover:bg-slate-50 text-teal-700`
        }`}
        onClick={onClick}
      >
        {icon}
        {text}
      </button>
    </div>
  );
}

export default IconButton;
