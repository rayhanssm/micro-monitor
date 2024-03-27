import React from "react";
import CustomTextField from "../../molecules/input-field/CustomTextField";

function TargetForm() {
  return (
    <form className="space-y-2 s mb-[30px]">
      <CustomTextField label="Month" name="month" type="text" />
      <CustomTextField label="Target" name="target" type="number" />
    </form>
  );
}

export default TargetForm;
