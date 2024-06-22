import React from "react";
import ProfileField from "../../molecules/input-field/ProfileField";
import TextField from "../../molecules/input-field/TextField";

type IProps = {
  onSubmit: () => void;
};

function ProfileForm({ onSubmit }: IProps) {
  return (
    <form className="space-y-2 s mb-[30px]" onSubmit={onSubmit}>
      <div className="mb-6 flex justify-center">
        <ProfileField />
      </div>

      <TextField label="Nama UMKM" name="storeName" disabled />
      <TextField label="Username" name="userName" />
    </form>
  );
}

export default ProfileForm;
