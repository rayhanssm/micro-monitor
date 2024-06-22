import React from "react";
import TextField from "../../molecules/input-field/TextField";
type IProps = {
  onSubmit: () => void;
};

function LoginForm({ onSubmit }: IProps) {
  return (
    <form className="space-y-6 mb-[30px]" onSubmit={onSubmit}>
      <TextField label="Username" name="userName" />
      <TextField label="Kata Sandi" name="password" type="password" />
    </form>
  );
}

export default LoginForm;
