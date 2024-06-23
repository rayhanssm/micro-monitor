import React from "react";
import TextField from "../../molecules/input-field/TextField";

type IProps = {
  onSubmit: () => void;
};

function StaffForm({ onSubmit }: IProps) {
  return (
    <form className="space-y-2 s mb-[30px]" onSubmit={onSubmit}>
      <TextField label="Username" name="userName" />
      <TextField label="Kata Sandi" name="password" type="password" />
      <TextField
        label="Konfirmasi Kata Sandi"
        name="confirmPassword"
        type="password"
      />
    </form>
  );
}

export default StaffForm;
