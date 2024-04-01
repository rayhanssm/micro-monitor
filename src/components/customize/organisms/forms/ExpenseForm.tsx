import React from "react";
import TextAreaField from "../../molecules/input-field/TextAreaField";
import DateField from "../../molecules/input-field/DateField";
import NumberField from "../../molecules/input-field/NumberField";

function ExpenseForm() {
  return (
    <form className="space-y-2 s mb-[30px]">
      <TextAreaField label="Description" name="description" />
      <NumberField label="Amount" name="amount" />
      <DateField label="Date" name="date" />
    </form>
  );
}

export default ExpenseForm;
