import { apiPath } from "@/routes/apiPath";
import { ITransactionRequest } from "@/types/requests/TransactionRequest";
import { ITransactionDetailResponse } from "@/types/responses/TransactionResponse";
import CustomAxios from "@/utils/axios";
import { AxiosResponse } from "axios";

export class TransactionRepository {
  static AddTransaction = (payload: ITransactionRequest) =>
    CustomAxios.Post(apiPath.transaction.add, payload);

  static EditTransaction = (payload: ITransactionRequest, id: string) =>
    CustomAxios.Put(apiPath.transaction.edit, payload, {}, id);

  static GetTransactionDetail = (
    id: string
  ): Promise<AxiosResponse<ITransactionDetailResponse>> =>
    CustomAxios.Get(apiPath.transaction.detail, {}, id);
}
