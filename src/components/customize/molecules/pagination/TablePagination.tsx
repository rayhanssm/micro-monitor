import React from "react";
import Button from "../../atoms/button/Button";

type IProps = {
  current: number;
  total: number;
};

function TablePagination({ current, total }: IProps) {
  return (
    <div className="flex justify-between">
      <p className="text-slate-500">
        Page {current} of {total}
      </p>
      <div className="flex gap-4">
        <Button text="Previous" btnStyle="outlined" disabled={current === 1} />
        <Button text="Next" btnStyle="outlined" disabled={current === total} />
      </div>
    </div>
  );
}

export default TablePagination;
