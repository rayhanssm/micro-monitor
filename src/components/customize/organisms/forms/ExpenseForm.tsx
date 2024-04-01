import React from "react";
import CustomTextField from "../../molecules/input-field/CustomTextField";
import TextAreaField from "../../molecules/input-field/TextAreaField";
import DateField from "../../molecules/input-field/DateField";

function ExpenseForm() {
  return (
    <form className="space-y-2 s mb-[30px]">
      <TextAreaField label="Description" name="description" />
      <CustomTextField label="Amount" name="amount" type="number" />
      <DateField label="Date" name="date" />
    </form>
  );
}

export default ExpenseForm;
