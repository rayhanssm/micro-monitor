"use client";

import { IProductListResponse } from "@/types/responses/ProductResponse";
import { fCurrency, fNum } from "@/utils/formatNumber";
import { Pencil, Trash2 } from "lucide-react";
import React, { useState } from "react";
import ModalCard from "./ModalCard";
import ProductForm from "../forms/ProductForm";

type IProps = {
  data: IProductListResponse;
};

function ProductCard({ data }: IProps) {
  const [isShowEditModal, setIsShowEditModal] = useState<boolean>(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);
  const [deleteItem, setDeleteItem] = useState<string>();

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
            <button onClick={() => setIsShowEditModal(true)}>
              <Pencil size={16} color="#0F766E" />
            </button>
            <button
              onClick={() => {
                setDeleteItem(data.name);
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
        title="Edit Expense"
        buttonText="Edit"
      >
        <ProductForm onSubmit={() => {}} />
      </ModalCard>

      {/* Delete product modal */}
      <ModalCard
        open={isShowDeleteModal}
        setOpen={setIsShowDeleteModal}
        deleteTitle={deleteItem}
      />
    </div>
  );
}

export default ProductCard;
