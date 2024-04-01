import React, { useState } from "react";
import ModalCard from "../modal-card/ModalCard";
import { fDateSlash } from "@/utils/formatDate";
import { fCurrency } from "@/utils/formatNumber";
import TablePagination from "../../molecules/pagination/TablePagination";
import { Pencil, Trash2 } from "lucide-react";
import ExpenseForm from "../forms/ExpenseForm";

type IProps = {
  isShowAddModal: boolean;
  setIsShowAddModal: (value: boolean) => void;
};

function ExpenseTable({ isShowAddModal, setIsShowAddModal }: IProps) {
  const tableDummies = [
    {
      desc: "Garam 50kg",
      amount: 266000,
      date: new Date(),
    },
    {
      desc: "Gula 100kg",
      amount: 1600000,
      date: new Date(),
    },
    {
      desc: "Beras 100kg",
      amount: 1752000,
      date: new Date(),
    },
    {
      desc: "Garam 50kg",
      amount: 266000,
      date: new Date(),
    },
    {
      desc: "Gula 100kg",
      amount: 1600000,
      date: new Date(),
    },
    {
      desc: "Beras 100kg",
      amount: 1752000,
      date: new Date(),
    },
    {
      desc: "Garam 50kg",
      amount: 266000,
      date: new Date(),
    },
    {
      desc: "Gula 100kg",
      amount: 1600000,
      date: new Date(),
    },
    {
      desc: "Beras 100kg",
      amount: 1752000,
      date: new Date(),
    },
    {
      desc: "Garam 50kg",
      amount: 266000,
      date: new Date(),
    },
    {
      desc: "Gula 100kg",
      amount: 1600000,
      date: new Date(),
    },
    {
      desc: "Beras 100kg",
      amount: 1752000,
      date: new Date(),
    },
  ];

  const lastItem = tableDummies.length - 1;

  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);

  return (
    <div>
      <div className="border rounded-md p-6 mb-6">
        <table className="table-auto w-full rounded-md">
          <thead className="text-left">
            <tr>
              <th className="pb-2">Description</th>
              <th className="pb-2">Amount</th>
              <th className="pb-2">Date</th>
              <th className="pb-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableDummies.map((content, index) => (
              <tr key={index} className="border-t">
                <td
                  className={`pt-2.5 pr-2 max-w-96 ${
                    index === lastItem ? "pb-0" : "pb-2.5"
                  }`}
                >
                  {content.desc}
                </td>
                <td
                  className={`pt-2.5 ${index === lastItem ? "pb-0" : "pb-2.5"}`}
                >
                  {content.amount ? fCurrency(content.amount) : "-"}
                </td>
                <td
                  className={`pt-2.5 ${index === lastItem ? "pb-0" : "pb-2.5"}`}
                >
                  {content.date ? fDateSlash(content.date) : "-"}
                </td>
                <td
                  className={`pt-2.5 ${index === lastItem ? "pb-0" : "pb-2.5"}`}
                >
                  <div className="flex gap-2">
                    <button onClick={() => setIsShowEditModal(true)}>
                      <Pencil size={20} color="#0F766E" />
                    </button>
                    <button onClick={() => setIsShowDeleteModal(true)}>
                      <Trash2 size={20} color="#0F766E" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <TablePagination
        current={Math.floor(tableDummies.length / 10)}
        total={Math.ceil(tableDummies.length / 10)}
      />

      {/* Add target modal */}
      <ModalCard
        open={isShowAddModal}
        setOpen={setIsShowAddModal}
        title="Add Expense"
        buttonText="Add"
      >
        <ExpenseForm />
      </ModalCard>
    </div>
  );
}

export default ExpenseTable;
