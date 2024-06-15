"use-client";

import React, { useEffect, useState } from "react";
import NumberField from "../../molecules/input-field/NumberField";
import DateField from "../../molecules/input-field/DateField";
import SelectField from "../../molecules/input-field/SelectField";
import { transactionOptions } from "@/_dummyData/transaction";
import { ITransactionDetailResponse } from "@/types/responses/TransactionResponse";
import { useFieldArray, useFormContext } from "react-hook-form";
import DateTimeField from "../../molecules/input-field/DateTimeField";
import { IProductListResponse } from "@/types/responses/ProductResponse";
import { fNum } from "@/utils/formatNumber";
import NumberIncrementField from "../../molecules/input-field/NumberIncrementField";
import TextField from "../../molecules/input-field/TextField";

type IProps = {
  onSubmit: () => void;
  data?: ITransactionDetailResponse | null;
  selectedProducts?: IProductListResponse[];
  totalTransaction?: number;
};

function TransactionForm({
  onSubmit,
  data,
  selectedProducts,
  totalTransaction,
}: IProps) {
  const { setValue } = useFormContext();

  return (
    <form className="space-y-6 s mb-[30px]" onSubmit={onSubmit}>
      <DateTimeField label="Tanggal dan Jam" name="transactionDate" />
      {selectedProducts && selectedProducts.length > 0 ? (
        <div className="flex flex-col gap-2 lining-nums">
          {selectedProducts.map((p, index) => (
            <div key={index} className="grid grid-cols-2">
              <div>
                <p className="text-sm font-semibold">{p.name}</p>
                <p className="text-xs text-slate-500">IDR {fNum(p.price)}</p>
              </div>
              <div className="hidden">
                <TextField name={`products[${index}].productId`} label="" />
                <NumberField name={`products[${index}].value`} label="" />
              </div>
              <NumberIncrementField name={`products[${index}].quantity`} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-500">Pilih produk terlebih dahulu</p>
      )}
      <div className="grid grid-cols-2 lining-nums">
        <p className="text-sm font-semibold">Total</p>
        <p className="text-sm font-semibold text-right">
          IDR {fNum(totalTransaction)}
        </p>
      </div>

      {/* <div className="grid grid-cols-2 gap-2">
        <NumberField label="Quantity" name="quantity" type="number" />
        <NumberField label="Amount" name="amount" type="currency" />
      </div> */}
    </form>
  );
}

export default TransactionForm;
