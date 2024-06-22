"use client";

import { fDateSlash } from "@/utils/formatDate";
import { fCurrency, fNum } from "@/utils/formatNumber";
import { Pencil, Trash2 } from "lucide-react";
import React, { useState } from "react";
import TablePagination from "../../molecules/pagination/TablePagination";
import ModalCard from "../cards/ModalCard";
import TransactionForm from "../forms/TransactionForm";
import { transactionTableDummies } from "@/_dummyData/transaction";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { transactionField, transactionSchema } from "@/data/TransactionData";
import { ITransactionRequest } from "@/types/requests/TransactionRequest";
import { TransactionRepository } from "@/repositories/TransactionRepository";
import { DevTool } from "@hookform/devtools";
import { ITransactionDetailResponse } from "@/types/responses/TransactionResponse";

type IProps = {
  isShowAddModal: boolean;
  setIsShowAddModal: (value: boolean) => void;
};

function TransactionTable({ isShowAddModal, setIsShowAddModal }: IProps) {
  // TODO: delete later
  const lastItem = transactionTableDummies.length - 1;

  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState("");
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState<string>();

  const [detailData, setDetailData] =
    useState<any | null>();

  const methods = useForm({
    resolver: yupResolver(transactionSchema),
    defaultValues: transactionField(),
    mode: "onSubmit",
  });

  const { handleSubmit, reset, control } = methods;

  const onSubmit = async (data: ITransactionRequest) => {
    try {
      await TransactionRepository.AddTransaction(data);
      setIsShowAddModal(false);
      reset();
    } catch (e: any) {
      console.log(e);
    }
  };

  const onEdit = async (data: ITransactionRequest) => {
    try {
      if (!selectedTransactionId) return;
      await TransactionRepository.EditTransaction(data, selectedTransactionId);
      setIsShowAddModal(false);
      reset();
      setSelectedTransactionId("");
    } catch (e: any) {
      console.log(e);
    }
  };

  const getDetail = async (id: string) => {
    try {
      if (!id) return;
      const res = await TransactionRepository.GetTransactionDetail(id);
      setDetailData(res.data);
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <div>
      <div className="border rounded-md p-6 mb-6">
        <table className="table-auto w-full rounded-md">
          <thead className="text-left">
            <tr>
              <th className="pb-2">Name</th>
              <th className="pb-2">Quantity</th>
              <th className="pb-2">Amount</th>
              <th className="pb-2">Date</th>
              <th className="pb-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactionTableDummies.map((content, index) => (
              <tr key={index} className="border-t">
                <td
                  className={`pt-2.5 pr-2 max-w-96 ${
                    index === lastItem ? "pb-0" : "pb-2.5"
                  }`}
                >
                  {content.name}
                </td>
                <td
                  className={`pt-2.5 ${index === lastItem ? "pb-0" : "pb-2.5"}`}
                >
                  {content.quantity ? fNum(content.quantity) : "-"}
                </td>
                <td
                  className={`pt-2.5 ${index === lastItem ? "pb-0" : "pb-2.5"}`}
                >
                  {content.amount ? fCurrency(content.amount) : "-"}
                </td>
                <td
                  className={`pt-2.5 ${index === lastItem ? "pb-0" : "pb-2.5"}`}
                >
                  {/* {content.date ? fDateSlash(content.date) : "-"} */}
                </td>
                <td
                  className={`pt-2.5 ${index === lastItem ? "pb-0" : "pb-2.5"}`}
                >
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setIsShowEditModal(true);
                        setSelectedTransactionId(content.id);
                        getDetail(content.id);
                      }}
                    >
                      <Pencil size={20} color="#0F766E" />
                    </button>
                    <button
                      onClick={() => {
                        setIsShowDeleteModal(true);
                        setDeleteItem(content.name);
                      }}
                    >
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
        current={Math.floor(transactionTableDummies.length / 10)}
        total={Math.ceil(transactionTableDummies.length / 10)}
      />

      {/* Add transaction modal */}
      <ModalCard
        open={isShowAddModal}
        setOpen={setIsShowAddModal}
        title="Add Transaction"
        buttonText="Add"
        onClick={handleSubmit(onSubmit)}
      >
        {/* <FormProvider {...methods}>
          <TransactionForm onSubmit={handleSubmit(onSubmit)} />
        </FormProvider> */}
      </ModalCard>

      {/* Edit transaction modal */}
      <ModalCard
        open={isShowEditModal}
        setOpen={setIsShowEditModal}
        title="Edit Transaction"
        buttonText="Edit"
        onClick={handleSubmit(onEdit)}
      >
        {/* <FormProvider {...methods}>
          <TransactionForm onSubmit={handleSubmit(onEdit)} data={detailData} />
        </FormProvider> */}
      </ModalCard>

      {/* Delete transaction modal */}
      <ModalCard
        open={isShowDeleteModal}
        setOpen={setIsShowDeleteModal}
        deleteTitle={deleteItem}
      />
    </div>
  );
}

export default TransactionTable;
