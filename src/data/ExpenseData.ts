import { IExpenseRequest } from "@/types/requests/ExpenseRequest";
import { array, date, number, object, string } from "yup";

export const expenseField = (): IExpenseRequest => ({
  details: [
    {
      description: "",
      value: null,
    },
  ],
  expenseDate: new Date(),
  expenseTotal: 0,
});

export const expenseSchema = object({
  details: array()
    .of(
      object({
        description: string()
          .typeError("Masukkan deskripsi")
          .required("Masukkan deskripsi"),
        value: number()
          .typeError("Masukkan nominal pengeluaran")
          .required("Masukkan nominal pengeluaran")
          .min(0, "Nominal pengeluaran setidaknya 1")
          .nullable(),
      })
    )
    .required("Silakan menambahkan setidaknya 1 produk"),
  expenseTotal: number()
    .typeError("Total tidak ada")
    .required("Total tidak ada")
    .min(0, "Harga total setidaknya 1"),
  expenseDate: date()
    .typeError("Masukkan tanggal dan jam")
    .required("Masukkan tanggal dan jam"),
});
