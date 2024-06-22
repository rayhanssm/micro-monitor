"use client";

import { CirclePlus, Pencil, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import TargetForm from "../forms/TargetForm";
import ModalCard from "../cards/ModalCard";
import { fCurrency } from "@/utils/formatNumber";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { targetField, targetSchema } from "@/data/TargetData";
import { targetList } from "@/_dummyData/target";
import { ITargetRequest } from "@/types/requests/TargetRequest";
import { TargetRepository } from "@/repositories/TargetRepository";
import { fDayDate } from "@/utils/formatDate";

const months = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

function TargetTable() {
  const lastItem = 12 - 1;
  const [isShowAddModal, setIsShowAddModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState<{
    month: Date | string;
    target: number;
  }>();

  const [currentYear, setCurrentYear] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState("");

  const [tableData, setTableData] = useState<any>([]);

  const methods = useForm({
    resolver: yupResolver(targetSchema),
    defaultValues: targetField(),
    mode: "onSubmit",
  });

  const {
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: ITargetRequest) => {
    try {
      await TargetRepository.AddTarget(data);
      setIsShowAddModal(false);
      reset();
    } catch (e: any) {
      console.log(e);
    }
  };

  const handleAddClick = (month: string) => {
    setSelectedMonth(month); // Set the selected month
    setValue(
      "targetDate",
      new Date(`${currentYear.getFullYear()}-${months.indexOf(month) + 1}-01`)
    ); // Set form value for targetDate
    setIsShowAddModal(true);
  };

  const handleEditClick = (month: string) => {
    setSelectedMonth(month); // Set the selected month
    setValue(
      "targetDate",
      new Date(`${currentYear.getFullYear()}-${months.indexOf(month) + 1}-01`)
    ); // Set form value for targetDate
    setIsShowEditModal(true);
  };

  useEffect(() => {
    const updatedTableData = months.map((month, index) => {
      const targetMonth = index + 1;
      const target = targetList.find(
        (item) => new Date(item.targetDate).getMonth() + 1 === targetMonth
      );
      return {
        month,
        target: target ? target.targetValue : 0,
      };
    });
    setTableData(updatedTableData);
  }, [currentYear]);

  return (
    <div className="border rounded-md p-6">
      <table className="table-auto w-full rounded-md">
        <thead className="text-left">
          <tr>
            <th className="pb-2">Bulan</th>
            <th className="pb-2">Jumlah Target</th>
            <th className="pb-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((content: any, index: any) => (
            <tr key={index} className="border-t lining-nums">
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
                    <button onClick={() => handleEditClick(content.month)}>
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
                    <button onClick={() => handleAddClick(content.month)}>
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
        title="Tambah Target"
        buttonText="Tambah"
        onClick={handleSubmit(onSubmit)}
      >
        <FormProvider {...methods}>
          <TargetForm onSubmit={handleSubmit(onSubmit)} />
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
          <TargetForm onSubmit={handleSubmit(onSubmit)} />
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
