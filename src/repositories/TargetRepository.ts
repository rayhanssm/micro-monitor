import { apiPath } from "@/routes/apiPath";
import { IListResponse } from "@/types/BaseResponse";
import { ITargetRequest } from "@/types/requests/TargetRequest";
import { ITargetListResponse } from "@/types/responses/TargetResponse";
import CustomAxios from "@/utils/axios";
import { AxiosResponse } from "axios";

export class TargetRepository {
  static GetTargetList = (
    params: any
  ): Promise<AxiosResponse<IListResponse<ITargetListResponse>>> =>
    CustomAxios.Get(apiPath.target.list, params);

  static AddTarget = (payload: ITargetRequest) =>
    CustomAxios.Post(apiPath.target.add, payload);

  static EditTarget = (payload: ITargetRequest, id: string) =>
    CustomAxios.Put(apiPath.target.edit, payload, {}, id);

  static DeleteTarget = (id: string) =>
    CustomAxios.Delete(apiPath.target.delete, id);
}
