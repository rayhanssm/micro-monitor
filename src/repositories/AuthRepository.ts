import { apiPath } from "@/routes/apiPath";
import { ISingleResponse } from "@/types/BaseResponse";
import {
  ILoginRequest,
  IProfileRequest,
  IRegisterRequest,
} from "@/types/requests/AuthRequest";
import {
  ILoginResponse,
  IProfileResponse,
} from "@/types/responses/AuthResponse";
import CustomAxios from "@/utils/axios";
import axios, { AxiosResponse } from "axios";

export class AuthRepository {
  static PostRegister = (payload: IRegisterRequest) =>
    axios.post(
      process.env.NEXT_PUBLIC_BASE_URL + apiPath.auth.register,
      payload
    );

  static PostLogin = (
    payload: ILoginRequest
  ): Promise<AxiosResponse<ILoginResponse>> =>
    CustomAxios.Post(apiPath.auth.login, payload);

  static GetProfile = (): Promise<AxiosResponse<IProfileResponse>> =>
    CustomAxios.Get(apiPath.auth.profile);

  static EditProfile = (payload: IProfileRequest) =>
    CustomAxios.Put(apiPath.auth.edit, payload);
}
