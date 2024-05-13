import {
  ILoginRequest,
  IProfileRequest,
  IRegisterRequest,
} from "@/types/requests/AuthRequest";
import { object, ref, string } from "yup";

export const registerField = (): IRegisterRequest => ({
  userName: "",
  storeName: "",
  password: "",
  confirmPassword: "",
});

export const registerSchema = object({
  userName: string()
    .typeError("Please insert user name")
    .required("Please insert user name")
    .matches(/^\S+$/, "Username cannot contain spaces"),
  storeName: string()
    .typeError("Please insert store name")
    .required("Please insert store name"),
  password: string()
    .typeError("Please insert password")
    .required("Please insert password")
    .min(8, "Password must be at least 8 characters")
    .matches(/^(?=.*[0-9])/, "Password must contain at least 1 number"),
  confirmPassword: string()
    .typeError("Please insert confirm password")
    .required("Please insert confirm password")
    .oneOf([ref("password")], "Confirmation password must match with password"),
});

export const loginField = (): ILoginRequest => ({
  userName: "",
  password: "",
});

export const loginSchema = object({
  userName: string()
    .typeError("Please insert user name")
    .required("Please insert user name")
    .matches(/^\S+$/, "Username cannot contain spaces"),
  password: string()
    .typeError("Please insert password")
    .required("Please insert password")
    .min(8, "Password must be at least 8 characters")
    .matches(/^(?=.*[0-9])/, "Password must contain at least 1 number"),
});

export const profileField = (): IProfileRequest => ({
  storeName: "",
  userName: "",
});

export const profileSchema = object({
  storeName: string()
    .typeError("Please insert store name")
    .required("Please insert store name"),
  userName: string()
    .typeError("Please insert user name")
    .required("Please insert user name")
    .matches(/^\S+$/, "Username cannot contain spaces"),
});
