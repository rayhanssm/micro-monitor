"use client";

import { IProductListResponse } from "@/types/responses/ProductResponse";
import { fCurrency } from "@/utils/formatNumber";
import { Pencil, Trash2 } from "lucide-react";
import React, { useState } from "react";
import ModalCard from "./ModalCard";
import ProductForm from "../forms/ProductForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { productSchema } from "@/data/ProductData";
import { IProductRequest } from "@/types/requests/ProductRequest";
import { FormProvider, useForm } from "react-hook-form";
import { ProductRepository } from "@/repositories/ProductRepository";
import { toast, ToastContainer } from "react-toastify";

type IProps = {
  data: IProductListResponse;
};

function ProductCard({ data }: IProps) {
  const [isShowEditModal, setIsShowEditModal] = useState<boolean>(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);
  const [deleteItem, setDeleteItem] = useState<{ id: string; name: string }>();

  const successToast = () => {
    toast("Product successfully updated!");
  };

  const errorToast = () => {
    toast("Error updating data");
  };

  const methods = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: {
      name: data.name,
      price: data.price,
    },
    mode: "onChange",
  });

  const { handleSubmit } = methods;

  const onSubmit = async (payload: IProductRequest) => {
    try {
      if (!data.id) return;
      await ProductRepository.EditProduct(payload, data.id);
      successToast();
    } catch (e: any) {
      errorToast();
      console.log(e);
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
    <div className="p-4 border rounded-md shadow-md">
      <div className="flex flex-col gap-1">
        <img
          src={data.image ? data.image : "/assets/product-placeholder.png"}
          className="h-[133px] rounded-md object-cover"
          draggable={false}
        />
        <p className="text-sm font-semibold">{data.name}</p>
        <div className="flex justify-between">
          <p className="text-xs text-slate-500 lining-nums">
            {fCurrency(data.price)}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setIsShowEditModal(true);
                successToast();
              }}
            >
              <Pencil size={16} color="#0F766E" />
            </button>
            <button
              onClick={() => {
                setDeleteItem({ id: data.id, name: data.name });
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
        title="Edit Product"
        buttonText="Edit"
        onClick={handleSubmit(onSubmit)}
      >
        <FormProvider {...methods}>
          <ProductForm onSubmit={handleSubmit(onSubmit)} />
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

export default ProductCard;