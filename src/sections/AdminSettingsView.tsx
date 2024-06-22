"use client";

import Button from "@/components/customize/atoms/button/Button";
import ProfileForm from "@/components/customize/organisms/forms/ProfileForm";
import { profileField, profileSchema } from "@/data/AuthData";
import { AuthRepository } from "@/repositories/AuthRepository";
import { IProfileResponse } from "@/types/responses/AuthResponse";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

function AdminSettingsView() {
  return (
    <div className="pt-[124px] px-[116px] flex justify-center">
      <div className="p-[25px] w-[400px] border border-slate-200 rounded-lg shadow">
        INI ADMIN
      </div>
    </div>
  );
}

export default AdminSettingsView;
