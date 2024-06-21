"use-client";

import React, { useEffect, useState } from "react";
import NumberField from "../../molecules/input-field/NumberField";
import { useFormContext, useWatch } from "react-hook-form";
import DateTimeField from "../../molecules/input-field/DateTimeField";
import { IProductListResponse } from "@/types/responses/ProductResponse";
import { fNum } from "@/utils/formatNumber";
import NumberIncrementField from "../../molecules/input-field/NumberIncrementField";
import TextField from "../../molecules/input-field/TextField";

type IProps = {
  onSubmit: () => void;
  selectedProducts?: IProductListResponse[];
};

function TransactionForm({ onSubmit, selectedProducts }: IProps) {
  const { control, setValue } = useFormContext();
  const [totalTransaction, setTotalTransaction] = useState(0);
  const [transactionValue, setTransactionValue] = useState<number[]>([]);
  const watchedProducts = useWatch({
    control,
    name: "products",
  });

  useEffect(() => {
    let total = 0;
    const values: number[] = [];

    if (selectedProducts) {
      for (let i = 0; i < selectedProducts.length; i++) {
        const quantity = watchedProducts[i]?.quantity || 0;
        const productPrice = selectedProducts[i].productPrice || 0;
        const value = productPrice * quantity;
        total += value;
        values[i] = value;
        setValue(`products[${i}].value`, value);
      }
    }

    setTransactionValue(values);
    setTotalTransaction(total);
    setValue("transactionTotal", total);
  }, [watchedProducts, selectedProducts, setValue]);

  return (
    <form className="space-y-6 s mb-[30px]" onSubmit={onSubmit}>
      <DateTimeField label="Tanggal dan Jam" name="transactionDate" />
      <div className="hidden">
        <NumberField name="transactionTotal" label="" />
      </div>
      {selectedProducts && selectedProducts.length > 0 ? (
        <div className="flex flex-col gap-2 lining-nums">
          {selectedProducts.map((p: any, index: any) => (
            <div key={index} className="grid grid-cols-2">
              <div>
                <p className="text-sm font-semibold">{p.productName}</p>
                <p className="text-xs text-slate-500">
                  IDR {fNum(transactionValue[index])}
                </p>
              </div>
              <div className="hidden">
                <TextField name={`products[${index}].productID`} label="" />
                <NumberField name={`products[${index}].value`} label="" />
              </div>
              <NumberIncrementField name={`products[${index}].quantity`} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-red-500">Pilih produk terlebih dahulu</p>
      )}
      <div className="grid grid-cols-2 lining-nums">
        <p className="text-sm font-semibold">Total</p>
        <p className="text-sm font-semibold text-right">
          IDR {fNum(totalTransaction)}
        </p>
      </div>
    </form>
  );
}

export default TransactionForm;
