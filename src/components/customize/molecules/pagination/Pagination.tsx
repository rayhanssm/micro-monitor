import React from "react";
import Button from "../../atoms/button/Button";

type IProps = {
  current: number;
  total: number;
  setCurrent: (value: number) => void;
};

function Pagination({ current, total, setCurrent }: IProps) {
  const pages = [];
  for (let i = 1; i <= total; i++) {
    pages.push(i);
  }

  // TODO: adjust pagination later
  return (
    <div className="flex gap-2 items-center">
      <button
        disabled={current === 1}
        className={`text-sm px-4 py-1.5 transition-all ${
          current === 1
            ? "text-slate-300"
            : "text-teal-700 border-teal-700 hover:text-teal-700/30"
        }`}
        onClick={() => setCurrent(current - 1)}
      >
        Previous
      </button>
      <div className="flex gap-2">
        {pages.map((page, index) => (
          <Button
            key={index}
            text={page}
            btnStyle={current === index + 1 ? "filled" : "outlined"}
            onClick={() => setCurrent(page)}
          />
        ))}
      </div>
      <button
        disabled={current === total}
        className={`text-sm px-4 py-1.5 transition-all ${
          current === total
            ? "text-slate-300"
            : "text-teal-700 border-teal-700 hover:text-teal-700/30"
        }`}
        onClick={() => setCurrent(current + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
