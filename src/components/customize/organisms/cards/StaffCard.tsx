"use client";

import { Pencil, Trash2 } from "lucide-react";
import React, { useState } from "react";
import ModalCard from "./ModalCard";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { IStaffListResponse } from "@/types/responses/AuthResponse";
import { staffEditSchema } from "@/data/AuthData";
import { AuthRepository } from "@/repositories/AuthRepository";
import { IStaffEditRequest } from "@/types/requests/AuthRequest";
import StaffEditForm from "../forms/StaffEditForm";
import { showToast } from "@/utils/toast";

type IProps = {
  staffData: IStaffListResponse;
  isReload: any;
  setIsReload: any;
};

function StaffCard({ staffData, isReload, setIsReload }: IProps) {
  const [isShowEditModal, setIsShowEditModal] = useState<boolean>(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);
  const [deleteItem, setDeleteItem] = useState<{ id: string; name: string }>();

  const methods = useForm({
    resolver: yupResolver(staffEditSchema),
    defaultValues: {
      userName: staffData.userName,
    },
    mode: "onChange",
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: IStaffEditRequest) => {
    try {
      if (!staffData.userID) return;
      await AuthRepository.EditStaff(data, staffData.userID);
      setIsShowEditModal(false);
      setIsReload(!isReload);
      showToast("Staf berhasil diubah", "success");
    } catch (error: any) {
      showToast(
        error.response?.data.error ? error.response.data.error : error.message,
        "error"
      );
    }
  };

  const onDelete = async (id: string) => {
    try {
      if (!id) return;
      await AuthRepository.DeleteStaff(id);
      setIsShowDeleteModal(false);
      setIsReload(!isReload);
      showToast("Staf berhasil dihapus", "success");
    } catch (error: any) {
      showToast(
        error.response?.data.error ? error.response.data.error : error.message,
        "error"
      );
    }
  };

  return (
    <div className="p-4 border rounded-md shadow-md min-w-10">
      <div className="flex flex-col gap-1">
        <div className="flex justify-between">
          <div className="flex gap-4 items-center">
            <div className="w-10 h-10 flex justify-center items-center rounded-full bg-teal-500 transition-all">
              <p className="text-white font-bold text-xl">
                {staffData?.userName ? staffData?.userName[0] : "-"}
              </p>
            </div>
            <p className="text-sm font-semibold">{staffData.userName}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setIsShowEditModal(true);
              }}
            >
              <Pencil size={16} color="#0F766E" />
            </button>
            <button
              onClick={() => {
                setDeleteItem({
                  id: staffData.userID,
                  name: staffData.userName,
                });
                setIsShowDeleteModal(true);
              }}
            >
              <Trash2 size={16} color="#DC2626" />
            </button>
          </div>
        </div>
      </div>

      {/* Edit product modal */}
      <ModalCard
        open={isShowEditModal}
        setOpen={setIsShowEditModal}
        title="Ubah Staff"
        buttonText={isSubmitting ? "Memuat..." : "Ubah"}
        onClick={handleSubmit(onSubmit)}
      >
        <FormProvider {...methods}>
          <StaffEditForm onSubmit={handleSubmit(onSubmit)} />
        </FormProvider>
      </ModalCard>

      {/* Delete product modal */}
      <ModalCard
        open={isShowDeleteModal}
        setOpen={setIsShowDeleteModal}
        deleteTitle={deleteItem?.name}
        onDelete={() => onDelete(deleteItem?.id!)}
      />
    </div>
  );
}

export default StaffCard;
