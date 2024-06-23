import { ITransactionListResponse } from "@/types/responses/TransactionResponse";
import React from "react";
import TransactionAccordion from "../../atoms/TransactionAccordion";

type IProps = {
  data: ITransactionListResponse;
  isReload: any;
  setIsReload: any;
};

function TransactionCard({ data, isReload, setIsReload }: IProps) {
  return (
    <div className="flex flex-col gap-6 p-4 border rounded-xl shadow-md">
      {data.transactions.map((transaction) => (
        <TransactionAccordion
          key={transaction.transactionID}
          data={transaction}
          isReload={isReload}
          setIsReload={setIsReload}
        />
      ))}
    </div>
  );
}

export default TransactionCard;
