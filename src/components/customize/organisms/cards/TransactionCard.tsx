import { ITransactionListResponse } from "@/types/responses/TransactionResponse";
import React from "react";
import Accordion from "../../atoms/Accordion";

type IProps = {
  data: ITransactionListResponse;
  selectedTransactionId: string;
  setSelectedTransactionId: any;
  setIsShowEditModal: any;
};

function TransactionCard({
  data,
  selectedTransactionId,
  setIsShowEditModal,
  setSelectedTransactionId,
}: IProps) {
  return (
    <div className="flex flex-col gap-6 p-4 border rounded-xl shadow-md">
      {data.transactions.map((transaction) => (
        <Accordion
          key={transaction.transactionID}
          data={transaction}
          selectedTransactionId={selectedTransactionId}
          setIsShowEditModal={setIsShowEditModal}
          setSelectedTransactionId={setSelectedTransactionId}
        />
      ))}
    </div>
  );
}

export default TransactionCard;
