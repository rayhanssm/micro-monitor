"use client";

import { productList } from "@/_dummyData/product";
import IconButton from "@/components/customize/atoms/button/IconButton";
import SearchField from "@/components/customize/molecules/input-field/SearchField";
import Pagination from "@/components/customize/molecules/pagination/Pagination";
import ProductForm from "@/components/customize/organisms/forms/ProductForm";
import ModalCard from "@/components/customize/organisms/cards/ModalCard";
import ProductCard from "@/components/customize/organisms/cards/ProductCard";
import { CirclePlus, LoaderCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { productField, productSchema } from "@/data/ProductData";
import { IProductRequest } from "@/types/requests/ProductRequest";
import { ProductRepository } from "@/repositories/ProductRepository";
import { IProductListResponse } from "@/types/responses/ProductResponse";
import { DevTool } from "@hookform/devtools";

function ProductView() {
  const [isShowAddModal, setIsShowAddModal] = useState(false);
  const dataLength = productList.length;
  const [totalData, setTotalData] = useState(0);
  // const pageCount = Math.ceil(dataLength / 12);
  const [currPage, setCurrPage] = useState<number>(1);
  const [searchText, setSearchText] = useState("");
  const [isLoadingData, setIsLoadingData] = useState(false);

  const [data, setData] = useState<IProductListResponse[] | null>([]);
  const pageCount = Math.ceil(dataLength / 12);

  const methods = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: productField(),
    mode: "onSubmit",
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: IProductRequest) => {
    try {
      await ProductRepository.AddProduct(data);
      setIsShowAddModal(false);
      reset();
    } catch (e: any) {
      console.log(e);
    }
  };

  const getData = async () => {
    try {
      setIsLoadingData(true);
      const res = await ProductRepository.GetProductList({
        size: 12,
        page: currPage,
        name: searchText,
      });
      setData(res.data.data);
      setTotalData(res.data.totalData);
      setIsLoadingData(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    getData();
  }, [searchText, currPage]);

  return (
    <div className="px-[116px] py-[112px]">
      <div className="flex justify-between mb-6">
        <SearchField name="productSearch" setSearchText={setSearchText} />

        <div className="flex gap-6">
          <IconButton
            icon={<CirclePlus />}
            text="Tambah"
            type="filled"
            onClick={() => setIsShowAddModal(true)}
          />
        </div>
      </div>

      {isLoadingData ? (
        <div className="w-full flex justify-center pt-20">
          <LoaderCircle size={40} className="animate-spin text-teal-500" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-x-10 gap-y-5">
            {productList.map((product) => (
              <ProductCard key={product.productId} productData={product} />
            ))}
          </div>

          <div className="flex justify-center mt-14">
            <Pagination
              pageCount={pageCount}
              currPage={currPage}
              setCurrPage={setCurrPage}
            />
          </div>
        </>
      )}

      <ModalCard
        open={isShowAddModal}
        setOpen={setIsShowAddModal}
        title="Tambah Produk"
        buttonText={isSubmitting ? "Loading..." : "Tambah"}
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
