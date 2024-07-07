"use client";

import { productList } from "@/_dummyData/product";
import { transactionList } from "@/_dummyData/transaction";
import Button from "@/components/customize/atoms/button/Button";
import IconButton from "@/components/customize/atoms/button/IconButton";
import Checkbox from "@/components/customize/atoms/Checkbox";
import RangeDatePicker from "@/components/customize/molecules/date-picker/RangeDatePicker";
import SearchField from "@/components/customize/molecules/input-field/SearchField";
import ModalCard from "@/components/customize/organisms/cards/ModalCard";
import TransactionCard from "@/components/customize/organisms/cards/TransactionCard";
import TransactionForm from "@/components/customize/organisms/forms/TransactionForm";
import TransactionNoProductForm from "@/components/customize/organisms/forms/TransactionNoProductForm";
import { transactionField, transactionSchema } from "@/data/TransactionData";
import { ProductRepository } from "@/repositories/ProductRepository";
import { TransactionRepository } from "@/repositories/TransactionRepository";
import { ITransactionRequest } from "@/types/requests/TransactionRequest";
import { IProductListResponse } from "@/types/responses/ProductResponse";
import { ITransactionListResponse } from "@/types/responses/TransactionResponse";
import { fDayDate } from "@/utils/formatDate";
import { fNum } from "@/utils/formatNumber";
import { showToast } from "@/utils/toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDays } from "date-fns";
import { CirclePlus, LoaderCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { DateRange } from "react-day-picker";
import { FormProvider, useForm, useWatch } from "react-hook-form";

function TransactionView() {
  const [selected, setSelected] = useState<DateRange>();
  const [isShowAddModal, setIsShowAddModal] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);

  const [flagProduct, setFlagProduct] = useState(true);

  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isReload, setIsReload] = useState(false);
  const [data, setData] = useState<ITransactionListResponse[] | null>([]);
  const [productData, setProductData] = useState<IProductListResponse[] | null>(
    []
  );
  const [searchText, setSearchText] = useState("");

  const methods = useForm({
    resolver: yupResolver(transactionSchema),
    defaultValues: transactionField(),
    mode: "onSubmit",
  });

  const {
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: ITransactionRequest) => {
    try {
      if (selectedProducts.length === 0) return;
      await TransactionRepository.AddTransaction(data);
      setIsShowAddModal(false);
      reset();
      setSelectedProducts([]);
      setIsReload(!isReload);
    } catch (e: any) {
      showToast(e.message, 'error')
      console.log(e);
    }
  };

  const onSubmitNoProduct = async (data: ITransactionRequest) => {
    try {
      await TransactionRepository.AddTransaction(data);
      setIsShowAddModal(false);
      reset();
      setIsReload(!isReload);
    } catch (e: any) {
      console.log(e);
    }
  };

  const handleProductChange = (product: any) => {
    setSelectedProducts((prevSelectedProducts) => {
      const newSelectedProducts = [...prevSelectedProducts];
      const index = newSelectedProducts.findIndex(
        (p) => p.productID === product.productID
      );

      if (index === -1) {
        newSelectedProducts.push(product);
      } else {
        newSelectedProducts.splice(index, 1);
      }

      const newFields = newSelectedProducts.map((p) => ({
        productID: p.productID,
        quantity: p.quantity ? p.quantity : 1,
        value: p.productPrice,
      }));

      setValue("products", newFields);

      return newSelectedProducts;
    });
  };

  useEffect(() => {
    const to = new Date();
    const from = addDays(to, -7);

    setSelected({ from: from, to: to });
  }, []);

  useEffect(() => {
    if (selectedProducts.length === 0) {
      reset(transactionField());
    }
  }, [selectedProducts, reset]);

  useEffect(() => {
    const cookies = new Cookies();
    const flagProduct = cookies.get("flagProduct");

    setFlagProduct(flagProduct);
  }, [flagProduct]);

  const getData = async () => {
    try {
      setIsLoadingData(true);
      const res = await TransactionRepository.GetTransactionList({
        startDate: selected?.from,
        endDate: selected?.to,
      });
      setData(res.data.data);
      setIsLoadingData(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingData(false);
    }
  };

  const getProduct = async () => {
    try {
      const res = await ProductRepository.GetProductList({
        size: 25,
        // page: currPage,
        name: searchText,
      });
      setProductData(res.data.data);
      // setTotalData(res.data.totalData)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [selected, isReload]);

  useEffect(() => {
    getProduct();
  }, [searchText]);

  return (
    <div className="px-4 py-[112px] lg:px-[116px]">
      <div className="flex justify-between lg:justify-end mb-6">
        <div className="flex gap-6">
          <RangeDatePicker selected={selected} setSelected={setSelected} />
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
        <div className="flex flex-col lg:grid grid-cols-2 gap-x-10 gap-y-5">
          {data?.map((data, index) => (
            <div key={index}>
              <p
                className="font-semibold text-2xl mb-4 lining-nums"
                suppressHydrationWarning
              >
                {fDayDate(data.date)}
              </p>
              <FormProvider {...methods}>
                <TransactionCard
                  data={data}
                  isReload={isReload}
                  setIsReload={setIsReload}
                  productData={productData}
                />
              </FormProvider>
            </div>
          ))}
        </div>
      )}

      {/* Add transaction modal */}
      {flagProduct === true ? (
        <ModalCard
          open={isShowAddModal}
          setOpen={setIsShowAddModal}
          title="Tambah Transaksi"
          onClick={handleSubmit(onSubmit)}
          maxWidth="max-w-2xl"
        >
          <div className="flex flex-col lg:grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2 overflow-y-scroll max-h-80 w-full">
              <SearchField name="productSearch" setSearchText={setSearchText} />
              {productData?.map((product) => (
                <Checkbox
                  key={product.productID}
                  label={product.productName}
                  description={"IDR " + fNum(product.productPrice)}
                  checked={selectedProducts.some(
                    (p: IProductListResponse) =>
                      p.productID === product.productID
                  )}
                  onChange={() => handleProductChange(product)}
                />
              ))}
            </div>
            <div className="overflow-y-scroll max-h-80">
              <FormProvider {...methods}>
                <TransactionForm
                  onSubmit={handleSubmit(onSubmit)}
                  selectedProducts={selectedProducts}
                />
              </FormProvider>
              <div className="flex gap-2 justify-end">
                <Button
                  text="Batal"
                  btnStyle="outlined"
                  additionClassname="w-full"
                  onClick={() => setIsShowAddModal(false)}
                />
                <Button
                  text={isSubmitting ? "Loading..." : "Tambah"}
                  btnStyle="filled"
                  additionClassname="w-full"
                  onClick={handleSubmit(onSubmit)}
                />
              </div>
            </div>
          </div>
        </ModalCard>
      ) : (
        <ModalCard
          open={isShowAddModal}
          setOpen={setIsShowAddModal}
          title="Tambah Transaksi"
          buttonText={isSubmitting ? "Loading..." : "Tambah"}
          onClick={handleSubmit(onSubmitNoProduct)}
        >
          <FormProvider {...methods}>
            <TransactionNoProductForm
              onSubmit={handleSubmit(onSubmitNoProduct)}
            />
          </FormProvider>
        </ModalCard>
      )}
    </div>
  );
}

export default TransactionView;
