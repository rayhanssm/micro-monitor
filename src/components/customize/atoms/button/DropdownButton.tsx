import { ChevronDown } from "lucide-react";
import React from "react";

export type IProps = {
  options: string[];
};

function DropdownButton() {
  return (
    <div>
      <button className="py-2 px-3 border flex items-center gap-2.5 border-slate-400 rounded-md text-slate-400 hover:bg-slate-50 transition-all">
        Select... <ChevronDown size={16} color="#94A3B8" />
      </button>
    </div>
  );
}

export default DropdownButton;
