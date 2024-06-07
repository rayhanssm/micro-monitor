import { IExpenseRequest } from "@/types/requests/ExpenseRequest";
import { ITargetRequest } from "@/types/requests/TargetRequest";
import { ITransactionRequest } from "@/types/requests/TransactionRequest";
import { validateStringToInt } from "@/utils/transformIntValidation";
import { date, number, object, string } from "yup";

export const targetField = (): ITargetRequest => ({
  amount: 0,
  date: new Date(),
});

export const targetSchema = object({
  amount: number()
    .transform((_, value) => validateStringToInt(_, value))
    .typeError("Please insert amount")
    .required("Please insert amount"),
  date: date().typeError("Please insert price").required("Please insert price"),
});
