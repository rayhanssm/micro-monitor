"use client";

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
import { showToast } from "@/utils/toast";

function ProductView() {
  const [isShowAddModal, setIsShowAddModal] = useState(false);
  const [totalData, setTotalData] = useState(0);
  const [currPage, setCurrPage] = useState<number>(1);
  const [searchText, setSearchText] = useState("");
  const [isLoadingData, setIsLoadingData] = useState(false);

  const [isReload, setIsReload] = useState(false);

  const [data, setData] = useState<IProductListResponse[] | null>([]);
  const pageCount = Math.ceil(totalData / 12);

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
      setIsReload(!isReload);
      showToast("Produk berhasil ditambahkan", "success");
    } catch (error: any) {
      showToast(
        error.response?.data.error ? error.response.data.error : error.message,
        "error"
      );
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
  }, [searchText, currPage, isReload]);

  return (
    <div className="px-4 py-[112px] lg:px-[116px]">
      <div className="flex flex-col gap-4 lg:flex-row lg:justify-between mb-6">
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
          <div className="flex flex-col lg:grid grid-cols-4 gap-x-10 gap-y-5">
            {data?.length === 0
              ? "Tidak ada data"
              : data?.map((product) => (
                  <ProductCard
                    key={product.productID}
                    productData={product}
                    isReload={isReload}
                    setIsReload={setIsReload}
                  />
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
        buttonText={isSubmitting ? "Memuat..." : "Tambah"}
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
