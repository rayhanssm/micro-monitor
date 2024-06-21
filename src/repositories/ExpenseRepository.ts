import { apiPath } from "@/routes/apiPath";
import {
  IExpenseDetailRequest,
  IExpenseRequest,
} from "@/types/requests/ExpenseRequest";
import { ITransactionRequest } from "@/types/requests/TransactionRequest";
import { IExpenseResponseList } from "@/types/responses/ExpenseResponse";
import { ITransactionDetailResponse } from "@/types/responses/TransactionResponse";
import CustomAxios from "@/utils/axios";
import { AxiosResponse } from "axios";

export class ExpenseRepository {
  static GetExpenseList = (
    params: any
  ): Promise<AxiosResponse<IExpenseResponseList>> =>
    CustomAxios.Get(apiPath.product.list, params);

  static AddExpense = (payload: IExpenseRequest) =>
    CustomAxios.Post(apiPath.expense.add, payload);

  static EditExpense = (payload: IExpenseRequest, id: string) =>
    CustomAxios.Put(apiPath.expense.edit, payload, {}, id);

  // static GetExpenseDetail = (
  //   id: string
  // ): Promise<AxiosResponse<IExpenseDetailRequest>> =>
  //   CustomAxios.Get(apiPath.expense.detail, {}, id);

  static DeleteExpense = (id: string) =>
    CustomAxios.Delete(apiPath.expense.delete, id);
}
