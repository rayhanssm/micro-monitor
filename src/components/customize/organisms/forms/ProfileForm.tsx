import React from "react";
import ProfileField from "../../molecules/input-field/ProfileField";
import TextField from "../../molecules/input-field/TextField";

type IProps = {
  onSubmit: () => void;
  role: string;
};

function ProfileForm({ onSubmit, role = "staff" }: IProps) {
  return (
    <form className="space-y-2 s mb-[30px]" onSubmit={onSubmit}>
      <div className="mb-6 flex justify-center">
        <ProfileField />
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
