import { apiPath } from "@/routes/apiPath";
import { IPaginationResponse } from "@/types/BaseResponse";
import { IProductListResponse } from "@/types/responses/ProductResponse";
import CustomAxios from "@/utils/axios";
import { AxiosResponse } from "axios";

export class ProductRepository {
  static GetProductList = (): Promise<
    AxiosResponse<IPaginationResponse<IProductListResponse>>
  > =>
    CustomAxios.Get(apiPath.product.list, {
      size: 6,
      page: 1,
    });
}
