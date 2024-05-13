"use client";

import Button from "@/components/customize/atoms/button/Button";
import ProfileForm from "@/components/customize/organisms/forms/ProfileForm";
import { profileField, profileSchema } from "@/data/AuthData";
import { AuthRepository } from "@/repositories/AuthRepository";
import { IProfileResponse } from "@/types/responses/AuthResponse";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

function ProfileView() {
  const [profile, setProfile] = useState<IProfileResponse | null>(null);

  const methods = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: profileField(),
    mode: "onChange",
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

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
    console.log(profile);
  }, [profile]);

  return (
    <div className="pt-[124px] px-[116px] flex justify-center">
      <div className="p-[25px] w-[400px] border border-slate-200 rounded-lg shadow">
        <FormProvider {...methods}>
          <ProfileForm />
        </FormProvider>

        <Button text="Save" btnStyle="filled" additionClassname="w-full" />
      </div>
    </div>
  );
}

export default ProfileView;
