import React from "react";
import TextField from "../../molecules/input-field/TextField";
import NumberField from "../../molecules/input-field/NumberField";

function TargetForm() {
  return (
    <form className="space-y-2 s mb-[30px]">
      <TextField label="Month" name="month" />
      <NumberField label="Target" name="target" />
    </form>
  );
}

export default TargetForm;
