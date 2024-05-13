import { IProductRequest } from "@/types/requests/ProductRequest";
import { validateStringToInt } from "@/utils/transformIntValidation";
import { number, object, string } from "yup";

export const productField = (): IProductRequest => ({
  name: "",
  price: 0,
});

export const productSchema = object({
  name: string()
    .typeError("Please insert product name")
    .required("Please insert product name"),
  price: number()
    .transform((_, value) => validateStringToInt(_, value))
    .typeError("Please insert price")
    .required("Please insert price"),
});
