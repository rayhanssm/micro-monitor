import { IExpenseRequest } from "@/types/requests/ExpenseRequest";
import { ITransactionRequest } from "@/types/requests/TransactionRequest";
import { validateStringToInt } from "@/utils/transformIntValidation";
import { date, number, object, string } from "yup";

export const expenseField = (): IExpenseRequest => ({
  description: "",
  amount: 0,
  date: new Date(),
});

export const expenseSchema = object({
  description: string()
    .typeError("Please insert product")
    .required("Please insert product"),
  amount: number()
    .transform((_, value) => validateStringToInt(_, value))
    .typeError("Please insert amount")
    .required("Please insert amount"),
  date: date().typeError("Please insert price").required("Please insert price"),
});
