import { IOption } from "../options";

export type ITransactionsResponse = {
  id: string;
  products: { product: IOption; quantity: number; amount: number }[];
  total: number;
  user: string;
  createdAt: Date | string;
};

export type ITransactionListResponse = {
  date: Date | string;
  transactions: ITransactionsResponse[];
};

export type ITransactionDetailResponse = {
  id: string;
  product: IOption;
  quantity: number;
  amount: number;
  date: number;
};
