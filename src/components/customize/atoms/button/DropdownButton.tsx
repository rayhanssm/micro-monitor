"use client";

import useClickOutsideElement from "@/hooks/useClickOutsideElement";
import { IOption } from "@/types/options";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

export type IProps = {
  options: IOption[];
};

function DropdownButton({ options }: IProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<IOption | null>(null);

  const optionMenuRef = useClickOutsideElement(setIsOpen);

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="py-2 px-3 border flex items-center gap-2.5 text-sm border-slate-400 rounded-md hover:bg-slate-50"
      >
        {selectedOption?.name ? selectedOption.name : options[0].name}
        <ChevronDown size={16} color="#94A3B8" />
      </button>

      {isOpen && (
        <div
          ref={optionMenuRef}
          className="absolute z-50 right-0 mt-2 mr-[116px] max-h-96 overflow-y-auto p-1 gap-2 rounded-md border-2 bg-white shadow-lg"
        >
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedOption(option);
                setIsOpen(false);
              }}
              className="hover:bg-slate-100 w-full rounded-md px-4 py-2 flex items-center text-center"
            >
              <p key={index} className="text-gray-700 block text-md">
                {option.name}
              </p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropdownButton;
``;
