import { ITransactionListResponse } from "@/types/responses/TransactionResponse";
import React from "react";
import TransactionAccordion from "../../atoms/TransactionAccordion";
import { IProductListResponse } from "@/types/responses/ProductResponse";

type IProps = {
  data: ITransactionListResponse;
  isReload: any;
  setIsReload: any;
  productData: IProductListResponse[] | null;
  setSearchText: any;
};

function TransactionCard({
  data,
  isReload,
  setIsReload,
  productData,
  setSearchText,
}: IProps) {
  return (
    <div className="flex flex-col gap-6 p-4 border rounded-xl shadow-md">
      {data.transactions.map((transaction) => (
        <TransactionAccordion
          key={transaction.transactionID}
          data={transaction}
          productData={productData}
          isReload={isReload}
          setIsReload={setIsReload}
          setSearchText={setSearchText}
        />
      ))}
    </div>
  );
}

export default TransactionCard;
