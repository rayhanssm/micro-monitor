import { IOption } from "../options";
import { IProductListResponse } from "./ProductResponse";

export type ITransactionsResponse = {
  transactionID: string;
  products: {
    productName: string;
    quantity: number;
    value: number;
  }[];
  transactionTotal: number;
  userName: string;
  transactionDate: Date | string;
};

export type ITransactionListResponse = {
  date: Date | string;
  transactions: ITransactionsResponse[];
};

export type ITransactionProductResponse = {
  productID: string;
  productName: string;
  productPrice: number;
  productStock: number;
};

export type ITransactionDetailResponse = {
  products: ITransactionProductResponse[];
  transactionTotal: number;
  transactionDate: Date;
};
