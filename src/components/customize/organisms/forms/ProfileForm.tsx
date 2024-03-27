import React from "react";
import CustomTextField from "../../molecules/input-field/CustomTextField";
import ProfileField from "../../molecules/input-field/ProfileField";

function ProfileForm() {
  return (
    <form className="space-y-2 s mb-[30px]">
      <div className="mb-6 flex justify-center">
        <ProfileField />
      </div>

      <CustomTextField label="Store Name" name="storeName" type="text" />
      <CustomTextField label="Username" name="userName" type="text" />
    </form>
  );
}

export default ProfileForm;
