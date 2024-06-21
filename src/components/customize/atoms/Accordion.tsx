import { TransactionRepository } from "@/repositories/TransactionRepository";
import { ITransactionRequest } from "@/types/requests/TransactionRequest";
import { ITransactionsResponse } from "@/types/responses/TransactionResponse";
import { fTime } from "@/utils/formatDate";
import { fNum } from "@/utils/formatNumber";
import { ChevronDown, ChevronUp, Pencil, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import ModalCard from "../organisms/cards/ModalCard";

type IProps = {
  data: ITransactionsResponse;
  selectedTransactionId: string;
  setSelectedTransactionId: any;
  setIsShowEditModal: any;
};

function Accordion({
  data,
  selectedTransactionId,
  setSelectedTransactionId,
  setIsShowEditModal,
}: IProps) {
  const [open, setOpen] = useState(false);

  const { handleSubmit, reset, setValue } = useFormContext();

  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);
  const [deleteItem, setDeleteItem] = useState("");

  const handleClick = () => {
    setOpen(!open);
  };

  const onDelete = async (selectedTransactionId: string) => {
    try {
      if (!selectedTransactionId) return;
      await TransactionRepository.DeleteTransaction(selectedTransactionId);
      setIsShowDeleteModal(false);
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between w-full">
        <button className="flex items-center pointer" onClick={handleClick}>
          {open ? <ChevronUp /> : <ChevronDown />}
          <div className="flex items-center gap-3 ml-2">
            <div className="px-2 py-1 rounded-xl text-white text-base font-bold lining-nums bg-teal-700">
              #{data.transactionID}
            </div>
            <p
              className="text-sm lining-nums text-slate-500"
              suppressHydrationWarning
            >
              {fTime(data.transactionDate)} - {data.userName}
            </p>
          </div>
        </button>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setIsShowEditModal(true);
              setSelectedTransactionId(data.transactionID);
            }}
          >
            <Pencil size={20} color="#0F766E" />
          </button>
          <button
            onClick={() => {
              setIsShowDeleteModal(true);
              setSelectedTransactionId(data.transactionID);
              setDeleteItem(data.transactionID);
            }}
          >
            <Trash2 size={20} color="#DC2626" />
          </button>
        </div>
      </div>
      <div
        className={`${
          open ? "p-4 mt-2 border" : ""
        } overflow-hidden transition-all duration-100 rounded-md`}
      >
        {open && (
          <table
            className={`table-auto w-full rounded-md text-base lining-nums font-medium`}
          >
            <tbody>
              {data.products.map((p, index) => (
                <tr key={index} className="border-b">
                  <td>{p.productName}</td>
                  <td className="text-slate-500">x{p.quantity}</td>
                  <td className="text-right">IDR {fNum(p.value)}</td>
                </tr>
              ))}
              <tr className="font-bold">
                <td>Total</td>
                <td></td>
                <td className="text-right">{fNum(data.transactionTotal)}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>

      {/* Delete modal */}
      <ModalCard
        open={isShowDeleteModal}
        setOpen={setIsShowDeleteModal}
        deleteTitle={deleteItem}
        onDelete={() => onDelete(selectedTransactionId!)}
      />
    </div>
  );
}

export default Accordion;
