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

type IProps = {
  productData: IProductListResponse;
};

function ProductCard({ productData }: IProps) {
  const [isShowEditModal, setIsShowEditModal] = useState<boolean>(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);
  const [deleteItem, setDeleteItem] = useState<{ id: string; name: string }>();

  const methods = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: {
      name: productData.name,
      price: productData.price,
      stock: productData.stock,
    },
    mode: "onChange",
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: IProductRequest) => {
    try {
      if (!productData.id) return;
      await ProductRepository.EditProduct(data, productData.id);
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
    <div className="p-4 border rounded-md shadow-md">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold">{productData.name}</p>
        <div className="flex justify-between">
          <p className="text-xs text-slate-500 font-medium lining-nums">
            {fCurrency(productData.price)}
          </p>
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
                setDeleteItem({ id: productData.id, name: productData.name });
                setIsShowDeleteModal(true);
              }}
            >
              <Trash2 size={16} color="#DC2626" />
            </button>
          </div>
        </div>
        <p className="text-xs text-slate-500 lining-nums">
          Stok: {productData.stock}
        </p>
      </div>

      {/* Edit product modal */}
      <ModalCard
        open={isShowEditModal}
        setOpen={setIsShowEditModal}
        title="Edit Produk"
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
