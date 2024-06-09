import { IOption } from "@/types/options";
import { ITransactionListResponse } from "@/types/responses/TransactionResponse";

export const transactionTableDummies = [
  {
    id: "1",
    name: "Product 1",
    quantity: 2,
    amount: 200000,
    date: new Date("2024-05-19T14:13:14.869Z"),
  },
  {
    id: "2",
    name: "Product 2",
    quantity: 2,
    amount: 200000,
    date: new Date("2024-05-15T14:13:14.869Z"),
  },
  {
    id: "3",
    name: "Product 3",
    quantity: 2,
    amount: 200000,
    date: new Date("2024-05-15T14:13:14.869Z"),
  },
  {
    id: "4",
    name: "Product 4",
    quantity: 2,
    amount: 200000,
    date: new Date("2024-05-15T14:13:14.869Z"),
  },
  {
    id: "5",
    name: "Product 5",
    quantity: 2,
    amount: 200000,
    date: new Date("2024-05-15T14:13:14.869Z"),
  },
  {
    id: "6",
    name: "Product 6",
    quantity: 2,
    amount: 200000,
    date: new Date("2024-05-15T14:13:14.869Z"),
  },
  {
    id: "7",
    name: "Product 7",
    quantity: 2,
    amount: 200000,
    date: new Date("2024-05-15T14:13:14.869Z"),
  },
  {
    id: "8",
    name: "Product 8",
    quantity: 2,
    amount: 200000,
    date: new Date("2024-05-15T14:13:14.869Z"),
  },
  {
    id: "9",
    name: "Product 9",
    quantity: 2,
    amount: 200000,
    date: new Date("2024-05-15T14:13:14.869Z"),
  },
  {
    id: "10",
    name: "Product 10",
    quantity: 2,
    amount: 200000,
    date: new Date("2024-05-15T14:13:14.869Z"),
  },
];

export const transactionList: ITransactionListResponse[] = [
  {
    date: new Date(),
    transactions: [
      {
        id: "TRX003",
        user: "staff_1",
        products: [
          {
            product: { name: "Product 1", value: "1" },
            quantity: 2,
            amount: 10000,
          },
          {
            product: { name: "Product 3", value: "3" },
            quantity: 1,
            amount: 10000,
          },
        ],
        createdAt: new Date(),
        total: 30000,
      },
      {
        id: "TRX002",
        user: "staff_2",
        products: [
          {
            product: { name: "Product 2", value: "2" },
            quantity: 1,
            amount: 40000,
          },
        ],
        total: 40000,
        createdAt: new Date(),
      },
    ],
  },
];

export const transactionOptions: IOption[] = [
  {
    value: "1",
    name: "Product 1",
  },
  {
    value: "2",
    name: "Product 2",
  },
  {
    value: "3",
    name: "Product 3",
  },
  {
    value: "4",
    name: "Product 4",
  },
  {
    value: "5",
    name: "Product 5",
  },
  {
    value: "6",
    name: "Product 6",
  },
  {
    value: "7",
    name: "Product 7",
  },
  {
    value: "8",
    name: "Product 8",
  },
  {
    value: "9",
    name: "Product 9",
  },
  {
    value: "10",
    name: "Product 10",
  },
];
