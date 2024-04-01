import React from "react";
import ProfileField from "../../molecules/input-field/ProfileField";
import TextField from "../../molecules/input-field/TextField";

function ProfileForm() {
  return (
    <form className="space-y-2 s mb-[30px]">
      <div className="mb-6 flex justify-center">
        <ProfileField />
      </div>

      <TextField label="Store Name" name="storeName" />
      <TextField label="Username" name="userName" />
    </form>
  );
}

export default ProfileForm;
