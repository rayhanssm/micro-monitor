"use client";

import { CirclePlus, Pencil, Trash2 } from "lucide-react";
import React, { useState } from "react";
import TargetForm from "../forms/TargetForm";
import ModalCard from "../cards/ModalCard";
import { fCurrency } from "@/utils/formatNumber";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { targetField, targetSchema } from "@/data/TargetData";

// TODO: delete later
const tableDummies = [
  {
    month: "January",
    target: 0,
  },
  {
    month: "February",
    target: 4000000,
  },
  {
    month: "March",
    target: 5000000,
  },
  {
    month: "April",
    target: 6000000,
  },
  {
    month: "May",
    target: 6000000,
  },
  {
    month: "June",
    target: 6000000,
  },
  {
    month: "July",
    target: 6000000,
  },
  {
    month: "August",
    target: 6000000,
  },
  {
    month: "September",
    target: 6000000,
  },
  {
    month: "October",
    target: 6000000,
  },
  {
    month: "November",
    target: 6000000,
  },
  {
    month: "December",
    target: 6000000,
  },
];

function TargetTable() {
  const lastItem = tableDummies.length - 1;
  const [isShowAddModal, setIsShowAddModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState<string>();

  const methods = useForm({
    resolver: yupResolver(targetSchema),
    defaultValues: targetField(),
    mode: "onSubmit",
  });

  return (
    <div className="border rounded-md p-6">
      <table className="table-auto w-full rounded-md">
        <thead className="text-left">
          <tr>
            <th className="pb-2">Month</th>
            <th className="pb-2">Target</th>
            <th className="pb-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableDummies.map((content, index) => (
            <tr key={index} className="border-t">
              <td
                className={`pt-2.5 ${index === lastItem ? "pb-0" : "pb-2.5"}`}
              >
                {content.month}
              </td>
              <td
                className={`pt-2.5 ${index === lastItem ? "pb-0" : "pb-2.5"}`}
              >
                {content.target ? fCurrency(content.target) : "-"}
              </td>
              <td
                className={`pt-2.5 ${index === lastItem ? "pb-0" : "pb-2.5"}`}
              >
                {content.target ? (
                  <div className="flex gap-2">
                    <button onClick={() => setIsShowEditModal(true)}>
                      <Pencil size={20} color="#0F766E" />
                    </button>
                    <button
                      onClick={() => {
                        setIsShowDeleteModal(true);
                        setDeleteItem(content.month);
                      }}
                    >
                      <Trash2 size={20} color="#0F766E" />
                    </button>
                  </div>
                ) : (
                  <div className="flex">
                    <button onClick={() => setIsShowAddModal(true)}>
                      <CirclePlus size={20} color="#0F766E" />
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add target modal */}
      <ModalCard
        open={isShowAddModal}
        setOpen={setIsShowAddModal}
        title="Add Target"
        buttonText="Add"
      >
        <FormProvider {...methods}>
          <TargetForm />
        </FormProvider>
      </ModalCard>

      {/* Edit target modal */}
      <ModalCard
        open={isShowEditModal}
        setOpen={setIsShowEditModal}
        title="Edit Target"
        buttonText="Edit"
      >
        <FormProvider {...methods}>
          <TargetForm />
        </FormProvider>
      </ModalCard>

      {/* Delete target modal */}
      <ModalCard
        open={isShowDeleteModal}
        setOpen={setIsShowDeleteModal}
        deleteTitle={deleteItem + " target"}
      />
    </div>
  );
}

export default TargetTable;
