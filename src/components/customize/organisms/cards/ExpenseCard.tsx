import React from "react";
import { IExpenseListResponse } from "@/types/responses/ExpenseResponse";
import ExpenseAccordion from "../../atoms/ExpenseAccordion";

type IProps = {
  data: IExpenseListResponse;
  isReload: any;
  setIsReload: any;
};

function ExpenseCard({ data, isReload, setIsReload }: IProps) {
  return (
    <div className="flex flex-col gap-6 p-4 border rounded-xl shadow-md">
      {data.expenses.map((e) => (
        <ExpenseAccordion
          key={e.expenseID}
          detailData={e}
          isReload={isReload}
          setIsReload={setIsReload}
        />
      ))}
    </div>
  );
}

export default ExpenseCard;
