import React from "react";
import InputField from "../../molecules/input-field/InputField";

function ProfileForm() {
  return (
    <form className="space-y-2 mb-[30px]">
      <InputField label="Store Name" name="storeName" type="text" />
      <InputField label="Username" name="userName" type="text" />
    </form>
  );
}

export default ProfileForm;
