"use client";

import React, { useState } from "react";

type IProps = {
  selected: number;
  setSelected: (selected: number) => void;
};

function DashboardButtonGroup({ selected, setSelected }: IProps) {
  const handleClick = (selected: number) => {
    setSelected(selected);
  };

  return (
    <div className="flex justify-center w-full lg:w-fit gap-2 bg-[#D9D9D9] p-2 rounded-lg mb-8 overflow-hidden">
      <button
        className={`py-1 px-4 text-sm font-semibold leading-6 rounded-lg transition-all ${
          selected === 1
            ? "bg-white text-[#1C1C1C] shadow-md"
            : "text-slate-500"
        }`}
        onClick={() => handleClick(1)}
      >
        Harian
      </button>
      <button
        className={`py-1 px-4 text-sm font-semibold leading-6 rounded-lg transition-all ${
          selected === 2
            ? "bg-white text-[#1C1C1C] shadow-md"
            : "text-slate-500"
        }`}
        onClick={() => handleClick(2)}
      >
        Bulanan
      </button>
      <button
        className={`py-1 px-4 text-sm font-semibold leading-6 rounded-lg transition-all ${
          selected === 3
            ? "bg-white text-[#1C1C1C] shadow-md"
            : "text-slate-500"
        }`}
        onClick={() => handleClick(3)}
      >
        Tahunan
      </button>
      <button
        className={`py-1 px-4 text-sm font-semibold leading-6 rounded-lg transition-all ${
          selected === 4
            ? "bg-white text-[#1C1C1C] shadow-md"
            : "text-slate-500"
        }`}
        onClick={() => handleClick(4)}
      >
        Periode
      </button>
    </div>
  );
}

export default DashboardButtonGroup;
