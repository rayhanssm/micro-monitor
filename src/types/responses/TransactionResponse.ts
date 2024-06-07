import { IOption } from "../options";

export type ITransactionDetailResponse = {
  id: string;
  product: IOption;
  quantity: number;
  amount: number;
  date: number;
};
