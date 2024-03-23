"use client";

import Button from "@/components/customize/atoms/button/Button";
import ProfileForm from "@/components/customize/organisms/forms/ProfileForm";
import React from "react";

function ProfileView() {
  return (
    <div className="pt-[124px] px-[116px] flex justify-center">
      <div className="p-[25px] w-[400px] border border-slate-200 rounded-lg shadow">
        <ProfileForm />

        <Button text="Save" type="filled" additionClassname="w-full" />
      </div>
    </div>
  );
}

export default ProfileView;
