import { ITargetRequest } from "@/types/requests/TargetRequest";
import { date, number, object } from "yup";

export const targetField = (): ITargetRequest => ({
  targetDate: new Date(),
  targetValue: 0,
});

export const targetSchema = object({
  targetDate: date().typeError("Masukkan bulan").required("Masukkan bulan"),
  targetValue: number()
    .typeError("Masukkan jumlah target")
    .required("Masukkan jumlah target"),
});
