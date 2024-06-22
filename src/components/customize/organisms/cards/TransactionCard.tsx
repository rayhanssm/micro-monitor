import { ITransactionListResponse } from "@/types/responses/TransactionResponse";
import React from "react";
import TransactionAccordion from "../../atoms/TransactionAccordion";

type IProps = {
  data: ITransactionListResponse;
};

function TransactionCard({ data }: IProps) {
  return (
    <div className="flex flex-col gap-6 p-4 border rounded-xl shadow-md">
      {data.transactions.map((transaction) => (
        <TransactionAccordion
          key={transaction.transactionID}
          data={transaction}
        />
      ))}
    </div>
  );
}

export default TransactionCard;
