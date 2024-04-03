import React from "react";
import NumberField from "../../molecules/input-field/NumberField";
import DateField from "../../molecules/input-field/DateField";
import SelectField from "../../molecules/input-field/SelectField";
import { transactionOptions } from "@/_dummyData/transaction";

function TransactionForm() {
  return (
    <form className="space-y-2 s mb-[30px]">
      <SelectField
        label="Product Name"
        name="productName"
        options={transactionOptions}
      />
      <div className="flex gap-2">
        <NumberField label="Quantity" name="quantity" type="number" />
        <NumberField label="Amount" name="amount" type="currency" />
      </div>
      <DateField label="Date" name="date" />
    </form>
  );
}

export default TransactionForm;
