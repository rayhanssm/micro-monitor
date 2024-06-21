import { IExpenseResponse, IExpenseResponseList } from "@/types/responses/ExpenseResponse";

export const expenseList: IExpenseResponseList[] = [
  {
    date: "2024-06-11T07:00:00+07:00",
    expenses: [
      {
        expenseID: "CPQKMTTLQFU3RE7TKBAG",
        expenseDate: "2024-06-11T17:00:00+07:00",
        expenseTotal: 60000,
        details: [
          {
            description: "test update 1",
            value: 10000,
          },
          {
            description: "test update 2",
            value: 50000,
          },
        ],
      },
    ],
  },
];

export const expenseDetail: IExpenseResponse = {
  expenseID: "CPQKMTTLQFU3RE7TKBAG",
  expenseDate: "2024-06-11T17:00:00+07:00",
  expenseTotal: 60000,
  details: [
    {
      description: "test update 1",
      value: 10000,
    },
    {
      description: "test update 2",
      value: 50000,
    },
  ],
};