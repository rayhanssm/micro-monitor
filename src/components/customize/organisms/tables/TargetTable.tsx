"use client";

import { CirclePlus, Pencil, Trash2 } from "lucide-react";
import React, { useState } from "react";
import TargetForm from "../forms/TargetForm";
import Button from "../../atoms/button/Button";
import ModalCard from "../modal-card/ModalCard";

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
    month: "Oktober",
    target: 6000000,
  },
  {
    month: "November",
    target: 6000000,
  },
  {
    month: "Desember",
    target: 6000000,
  },
];

function CustomTable() {
  const lastItem = tableDummies.length - 1;
  const [isShowAddModal, setIsShowAddModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);

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
                {content.target ? content.target : "-"}
              </td>
              <td
                className={`pt-2.5 ${index === lastItem ? "pb-0" : "pb-2.5"}`}
              >
                {content.target ? (
                  <div className="flex gap-2">
                    <button onClick={() => setIsShowEditModal(true)}>
                      <Pencil size={20} color="#0F766E" />
                    </button>
                    <button onClick={() => setIsShowDeleteModal(true)}>
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
      <ModalCard open={isShowAddModal} setOpen={setIsShowAddModal}>
        <p className="text-2xl font-semibold mb-4 flex justify-center">
          Add Target
        </p>
        <TargetForm />

        <div className="flex gap-2 justify-end">
          <Button
            text="Cancel"
            type="outlined"
            additionClassname="w-full"
            onClick={() => setIsShowAddModal(false)}
          />
          <Button text="Add" type="filled" additionClassname="w-full" />
        </div>
      </ModalCard>

      {/* Edit target modal */}
      <ModalCard open={isShowEditModal} setOpen={setIsShowEditModal}>
        <p className="text-2xl font-semibold mb-4 flex justify-center">
          Edit Target
        </p>
        <TargetForm />

        <div className="flex gap-2 justify-end">
          <Button
            text="Cancel"
            type="outlined"
            additionClassname="w-full"
            onClick={() => setIsShowEditModal(false)}
          />
          <Button text="Edit" type="filled" additionClassname="w-full" />
        </div>
      </ModalCard>

      {/* Delete target modal */}
      <ModalCard open={isShowDeleteModal} setOpen={setIsShowDeleteModal}>
        <div className="flex flex-col gap-4">
          <p className="text-lg font-semibold flex">
            Are you sure want to delete Transaction?
          </p>

          <p className="text-sm font-medium text-slate-500">
            This will permanently delete target and remove the data from our
            servers.
          </p>

          <div className="flex gap-2 justify-end">
            <Button
              text="Cancel"
              type="outlined"
              additionClassname="w-full"
              onClick={() => setIsShowDeleteModal(false)}
            />
            <Button text="Delete" type="filled" additionClassname="w-full" />
          </div>
        </div>
      </ModalCard>
    </div>
  );
}

export default CustomTable;
