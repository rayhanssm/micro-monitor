"use client";

import { profileStaffDetail } from "@/_dummyData/auth";
import Button from "@/components/customize/atoms/button/Button";
import ProfileForm from "@/components/customize/organisms/forms/ProfileForm";
import { profileField, profileSchema } from "@/data/AuthData";
import { AuthRepository } from "@/repositories/AuthRepository";
import { IProfileRequest } from "@/types/requests/AuthRequest";
import { IProfileResponse } from "@/types/responses/AuthResponse";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

function ProfileView() {
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
    } catch (e: any) {
      console.log(e);
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
  }, [profile]);

  useEffect(() => {
    if (!profileStaffDetail) return;
    setValue("storeName", profileStaffDetail.storeName);
    setValue("userName", profileStaffDetail.userName);
  }, [profileStaffDetail, profile]);

  return (
    <div className="pt-[124px] px-[116px] flex justify-center">
      <div className="p-[25px] w-[400px] border border-slate-200 rounded-lg shadow">
        <FormProvider {...methods}>
          <ProfileForm onSubmit={handleSubmit(onSubmit)} />
        </FormProvider>

        <Button
          text="Simpan"
          btnStyle="filled"
          additionClassname="w-full"
          onClick={handleSubmit(onSubmit)}
        />
      </div>
    </div>
  );
}

export default ProfileView;
