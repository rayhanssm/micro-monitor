import { ITransactionListResponse } from "@/types/responses/TransactionResponse";
import React from "react";
import Accordion from "../../atoms/Accordion";

type IProps = {
  data: ITransactionListResponse;
};

function TransactionCard({ data }: IProps) {
  return (
    <div className="flex flex-col gap-6 p-4 border rounded-xl shadow-md">
      {data.transactions.map((transaction) => (
        <Accordion key={transaction.id} data={transaction} />
      ))}
    </div>
  );
}

export default TransactionCard;
