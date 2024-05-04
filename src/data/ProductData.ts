import { IProductRequest } from "@/types/requests/ProductRequest";
import { number, object, string } from "yup";

export const productField = (): IProductRequest => ({
  name: "",
  price: null,
});

export const productSchema = object({
  name: string()
    .typeError("Please insert product name")
    .required("Please insert product name"),
  price: number()
    .typeError("Please insert price")
    .required("Please insert price")
    .nullable(),
});
