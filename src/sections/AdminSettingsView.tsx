"use client";

import Button from "@/components/customize/atoms/button/Button";
import ProfileForm from "@/components/customize/organisms/forms/ProfileForm";
import { profileField, profileSchema } from "@/data/AuthData";
import { AuthRepository } from "@/repositories/AuthRepository";
import { IProfileRequest } from "@/types/requests/AuthRequest";
import { IProfileResponse } from "@/types/responses/AuthResponse";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import StaffView from "./StaffView";
import { showToast } from "@/utils/toast";

function AdminSettingsView() {
  const [selected, setSelected] = useState(1);

  const [profile, setProfile] = useState<IProfileResponse | null>(null);
  const [isReload, setIsReload] = useState(false);

  const methods = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: profileField(),
    mode: "onChange",
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
    setValue,
  } = methods;

  const onSubmit = async (data: IProfileRequest) => {
    try {
      await AuthRepository.EditProfile(data);
      reset();
      setIsReload(!isReload);
      showToast("Profil berhasil diperbarui", "success");
    } catch (error: any) {
      showToast(
        error.response?.data.error ? error.response.data.error : error.message,
        "error"
      );
    }
  };

  const getProfile = async () => {
    try {
      const res = await AuthRepository.GetProfile();
      setProfile(res.data);
    } catch (e: any) {
      console.log(e);
    }
  };

  useEffect(() => {
    getProfile();
  }, [isReload, selected]);

  useEffect(() => {
    if (!profile) return;
    setValue("storeName", profile.storeName);
    setValue("userName", profile.userName);
  }, [isReload, selected, profile]);

  return (
    <div className="pt-[124px] px-4 lg:px-[116px] flex flex-col lg:flex-row gap-10">
      <div className="p-[25px] w-full lg:w-[300px] h-fit flex flex-col gap-2 border border-slate-200 rounded-lg shadow">
        <button
          className={`${
            selected === 1 ? "border border-slate-300 font-semibold" : ""
          } flex items-center gap-2 w-full bg-transparent hover:bg-slate-50 text-sm text-[#1C1C1C] font-medium py-2 px-4 rounded-md transition ease-in`}
          onClick={() => {
            setSelected(1);
          }}
        >
          Profil
        </button>
        <button
          className={`${
            selected === 2 ? "border border-slate-300 font-semibold" : ""
          } flex items-center gap-2 w-full bg-transparent hover:bg-slate-50 text-sm text-[#1C1C1C] font-medium py-2 px-4 rounded-md transition ease-in`}
          onClick={() => {
            setSelected(2);
          }}
        >
          Staff
        </button>
      </div>
      {selected === 1 ? (
        <div className="flex flex-col">
          <div className="p-[25px] w-[400px] border border-slate-200 rounded-lg shadow">
            <FormProvider {...methods}>
              <ProfileForm onSubmit={handleSubmit(onSubmit)} role={"admin"} profile={profile} />
            </FormProvider>

            <Button
              text={isSubmitting ? "Memuat..." : "Simpan"}
              btnStyle="filled"
              additionClassname="w-full"
              onClick={handleSubmit(onSubmit)}
            />
          </div>
        </div>
      ) : (
        <StaffView />
      )}
    </div>
  );
}

export default AdminSettingsView;
