export type IExpenseResponse = {
  expenseID: string;
  details: {
    description: string;
    value: number;
  }[];
  expenseTotal: number;
  expenseDate: Date | string;
  expenseFile: File | string;
  expenseCategory: string;
};

export type IExpenseListResponse = {
  date: Date | string;
  expenses: IExpenseResponse[];
};
