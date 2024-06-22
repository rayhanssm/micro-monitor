"use client";

import { IProductListResponse } from "@/types/responses/ProductResponse";
import { fCurrency } from "@/utils/formatNumber";
import { Pencil, Trash2 } from "lucide-react";
import React, { useState } from "react";
import ModalCard from "./ModalCard";
import ProductForm from "../forms/ProductForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { IProductRequest } from "@/types/requests/ProductRequest";
import { FormProvider, useForm } from "react-hook-form";
import { ProductRepository } from "@/repositories/ProductRepository";
import { IStaffListResponse } from "@/types/responses/AuthResponse";
import { staffEditSchema, staffSchema } from "@/data/AuthData";
import { AuthRepository } from "@/repositories/AuthRepository";
import { IStaffEditRequest } from "@/types/requests/AuthRequest";
import StaffEditForm from "../forms/StaffEditForm";

type IProps = {
  staffData: IStaffListResponse;
};

function StaffCard({ staffData }: IProps) {
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

  const { handleSubmit } = methods;

  const onSubmit = async (data: IStaffEditRequest) => {
    try {
      if (!staffData.userID) return;
      await AuthRepository.EditStaff(data, staffData.userID);
      setIsShowEditModal(false);
    } catch (e: any) {
      console.log(e);
      console.log(data);
    }
  };

  const onDelete = async (id: string) => {
    try {
      if (!id) return;
      await ProductRepository.DeleteProduct(id);
      setIsShowDeleteModal(false);
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <div className="p-4 border rounded-md shadow-md min-w-10">
      <div className="flex flex-col gap-1">
        <div className="flex justify-between">
          <p className="text-sm font-semibold">{staffData.userName}</p>
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
        title="Edit Staff"
        buttonText="Edit"
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
