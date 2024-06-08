import { IProductRequest } from "@/types/requests/ProductRequest";
import { validateStringToInt } from "@/utils/transformIntValidation";
import { number, object, string } from "yup";

export const productField = (): IProductRequest => ({
  name: "",
  price: 0,
  stock: 0,
});

export const productSchema = object({
  name: string()
    .typeError("Masukkan nama produk")
    .required("Masukkan nama produk"),
  price: number()
    // .transform((_, value) => validateStringToInt(_, value))
    .typeError("Masukkan harga produk")
    .required("Masukkan harga produk"),
  stock: number()
    // .transform((_, value) => validateStringToInt(_, value))
    .typeError("Masukkan stok produk")
    .required("Masukkan stok produk"),
});
