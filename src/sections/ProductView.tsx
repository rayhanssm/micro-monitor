"use client";

import { productList } from "@/_dummyData/product";
import IconButton from "@/components/customize/atoms/button/IconButton";
import SearchField from "@/components/customize/molecules/input-field/SearchField";
import Pagination from "@/components/customize/molecules/pagination/Pagination";
import ProductForm from "@/components/customize/organisms/forms/ProductForm";
import ModalCard from "@/components/customize/organisms/cards/ModalCard";
import ProductCard from "@/components/customize/organisms/cards/ProductCard";
import { CirclePlus } from "lucide-react";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { productField, productSchema } from "@/data/ProductData";
import { IProductRequest } from "@/types/requests/ProductRequest";

function ProductView() {
  const [isShowAddModal, setIsShowAddModal] = useState(false);
  const dataLength = productList.length;
  const pageCount = Math.ceil(dataLength / 12);

  const methods = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: productField(),
    mode: "onChange",
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: IProductRequest) => {
    console.log(data);
  };

  return (
    <div className="px-[116px] py-[112px]">
      <div className="flex justify-between mb-6">
        <SearchField name="productSearch" />

        <div className="flex gap-6">
          <IconButton
            icon={<CirclePlus />}
            text="Add"
            type="filled"
            onClick={() => setIsShowAddModal(true)}
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-x-10 gap-y-5">
        {productList.map((product) => (
          <ProductCard key={product.id} data={product} />
        ))}
      </div>

      <div className="flex justify-center mt-14">
        <Pagination pageCount={pageCount} />
      </div>

      <ModalCard
        open={isShowAddModal}
        setOpen={setIsShowAddModal}
        title="Add Product"
        buttonText="Add"
        onClick={handleSubmit(onSubmit)}
      >
        <FormProvider {...methods}>
          <ProductForm onSubmit={handleSubmit(onSubmit)} />
        </FormProvider>
      </ModalCard>
    </div>
  );
}

export default ProductView;
