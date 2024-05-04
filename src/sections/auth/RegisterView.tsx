"use client";

import Button from "@/components/customize/atoms/button/Button";
import RegisterForm from "@/components/customize/organisms/forms/RegisterForm";
import AuthTemplate from "@/components/customize/templates/AuthTemplate";
import { registerField, registerSchema } from "@/data/AuthData";
import { paths } from "@/routes/paths";
import { IRegisterRequest } from "@/types/requests/AuthRequest";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

function RegisterView() {
  const push = useRouter().push;

  const methods = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: registerField(),
    mode: "onChange",
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: IRegisterRequest) => {
    console.log(data);
  };

  return (
    <AuthTemplate
      content={
        <div className="relative">
          <div className="absolute top-8 right-10 flex items-center gap-4">
            <p className="text-slate-500 text-base">Already a user?</p>
            <Button
              text="Login"
              btnStyle="outlined"
              onClick={() => push(paths.auth.login)}
            />
          </div>

          <div className="flex flex-col justify-center pl-20 pr-32 h-full gap-10">
            <div className="flex flex-col gap-4">
              <p className="text-teal-800 text-5xl font-extrabold">
                Welcome to <br /> Micro Monitor!
              </p>
              <p className="text-slate-900 text-xl font-regular">
                Create your account
              </p>
            </div>

            {/* TODO: integrate later */}
            <div>
              <FormProvider {...methods}>
                <RegisterForm onSubmit={handleSubmit(onSubmit)} />
              </FormProvider>
              <Button
                text="Sign Up"
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

export default RegisterView;
