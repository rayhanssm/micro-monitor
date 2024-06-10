import { ITransactionsResponse } from "@/types/responses/TransactionResponse";
import { fTime } from "@/utils/formatDate";
import { fNum } from "@/utils/formatNumber";
import { ChevronDown, ChevronUp, Pencil, Trash2 } from "lucide-react";
import React, { useState } from "react";

type IProps = {
  data: ITransactionsResponse;
};

function Accordion({ data }: IProps) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <div className="flex items-center justify-between w-full">
        <button className="flex items-center pointer" onClick={handleClick}>
          {open ? <ChevronUp /> : <ChevronDown />}
          <div className="flex items-center gap-3 ml-2">
            <div className="px-2 py-1 rounded-xl text-white text-base font-bold lining-nums bg-teal-700">
              #{data.id}
            </div>
            <p
              className="text-sm lining-nums text-slate-500"
              suppressHydrationWarning
            >
              {fTime(data.createdAt)} - {data.user}
            </p>
          </div>
        </button>
        <div className="flex gap-2">
          <button
            onClick={() => {
              // setIsShowEditModal(true);
              // setSelectedTransactionId(content.id);
            }}
          >
            <Pencil size={20} color="#0F766E" />
          </button>
          <button
            onClick={() => {
              // setIsShowDeleteModal(true);
              // setDeleteItem(content.name);
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
              {data.products.map((product, index) => (
                <tr key={index} className="border-b">
                  <td>{product.product.name}</td>
                  <td className="text-slate-500">x{product.quantity}</td>
                  <td className="text-right">IDR {fNum(product.amount)}</td>
                </tr>
              ))}
              <tr className="font-bold">
                <td>Total</td>
                <td></td>
                <td className="text-right">{fNum(data.total)}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Accordion;
