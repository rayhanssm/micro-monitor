export type ITransactionProductRequest = {
  productId: string;
  quantity: number;
  value: number;
};

export type ITransactionRequest = {
  products: ITransactionProductRequest[];
  total: number;
  transactionDate: Date;
};
