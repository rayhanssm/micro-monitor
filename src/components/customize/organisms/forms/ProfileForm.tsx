import React from "react";
import TextField from "../../molecules/input-field/TextField";
import { IProfileResponse } from "@/types/responses/AuthResponse";

type IProps = {
  onSubmit: () => void;
  role: string;
  profile: IProfileResponse | null;
};

function ProfileForm({ onSubmit, role = "staff", profile }: IProps) {
  return (
    <form className="space-y-2 s mb-[30px]" onSubmit={onSubmit}>
      <div className="mb-6 flex justify-center">
        <div className="w-20 h-20 flex justify-center items-center rounded-full bg-teal-500 transition-all">
          <p className="text-white font-bold text-4xl">
            {profile?.userName ? profile?.userName[0] : "-"}
          </p>
        </div>
      </div>

      <TextField
        label="Nama UMKM"
        name="storeName"
        disabled={role === "admin" ? false : true}
      />
      <TextField label="Username" name="userName" />
    </form>
  );
}

export default ProfileForm;
