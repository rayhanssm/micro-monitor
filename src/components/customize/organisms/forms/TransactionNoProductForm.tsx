"use client";

import React, { useEffect } from "react";
import DateTimeField from "../../molecules/input-field/DateTimeField";
import NumberField from "../../molecules/input-field/NumberField";
import { useFormContext } from "react-hook-form";
import { ITransactionDetailResponse } from "@/types/responses/TransactionResponse";

type IProps = {
  onSubmit: () => void;
  data?: ITransactionDetailResponse;
};

function TransactionNoProductForm({ onSubmit, data }: IProps) {
  const { setValue } = useFormContext();

  useEffect(() => {
    if (data) {
      setValue("transactionDate", data?.transactionDate);
      setValue("transactionTotal", data?.transactionTotal);
    }
  }, [data]);

  return (
    <form className="space-y-6 s mb-[30px]" onSubmit={onSubmit}>
      <DateTimeField label="Tanggal dan Jam" name="transactionDate" />
      <NumberField name="transactionTotal" label="" type="currency" />
    </form>
  );
}

export default TransactionNoProductForm;
