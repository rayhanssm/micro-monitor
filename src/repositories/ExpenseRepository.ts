import { apiPath } from "@/routes/apiPath";
import { IListResponse } from "@/types/BaseResponse";
import { IExpenseRequest } from "@/types/requests/ExpenseRequest";
import { IExpenseListResponse, IExpenseResponse } from "@/types/responses/ExpenseResponse";
import CustomAxios from "@/utils/axios";
import { AxiosResponse } from "axios";

export class ExpenseRepository {
  static GetExpenseList = (
    params: any
  ): Promise<AxiosResponse<IListResponse<IExpenseListResponse>>> =>
    CustomAxios.Get(apiPath.expense.list, params);

  static AddExpense = (payload: IExpenseRequest) =>
    CustomAxios.Post(apiPath.expense.add, payload);

  static EditExpense = (payload: IExpenseRequest, id: string) =>
    CustomAxios.Put(apiPath.expense.edit, payload, {}, id);

  static GetExpenseDetail = (
    id: string
  ): Promise<AxiosResponse<IExpenseResponse>> =>
    CustomAxios.Get(apiPath.expense.detail, {}, id);

  static DeleteExpense = (id: string) =>
    CustomAxios.Delete(apiPath.expense.delete, id);
}
