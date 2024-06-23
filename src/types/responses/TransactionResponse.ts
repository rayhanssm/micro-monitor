export type ITransactionListResponse = {
  date: Date | string;
  transactions: ITransactionDetailResponse[];
};

export type ITransactionDetailResponse = {
  transactionID: string;
  userName: string;
  products: ITransactionProductResponse[];
  transactionTotal: number;
  transactionDate: Date | string;
};

export type ITransactionProductResponse = {
  productID: string;
  productName: string;
  quantity: number;
  value: number;
};
