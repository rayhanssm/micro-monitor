export type IExpenseResponse = {
  expenseID: string;
  details: {
    description: string;
    value: number;
  }[];
  expenseTotal: number;
  expenseDate: Date | string;
};

export type IExpenseResponseList = {
  date: Date | string;
  expenses: IExpenseResponse[];
};

