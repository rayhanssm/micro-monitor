"use client";

import Button from "@/components/customize/atoms/button/Button";
import LoginForm from "@/components/customize/organisms/forms/LoginForm";
import AuthTemplate from "@/components/customize/templates/AuthTemplate";
import { loginField, loginSchema } from "@/data/AuthData";
import { AuthRepository } from "@/repositories/AuthRepository";
import { paths } from "@/routes/paths";
import { ILoginRequest } from "@/types/requests/AuthRequest";
import { showToast } from "@/utils/toast";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { Cookies } from "react-cookie";
import { FormProvider, useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";

function LoginView() {
  const push = useRouter().push;
  const cookies = new Cookies();

  const methods = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: loginField(),
    mode: "onChange",
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: ILoginRequest) => {
    try {
      const res = await AuthRepository.PostLogin(data);
      const loginRes = res.data;

      cookies.set("expiresAt", loginRes.expiresAt);
      cookies.set("token", loginRes.token);
      cookies.set("role", loginRes.role);
      cookies.set("flagExpense", loginRes.flagExpense);
      cookies.set("flagTarget", loginRes.flagTarget);
      cookies.set("flagProduct", loginRes.flagProduct);
      showToast("Berhasil masuk", "success");
      push(paths.dashboard);
    } catch (error: any) {
      showToast(error.message, "error");
    }
  };

  return (
    <AuthTemplate
      pageType="login"
      content={
        <div className="relative">
          <div className="hidden lg:flex absolute top-8 right-10 items-center gap-4">
            <p className="text-slate-500 text-base">Belum punya akun?</p>
            <Button
              text="Daftar"
              btnStyle="outlined"
              onClick={() => push(paths.auth.register)}
            />
          </div>

          <div className="flex flex-col justify-center px-4 lg:pl-20 lg:pr-32 h-full gap-10">
            <div className="flex flex-col gap-4">
              <p className="text-teal-800 text-4xl lg:text-5xl font-extrabold text-center lg:text-left">
                Hi, selamat datang kembali!
              </p>
              <p className="text-slate-900 text-xl font-regular text-center lg:text-left">
                Masuk ke akun Anda
              </p>
            </div>

            <div>
              <FormProvider {...methods}>
                <LoginForm onSubmit={handleSubmit(onSubmit)} />
              </FormProvider>
              <Button
                text={isSubmitting ? "Loading..." : "Masuk"}
                btnStyle="filled"
                onClick={handleSubmit(onSubmit)}
              />
            </div>
            <div className="flex gap-2 justify-center mt-10 lg:hidden">
              <p className="text-slate-500 text-base">Belum memiliki akun?</p>
              <Link href={paths.auth.register}>Daftar</Link>
            </div>
          </div>

          <ToastContainer />
        </div>
      }
    />
  );
}

export default LoginView;
