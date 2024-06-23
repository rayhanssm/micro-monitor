import { apiPath } from "@/routes/apiPath";
import { IPaginationResponse } from "@/types/BaseResponse";
import {
  ILoginRequest,
  IProfileRequest,
  IRegisterRequest,
  IStaffEditRequest,
  IStaffRequest,
} from "@/types/requests/AuthRequest";
import {
  ILoginResponse,
  IProfileResponse,
  IStaffListResponse,
} from "@/types/responses/AuthResponse";
import CustomAxios from "@/utils/axios";
import axios, { AxiosResponse } from "axios";

export class AuthRepository {
  static PostRegister = (payload: IRegisterRequest) =>
    axios.post(
      process.env.NEXT_PUBLIC_API_URL + apiPath.auth.register,
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

  static GetStaffList = (
    params: any
  ): Promise<AxiosResponse<IPaginationResponse<IStaffListResponse>>> =>
    CustomAxios.Get(apiPath.staff.list, params);

  static AddStaff = (payload: IStaffRequest) =>
    CustomAxios.Post(apiPath.staff.add, payload);

  static EditStaff = (payload: IStaffEditRequest, id: string) =>
    CustomAxios.Put(apiPath.staff.edit, payload, {}, id);

  static DeleteStaff = (id: string) =>
    CustomAxios.Delete(apiPath.staff.delete, id);
}
