"use client";

import Button from "@/components/customize/atoms/button/Button";
import ProfileForm from "@/components/customize/organisms/forms/ProfileForm";
import { profileField, profileSchema } from "@/data/AuthData";
import { AuthRepository } from "@/repositories/AuthRepository";
import { IProfileResponse } from "@/types/responses/AuthResponse";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import AdminSettingsView from "./AdminSettingsView";
import ProfileView from "./ProfileView";
import { Cookies } from "react-cookie";

function SettingsView() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const cookies = new Cookies();
    const role = cookies.get("role");
    setUserRole(role);
  }, []);

  if (userRole === "admin") {
    return <AdminSettingsView />;
  } else {
    return <ProfileView />;
  }
}

export default SettingsView;
