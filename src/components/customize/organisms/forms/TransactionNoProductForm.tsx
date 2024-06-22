import React from "react";
import DateTimeField from "../../molecules/input-field/DateTimeField";
import NumberField from "../../molecules/input-field/NumberField";

type IProps = {
  onSubmit: () => void;
};

function TransactionNoProductForm({ onSubmit }: IProps) {
  return (
    <form className="space-y-6 s mb-[30px]" onSubmit={onSubmit}>
      <DateTimeField label="Tanggal dan Jam" name="transactionDate" />
      <NumberField name="transactionTotal" label="" type="currency" />
    </form>
  );
}

export default TransactionNoProductForm;
