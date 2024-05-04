import { ILoginRequest, IRegisterRequest } from "@/types/requests/AuthRequest";
import { object, string } from "yup";

export const registerField = (): IRegisterRequest => ({
  userName: "",
  storeName: "",
  password: "",
  confirmPassword: "",
});

export const registerSchema = object({
  userName: string()
    .typeError("Please insert user name")
    .required("Please insert user name"),
  storeName: string()
    .typeError("Please insert store name")
    .required("Please insert store name"),
  password: string()
    .typeError("Please insert password")
    .required("Please insert password"),
  confirmPassword: string()
    .typeError("Please insert confirm password")
    .required("Please insert confirm password"),
});

export const loginField = (): ILoginRequest => ({
  userName: "",
  password: "",
});

export const loginSchema = object({
  userName: string()
    .typeError("Please insert user name")
    .required("Please insert user name"),
  password: string()
    .typeError("Please insert password")
    .required("Please insert password"),
});
