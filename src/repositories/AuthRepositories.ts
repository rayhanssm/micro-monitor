import { apiPath } from "@/routes/apiPath";
import { ISingleResponse } from "@/types/BaseResponse";
import { ILoginRequest } from "@/types/requests/AuthRequest";
import { ILoginResponse } from "@/types/responses/AuthResponse";
import CustomAxios from "@/utils/axios";
import { AxiosResponse } from "axios";

export class AuthRepository {
  static PostLogin = (
    payload: ILoginRequest
  ): Promise<AxiosResponse<ISingleResponse<ILoginResponse>>> =>
    CustomAxios.Post(apiPath.auth.login, payload);
}
