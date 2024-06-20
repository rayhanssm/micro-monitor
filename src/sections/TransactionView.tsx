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
import { transactionField, transactionSchema } from "@/data/TransactionData";
import { TransactionRepository } from "@/repositories/TransactionRepository";
import { ITransactionRequest } from "@/types/requests/TransactionRequest";
import { IProductListResponse } from "@/types/responses/ProductResponse";
import { fDayDate } from "@/utils/formatDate";
import { fNum } from "@/utils/formatNumber";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDays } from "date-fns";
import { CirclePlus, Download } from "lucide-react";
import React, { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";

function TransactionView() {
  const [selected, setSelected] = useState<DateRange>();
  const [isShowAddModal, setIsShowAddModal] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [totalTransaction, setTotalTransaction] = useState(0);

  const methods = useForm({
    resolver: yupResolver(transactionSchema),
    defaultValues: transactionField(),
    mode: "onSubmit",
  });

  const { handleSubmit, reset, control, setValue, getValues, watch } = methods;

  const { fields } = useFieldArray({
    control,
    name: "products",
  });

  const onSubmit = async (data: ITransactionRequest) => {
    try {
      if (selectedProducts.length === 0) return;
      await TransactionRepository.AddTransaction(data);
      setIsShowAddModal(false);
      reset();
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
        quantity: 1,
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
    console.log(selectedProducts);
    console.log(fields);

    if (selectedProducts.length === 0) {
      reset();
    }
  }, [selectedProducts]);

  const calculateTotalTransaction = () => {
    const values = getValues("products");
    const total = values.reduce(
      (acc, product) => acc + product.value * product.quantity,
      0
    );
    setValue("transactionTotal", total);
    setTotalTransaction(total);
  };

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name?.startsWith("products") && type === "change") {
        calculateTotalTransaction();
      }
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <div className="px-[116px] py-[112px]">
      <div className="flex justify-between mb-6">
        <SearchField name="transactionSearch" setSearchText={() => {}} />

        <div className="flex gap-6">
          <RangeDatePicker selected={selected} setSelected={setSelected} />
          <IconButton
            icon={<Download />}
            text="Ekspor ke Excel"
            type="outlined"
          />
          <IconButton
            icon={<CirclePlus />}
            text="Tambah"
            type="filled"
            onClick={() => setIsShowAddModal(true)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-10 gap-y-5">
        {transactionList.map((data, index) => (
          <div key={index}>
            <p
              className="font-semibold text-2xl mb-4 lining-nums"
              suppressHydrationWarning
            >
              {fDayDate(data.date)}
            </p>
            <TransactionCard data={data} />
          </div>
        ))}
      </div>

      {/* Add transaction modal */}
      <ModalCard
        open={isShowAddModal}
        setOpen={setIsShowAddModal}
        title="Tambah Transaksi"
        onClick={handleSubmit(onSubmit)}
        maxWidth="max-w-2xl"
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2 overflow-y-scroll max-h-80 w-full">
            <SearchField name="productSearch" setSearchText={() => {}} />
            {productList.map((product) => (
              <Checkbox
                key={product.productID}
                label={product.productName}
                description={"IDR " + fNum(product.productPrice)}
                checked={selectedProducts.some(
                  (p: IProductListResponse) => p.productID === product.productID
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
                totalTransaction={totalTransaction}
              />
              <DevTool control={control} />
            </FormProvider>
            <div className="flex gap-2 justify-end">
              <Button
                text="Batal"
                btnStyle="outlined"
                additionClassname="w-full"
                onClick={() => setIsShowAddModal(false)}
              />
              <Button
                text="Tambah"
                btnStyle="filled"
                additionClassname="w-full"
                onClick={handleSubmit(onSubmit)}
              />
            </div>
          </div>
        </div>
      </ModalCard>
    </div>
  );
}

export default TransactionView;
