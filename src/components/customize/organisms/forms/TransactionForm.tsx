import React from "react";
import NumberField from "../../molecules/input-field/NumberField";
import DateField from "../../molecules/input-field/DateField";
import SelectField from "../../molecules/input-field/SelectField";
import { transactionOptions } from "@/_dummyData/transaction";
import { ITransactionDetailResponse } from "@/types/responses/TransactionResponse";
import { useFormContext } from "react-hook-form";
import DateTimeField from "../../molecules/input-field/DateTimeField";
import { IProductListResponse } from "@/types/responses/ProductResponse";
import { fNum } from "@/utils/formatNumber";

type IProps = {
  onSubmit: () => void;
  data?: ITransactionDetailResponse | null;
  selectedProducts?: IProductListResponse[];
};

function TransactionForm({ onSubmit, data, selectedProducts }: IProps) {
  const { setValue } = useFormContext();

  if (data) {
    setValue("date", data.date);
    setValue("productId", data.product.value);
    setValue("quantity", data.quantity);
    setValue("amount", data.amount);
  }

  return (
    <form className="space-y-6 s mb-[30px]" onSubmit={onSubmit}>
      <DateTimeField label="Tanggal dan Jam" name="date" />
      {selectedProducts && selectedProducts.length > 0 ? (
        <div className="lining-nums">
          {selectedProducts.map((p, index) => (
            <div key={p.id} className="grid grid-cols-2">
              <div>
                <p className="text-sm font-semibold">{p.name}</p>
                <p className="text-xs text-slate-500">IDR {fNum(p.price)}</p>
              </div>
              Tes
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-500">Pilih produk terlebih dahulu</p>
      )}

      {/* <div className="grid grid-cols-2 gap-2">
        <NumberField label="Quantity" name="quantity" type="number" />
        <NumberField label="Amount" name="amount" type="currency" />
      </div> */}
    </form>
  );
}

export default TransactionForm;
