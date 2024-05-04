import React from "react";
import TextField from "../../molecules/input-field/TextField";
type IProps = {
  onSubmit: () => void;
};

function RegisterForm({ onSubmit }: IProps) {
  return (
    <form className="space-y-6 mb-[30px]" onSubmit={onSubmit}>
      <TextField label="Store Name" name="storeName" />
      <TextField label="Username" name="userName" />
      <TextField label="Password" name="password" type="password" />
      <TextField
        label="Confirm Password"
        name="confirmPassword"
        type="password"
      />
    </form>
  );
}

export default RegisterForm;
