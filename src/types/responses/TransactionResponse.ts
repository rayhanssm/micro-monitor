import { IOption } from "../options";
import { IProductListResponse } from "./ProductResponse";

export type ITransactionsResponse = {
  id: string;
  products: { product: IProductListResponse; quantity: number; amount: number }[];
  total: number;
  user: string;
  transactionDate: Date | string;
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
