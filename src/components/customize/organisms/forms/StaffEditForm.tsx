import React from "react";
import TextField from "../../molecules/input-field/TextField";

type IProps = {
  onSubmit: () => void;
};

function StaffEditForm({ onSubmit }: IProps) {
  return (
    <form className="space-y-2 s mb-[30px]" onSubmit={onSubmit}>
      <TextField label="Username" name="userName" />
    </form>
  );
}

export default StaffEditForm;
