import { ITransactionRequest } from "@/types/requests/TransactionRequest";
import { validateStringToInt } from "@/utils/transformIntValidation";
import { date, number, object, string } from "yup";

export const transactionField = (): ITransactionRequest => ({
  productId: "",
  quantity: 0,
  amount: 0,
  date: new Date(),
});

export const transactionSchema = object({
  productId: string()
    .typeError("Please insert product")
    .required("Please insert product"),
  quantity: number()
    .transform((_, value) => validateStringToInt(_, value))
    .typeError("Please insert quantity")
    .required("Please insert quantity"),
  amount: number()
    .transform((_, value) => validateStringToInt(_, value))
    .typeError("Please insert amount")
    .required("Please insert amount"),
  date: date().typeError("Please insert price").required("Please insert price"),
});
