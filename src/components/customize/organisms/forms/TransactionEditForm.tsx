"use-client";

import React from "react";
import NumberField from "../../molecules/input-field/NumberField";
import DateTimeField from "../../molecules/input-field/DateTimeField";
import { IProductListResponse } from "@/types/responses/ProductResponse";
import { fNum } from "@/utils/formatNumber";
import NumberIncrementField from "../../molecules/input-field/NumberIncrementField";
import TextField from "../../molecules/input-field/TextField";

type IProps = {
  onSubmit: () => void;
  selectedProducts?: IProductListResponse[];
  transactionValue: any;
  totalTransaction: any;
};

function TransactionEditForm({
  onSubmit,
  selectedProducts,
  totalTransaction,
  transactionValue,
}: IProps) {
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

export default TransactionEditForm;
