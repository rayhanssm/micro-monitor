export type ITransactionProductRequest = {
  productID: string;
  quantity: number;
  value: number;
};

export type ITransactionRequest = {
  products: ITransactionProductRequest[];
  transactionTotal: number;
  transactionDate: Date;
};
