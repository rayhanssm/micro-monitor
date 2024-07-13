"use client";

import Button from "@/components/customize/atoms/button/Button";
import RegisterForm from "@/components/customize/organisms/forms/RegisterForm";
import AuthTemplate from "@/components/customize/templates/AuthTemplate";
import { registerField, registerSchema } from "@/data/AuthData";
import { AuthRepository } from "@/repositories/AuthRepository";
import { paths } from "@/routes/paths";
import { IRegisterRequest } from "@/types/requests/AuthRequest";
import { showToast } from "@/utils/toast";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

function RegisterView() {
  const push = useRouter().push;

  const [step, setStep] = useState(1);

  const methods = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: registerField(),
    mode: "onChange",
  });

  const {
    handleSubmit,
    trigger,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: IRegisterRequest) => {
    try {
      await AuthRepository.PostRegister(data);
      console.log("success");
      showToast(
        "Akun berhasil dibuat, silakan masuk terlebih dahulu",
        "success"
      );
      push(paths.auth.login);
    } catch (error: any) {
      showToast(
        error.response?.data.error ? error.response.data.error : error.message,
        "error"
      );
    }
  };

  const handleClickNext = async () => {
    const result = await trigger();
    if (result) {
      setStep(2);
    }
  };

  const handleClickPrev = () => {
    setStep(1);
  };

  return (
    <AuthTemplate
      pageType="register"
      registerStep={step}
      content={
        <div className={`relative ${step === 2 && "col-span-2"}`}>
          <div className="hidden lg:flex absolute top-8 right-10 items-center gap-4">
            <p className="text-slate-500 text-base">Sudah memiliki akun?</p>
            <Button
              text="Masuk"
              btnStyle="outlined"
              onClick={() => push(paths.auth.login)}
            />
          </div>

          <div className="flex flex-col pt-32 px-4 lg:pl-20 lg:pr-32 lg:py-32 h-full gap-10">
            <div className="flex flex-col gap-4">
              <p className="text-teal-800 text-4xl lg:text-5xl font-extrabold text-center lg:text-left">
                Selamat datang di <br /> Micro Monitor!
              </p>
              <p className="text-slate-900 text-xl font-regular text-center lg:text-left">
                Buat akun Anda
              </p>
            </div>

            <div className="flex justify-center items-center">
              <div
                className={`w-8 h-8 bg-teal-${
                  step === 2 ? `100` : `700`
                } rounded-full flex justify-center items-center transition-all`}
              >
                <p
                  className={`text-base text-${
                    step === 2 ? "teal-700" : "white"
                  } font-bold transition-all`}
                >
                  1
                </p>
                <p className="text-xs text-slate-500 absolute text-center translate-y-10">
                  Informasi
                  <br />
                  Pengguna dan UMKM
                </p>
              </div>
              <div className={`w-28 h-1 bg-teal-100 transition-all`} />
              <div
                className={`w-8 h-8 bg-teal-${
                  step === 1 ? `100` : `700`
                } rounded-full flex justify-center items-center transition-all`}
              >
                <p
                  className={`text-base text-${
                    step === 1 ? "teal-700" : "white"
                  } font-bold transition-all`}
                >
                  2
                </p>
                <p className="text-xs text-slate-500 absolute text-center translate-y-10">
                  Kebutuhan
                  <br />
                  Fitur
                </p>
              </div>
            </div>

            <div className="mt-5">
              <FormProvider {...methods}>
                <RegisterForm onSubmit={handleSubmit(onSubmit)} step={step} />
              </FormProvider>
              {step === 1 ? (
                <Button
                  text={"Berikutnya"}
                  btnStyle="outlined"
                  onClick={handleClickNext}
                />
              ) : (
                <div className="flex gap-2">
                  <Button
                    text={"Sebelumnya"}
                    btnStyle="outlined"
                    onClick={handleClickPrev}
                  />
                  <Button
                    text={isSubmitting ? "Memuat..." : "Daftar"}
                    btnStyle="filled"
                    onClick={handleSubmit(onSubmit)}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-2 justify-center mt-10 lg:hidden">
            <p className="text-slate-500 text-base">Sudah memiliki akun?</p>
            <Link href={paths.auth.login}>Masuk</Link>
          </div>
        </div>
      }
    />
  );
}

export default RegisterView;
