import { ITransactionRequest } from "@/types/requests/TransactionRequest";
import { array, date, number, object, string } from "yup";

export const transactionField = (): ITransactionRequest => ({
  products: [
    {
      productId: "",
      quantity: 0,
      value: 0,
    },
  ],
  total: 0,
  transactionDate: new Date(),
});

export const transactionSchema = object({
  products: array()
    .of(
      object({
        productId: string()
          .typeError("Masukkan produk")
          .required("Masukkan produk"),
        quantity: number()
          .typeError("Masukkan kuantitas")
          .required("Masukkan kuantitas")
          .min(1, "Kuantitas setidaknya harus 1"),
        value: number()
          .typeError("Masukkan harga")
          .required("Masukkan harga")
          .min(0, "Harga setidaknya 1"),
      })
    )
    .required("Silakan menambahkan setidaknya 1 produk"),
  total: number()
    .typeError("Masukkan harga total")
    .required("Masukkan harga total")
    .min(0, "Harga total setidaknya 1"),
  transactionDate: date()
    .typeError("Masukkan tanggal dan jam")
    .required("Masukkan tanggal dan jam"),
});
