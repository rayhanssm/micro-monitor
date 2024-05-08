"use client";

import Button from "@/components/customize/atoms/button/Button";
import LoginForm from "@/components/customize/organisms/forms/LoginForm";
import AuthTemplate from "@/components/customize/templates/AuthTemplate";
import { loginField, loginSchema } from "@/data/AuthData";
import { AuthRepository } from "@/repositories/AuthRepositories";
import { paths } from "@/routes/paths";
import { ILoginRequest } from "@/types/requests/AuthRequest";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import React from "react";
import { useCookies } from "react-cookie";
import { FormProvider, useForm } from "react-hook-form";

function LoginView() {
  const push = useRouter().push;
  const [cookies, setCookie] = useCookies(["token"]);

  const methods = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: loginField(),
    mode: "onChange",
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: ILoginRequest) => {
    try {
      const res = await AuthRepository.PostLogin(data);
      const token = res.data.data.token;
      setCookie("token", token);
      push(paths.dashboard);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <AuthTemplate
      content={
        <div className="relative">
          <div className="absolute top-8 right-10 flex items-center gap-4">
            <p className="text-slate-500 text-base">Not a user yet?</p>
            <Button
              text="Register"
              btnStyle="outlined"
              onClick={() => push(paths.auth.register)}
            />
          </div>

          <div className="flex flex-col justify-center pl-20 pr-32 h-full gap-10">
            <div className="flex flex-col gap-4">
              <p className="text-teal-800 text-5xl font-extrabold">
                Hi, Welcome back!
              </p>
              <p className="text-slate-900 text-xl font-regular">
                Login to your account
              </p>
            </div>

            {/* TODO: integrate later */}
            <div>
              <FormProvider {...methods}>
                <LoginForm onSubmit={handleSubmit(onSubmit)} />
              </FormProvider>
              <Button
                text="Login"
                btnStyle="filled"
                onClick={handleSubmit(onSubmit)}
              />
            </div>
          </div>
        </div>
      }
    />
  );
}

export default LoginView;
