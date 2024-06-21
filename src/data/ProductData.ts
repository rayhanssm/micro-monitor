import { IProductRequest } from "@/types/requests/ProductRequest";
import { validateStringToInt } from "@/utils/transformIntValidation";
import { number, object, string } from "yup";

export const productField = (): IProductRequest => ({
  productName: "",
  productPrice: 0,
  productStock: 0,
});

export const productSchema = object({
  productName: string()
    .typeError("Masukkan nama produk")
    .required("Masukkan nama produk"),
  productPrice: number()
    // .transform((_, value) => validateStringToInt(_, value))
    .typeError("Masukkan harga produk")
    .required("Masukkan harga produk"),
  productStock: number()
    // .transform((_, value) => validateStringToInt(_, value))
    .typeError("Masukkan stok produk")
    .required("Masukkan stok produk"),
});
