export type ITransactionsResponse = {
  transactionID: string;
  products: {
    productID: string;
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
  quantity: number;
  value: number;
};

export type ITransactionDetailResponse = {
  transactionID: string
  userName: string
  products: ITransactionProductResponse[];
  transactionTotal: number;
  transactionDate: Date | string;
};
