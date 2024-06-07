import React from "react";
import NumberField from "../../molecules/input-field/NumberField";
import DateField from "../../molecules/input-field/DateField";
import SelectField from "../../molecules/input-field/SelectField";
import { transactionOptions } from "@/_dummyData/transaction";
import { ITransactionDetailResponse } from "@/types/responses/TransactionResponse";
import { useFormContext } from "react-hook-form";

type IProps = {
  onSubmit: () => void;
  data?: ITransactionDetailResponse | null;
};

function TransactionForm({ onSubmit, data }: IProps) {
  const { setValue } = useFormContext();

  if (data) {
    setValue("productId", data.product.value);
    setValue("quantity", data.quantity);
    setValue("amount", data.amount);
    setValue("date", data.date);
  }

  return (
    <form className="space-y-2 s mb-[30px]" onSubmit={onSubmit}>
      <SelectField
        label="Product Name"
        name="productId"
        options={transactionOptions}
      />
      <div className="grid grid-cols-2 gap-2">
        <NumberField label="Quantity" name="quantity" type="number" />
        <NumberField label="Amount" name="amount" type="currency" />
      </div>
      <DateField label="Date" name="date" />
    </form>
  );
}

export default TransactionForm;
