import React from "react";
import NumberField from "../../molecules/input-field/NumberField";
import MonthField from "../../molecules/input-field/MonthField";

type IProps = {
  onSubmit: () => void;
};

function TargetForm({ onSubmit }: IProps) {
  return (
    <form className="space-y-2 s mb-[30px]" onSubmit={onSubmit}>
      <MonthField label="Bulan" name="targetDate" disabled />
      <NumberField label="Target" name="targetValue" type="currency" />
    </form>
  );
}

export default TargetForm;
