import { apiPath } from "@/routes/apiPath";
import { IPaginationResponse } from "@/types/BaseResponse";
import { IProductRequest } from "@/types/requests/ProductRequest";
import { IProductListResponse } from "@/types/responses/ProductResponse";
import CustomAxios from "@/utils/axios";
import { AxiosResponse } from "axios";

export class ProductRepository {
  static GetProductList = (
    params: any
  ): Promise<AxiosResponse<IPaginationResponse<IProductListResponse>>> =>
    CustomAxios.Get(apiPath.product.list, params);

  static AddProduct = (payload: IProductRequest) =>
    CustomAxios.Post(apiPath.product.add, payload);

  static EditProduct = (payload: IProductRequest, id: string) =>
    CustomAxios.Put(apiPath.product.edit, payload, {}, id);

  static DeleteProduct = (id: string) =>
    CustomAxios.Delete(apiPath.product.delete, id);
}
