"use client";

import { CirclePlus, LoaderCircle, Pencil, Trash2 } from "lucide-react";
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
import { ITargetListResponse } from "@/types/responses/TargetResponse";
import YearPicker from "../../molecules/date-picker/YearPicker";
import { showToast } from "@/utils/toast";
import { ToastContainer } from "react-toastify";

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

  const [data, setData] = useState<ITargetListResponse[]>([]);

  const [isShowAddModal, setIsShowAddModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState<{
    targetID: string;
    targetDate: Date | string;
    targetValue: number;
  }>();

  const [selectedId, setSelectedId] = useState("");

  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isReload, setIsReload] = useState(false);

  const [currentYear, setCurrentYear] = useState(
    new Date(new Date().getFullYear(), 0, 1)
  );
  // const [selectedMonth, setSelectedMonth] = useState("");

  const [tableData, setTableData] = useState<ITargetListResponse[]>([]);

  const methods = useForm({
    resolver: yupResolver(targetSchema),
    defaultValues: targetField(),
    mode: "onSubmit",
  });

  const {
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: ITargetRequest) => {
    try {
      await TargetRepository.AddTarget(data);
      setIsShowAddModal(false);
      reset();
      setIsReload(!isReload);
      showToast("Target berhasil ditambahkan", "success");
    } catch (error: any) {
      showToast(
        error.response?.data.error ? error.response.data.error : error.message,
        "error"
      );
    }
  };

  // TODO: edit target error, add target on january added january on prev year, tp lainnya aman?
  const onEdit = async (data: ITargetRequest) => {
    try {
      if (!selectedId) return;
      await TargetRepository.EditTarget(data, selectedId);
      setIsShowEditModal(false);
      reset();
      setIsReload(!isReload);
      showToast("Target berhasil diubah", "success");
    } catch (error: any) {
      showToast(
        error.response?.data.error ? error.response.data.error : error.message,
        "error"
      );
    }
  };

  const onDelete = async (id: string | undefined) => {
    try {
      if (!id) return;
      await TargetRepository.DeleteTarget(id);
      setIsShowDeleteModal(false);
      setIsReload(!isReload);
      reset();
      showToast("Target berhasil dihapus", "success");
    } catch (error: any) {
      showToast(
        error.response?.data.error ? error.response.data.error : error.message,
        "error"
      );
    }
  };

  const handleAddClick = (month: string) => {
    // setSelectedMonth(month);
    const targetDate = new Date(
      currentYear.getFullYear(),
      months.indexOf(month),
      1
    );
    setValue("targetDate", targetDate);
    setIsShowAddModal(true);
  };

  const handleEditClick = (month: string) => {
    // setSelectedMonth(month);
    const targetDate = new Date(
      currentYear.getFullYear(),
      months.indexOf(month),
      1
    );
    setValue("targetDate", targetDate);
    setIsShowEditModal(true);
  };

  const getData = async () => {
    try {
      setIsLoadingData(true);
      const res = await TargetRepository.GetTargetList({
        year: new Date(currentYear.getFullYear(), 0, 2),
      });
      setData(res.data.data);
      setIsLoadingData(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    getData();
  }, [isReload, currentYear]);

  useEffect(() => {
    const updatedTableData = months.map((targetDate, index) => {
      const targetMonth = index + 1;
      const value = data?.find(
        (item) => new Date(item.targetDate).getMonth() + 1 === targetMonth
      );
      return {
        targetID: value ? value.targetID : "",
        targetDate,
        targetValue: value ? value.targetValue : 0,
      };
    });
    setTableData(updatedTableData);
  }, [isReload, currentYear, data]);

  return (
    <>
      <div className="mb-6 flex justify-end">
        <YearPicker
          selectedYear={currentYear}
          setSelectedYear={setCurrentYear}
        />
      </div>
      <div className="border rounded-md p-6">
        {isLoadingData ? (
          <div className="w-full flex justify-center pt-20">
            <LoaderCircle size={40} className="animate-spin text-teal-500" />
          </div>
        ) : (
          <table className="table-auto w-full rounded-md">
            <thead className="text-left">
              <tr>
                <th className="pb-2">Bulan</th>
                <th className="pb-2">Jumlah Target</th>
                <th className="pb-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((content: ITargetListResponse, index: any) => (
                <tr key={index} className="border-t lining-nums">
                  <td
                    className={`pt-2.5 ${
                      index === lastItem ? "pb-0" : "pb-2.5"
                    }`}
                  >
                    {content.targetDate.toString()}
                  </td>
                  <td
                    className={`pt-2.5 ${
                      index === lastItem ? "pb-0" : "pb-2.5"
                    }`}
                  >
                    {content.targetValue ? fCurrency(content.targetValue) : "-"}
                  </td>
                  <td
                    className={`pt-2.5 ${
                      index === lastItem ? "pb-0" : "pb-2.5"
                    }`}
                  >
                    {content.targetValue ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            handleEditClick(content.targetDate.toString());
                            setSelectedId(content.targetID);
                          }}
                        >
                          <Pencil size={20} color="#0F766E" />
                        </button>
                        <button
                          onClick={() => {
                            setIsShowDeleteModal(true);
                            setDeleteItem(content);
                          }}
                        >
                          <Trash2 size={20} color="#0F766E" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex">
                        <button
                          onClick={() =>
                            handleAddClick(content.targetDate.toString())
                          }
                        >
                          <CirclePlus size={20} color="#0F766E" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Add target modal */}
        <ModalCard
          open={isShowAddModal}
          setOpen={setIsShowAddModal}
          title="Tambah Target"
          buttonText={isSubmitting ? "Memuat..." : "Tambah"}
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
          title="Ubah Target"
          buttonText={isSubmitting ? "Memuat..." : "Ubah"}
        >
          <FormProvider {...methods}>
            <TargetForm onSubmit={handleSubmit(onEdit)} />
          </FormProvider>
        </ModalCard>

        {/* Delete target modal */}
        <ModalCard
          open={isShowDeleteModal}
          setOpen={setIsShowDeleteModal}
          deleteTitle={"target " + deleteItem?.targetDate}
          onDelete={() => onDelete(deleteItem?.targetID)}
        />

        <ToastContainer />
      </div>
    </>
  );
}

export default TargetTable;
