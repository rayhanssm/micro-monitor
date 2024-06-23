import { apiPath } from "@/routes/apiPath";
import { IListResponse, ISingleResponse } from "@/types/BaseResponse";
import { ITransactionRequest } from "@/types/requests/TransactionRequest";
import {
  ITransactionDetailResponse,
  ITransactionListResponse,
} from "@/types/responses/TransactionResponse";
import CustomAxios from "@/utils/axios";
import { AxiosResponse } from "axios";

export class TransactionRepository {
  static GetTransactionList = (
    params: any
  ): Promise<AxiosResponse<IListResponse<ITransactionListResponse>>> =>
    CustomAxios.Get(apiPath.transaction.list, params);

  static AddTransaction = (payload: ITransactionRequest) =>
    CustomAxios.Post(apiPath.transaction.add, payload);

  static EditTransaction = (payload: ITransactionRequest, id: string) =>
    CustomAxios.Put(apiPath.transaction.edit, payload, {}, id);

  static GetTransactionDetail = (
    id: string
  ): Promise<AxiosResponse<ITransactionDetailResponse>> =>
    CustomAxios.Get(apiPath.transaction.detail, {}, id);

  static DeleteTransaction = (id: string) =>
    CustomAxios.Delete(apiPath.transaction.delete, id);
}
