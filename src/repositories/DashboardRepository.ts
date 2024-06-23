import { apiPath } from "@/routes/apiPath";
import {
  IDashboardSummaryDailyResponse,
  IDashboardSummaryMonthlyResponse,
  IDashboardSummaryOverallResponse,
} from "@/types/responses/DashboardResponse";
import CustomAxios from "@/utils/axios";
import { AxiosResponse } from "axios";

export class DashboardRepository {
  static GetDashboardDaily = (
    params: any
  ): Promise<AxiosResponse<IDashboardSummaryDailyResponse>> =>
    CustomAxios.Get(apiPath.dashboard.daily, params);

  static GetDashboardMonthly = (
    params: any
  ): Promise<AxiosResponse<IDashboardSummaryMonthlyResponse>> =>
    CustomAxios.Get(apiPath.dashboard.monthly, params);

  static GetDashboardOverall = (
    params: any
  ): Promise<AxiosResponse<IDashboardSummaryOverallResponse>> =>
    CustomAxios.Get(apiPath.dashboard.overall, params);
}
