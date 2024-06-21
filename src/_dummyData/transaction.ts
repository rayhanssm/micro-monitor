import { IOption } from "@/types/options";
import {
  ITransactionDetailResponse,
  ITransactionListResponse,
} from "@/types/responses/TransactionResponse";

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
    date: "2024-06-13T07:00:00+07:00",
    transactions: [
      {
        transactionID: "CPQ078DLQFU4JV77LAD0",
        userName: "test",
        transactionDate: "2024-06-13T14:00:00+07:00",
        transactionTotal: 80000,
        products: [
          {
            productID: '1',
            productName: "product 1",
            quantity: 1,
            value: 50000,
          },
          {
            productID: '3',
            productName: "product 3",
            quantity: 1,
            value: 30000,
          },
        ],
      },
    ],
  },
  {
    date: "2024-06-12T07:00:00+07:00",
    transactions: [
      {
        transactionID: "CPQ07LTLQFU4JV77LADG",
        userName: "test",
        transactionDate: "2024-06-12T14:00:00+07:00",
        transactionTotal: 160000,
        products: [
          {
            productID: '1',
            productName: "product 1",
            quantity: 2,
            value: 100000,
          },
          {
            productID: '3',
            productName: "product 3",
            quantity: 2,
            value: 60000,
          },
        ],
      },
    ],
  },
  {
    date: "2024-06-11T07:00:00+07:00",
    transactions: [
      {
        transactionID: "CPQ0ASLLQFU3PD6JGKP0",
        userName: "kalvin",
        transactionDate: "2024-06-11T17:00:00+07:00",
        transactionTotal: 240000,
        products: [
          {
            productID: '1',
            productName: "product 1",
            quantity: 3,
            value: 150000,
          },
          {
            productID: '3',
            productName: "product 3",
            quantity: 3,
            value: 90000,
          },
        ],
      },
      {
        transactionID: "CPQ07N5LQFU4JV77LAE0",
        userName: "test",
        transactionDate: "2024-06-11T14:00:00+07:00",
        transactionTotal: 160000,
        products: [
          {
            productID: '1',
            productName: "product 1",
            quantity: 2,
            value: 100000,
          },
          {
            productID: '3',
            productName: "product 3",
            quantity: 2,
            value: 60000,
          },
        ],
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

export const transactionDetail: ITransactionDetailResponse = {
  transactionID: "CPQ07N5LQFU4JV77LAE0",
  userName: "test",
  transactionDate: "2024-06-11T14:00:00+07:00",
  transactionTotal: 160000,
  products: [
    {
      productID: "1",
      productName: "Product 1",
      quantity: 2, 
      value: 100000,
    },
    {
      productID: "3",
      productName: "Product 3",
      quantity: 2,
      value: 60000,
    },
  ],
};
