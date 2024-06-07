import {
  ILoginRequest,
  IProfileRequest,
  IRegisterRequest,
} from "@/types/requests/AuthRequest";
import { boolean, object, ref, string } from "yup";

export const registerField = (): IRegisterRequest => ({
  userName: "",
  storeName: "",
  password: "",
  confirmPassword: "",
  flagProduct: false,
  flagExpense: false,
  flagTarget: false,
});

export const registerSchema = object({
  userName: string()
    .typeError("Masukkan username")
    .required("Masukkan username")
    .matches(/^\S+$/, "Username tidak boleh mangandung spasi"),
  storeName: string()
    .typeError("Masukkan nama UMKM")
    .required("Masukkan nama UMKM"),
  password: string()
    .typeError("Masukkan kata sandi")
    .required("Masukkan kata sandi")
    .min(8, "Kata sandi setidaknya harus memiliki 8 karakter")
    .matches(/^(?=.*[0-9])/, "Kata sandi harus mengandung satu angka"),
  confirmPassword: string()
    .typeError("Masukkan konfirmasi kata sandi")
    .required("Masukkan konfirmasi kata sandi")
    .oneOf(
      [ref("password")],
      "Konfirmasi kata sandi tidak sesuai dengan kata sandi"
    ),
  flagProduct: boolean().typeError("").required(),
  flagExpense: boolean().typeError("").required(),
  flagTarget: boolean().typeError("").required(),
});

export const loginField = (): ILoginRequest => ({
  userName: "",
  password: "",
});

export const loginSchema = object({
  userName: string()
    .typeError("Masukkan username")
    .required("Masukkan username")
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
