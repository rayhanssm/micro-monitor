import { apiPath } from "@/routes/apiPath";
import {
  IDashboardSummaryDailyResponse,
  IDashboardSummaryMonthlyResponse,
  IDashboardSummaryPeriodicallyResponse,
  IDashboardSummaryYearlyResponse,
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

  static GetDashboardYearly = (
    params: any
  ): Promise<AxiosResponse<IDashboardSummaryYearlyResponse>> =>
    CustomAxios.Get(apiPath.dashboard.yearly, params);

  static GetDashboardPeriodically = (
    params: any
  ): Promise<AxiosResponse<IDashboardSummaryPeriodicallyResponse>> =>
    CustomAxios.Get(apiPath.dashboard.period, params);
}
