export type IExpenseDetailRequest = {
  description: string;
  value: number | null;
};

export type IExpenseRequest = {
  expenseDate: Date;
  expenseTotal: number;
  details: IExpenseDetailRequest[];
};
