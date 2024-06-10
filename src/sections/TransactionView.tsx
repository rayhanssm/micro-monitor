"use client";

import { productList } from "@/_dummyData/product";
import { transactionList } from "@/_dummyData/transaction";
import Button from "@/components/customize/atoms/button/Button";
import IconButton from "@/components/customize/atoms/button/IconButton";
import Checkbox from "@/components/customize/atoms/Checkbox";
import RangeDatePicker from "@/components/customize/molecules/date-picker/RangeDatePicker";
import CheckboxField from "@/components/customize/molecules/input-field/CheckboxField";
import SearchField from "@/components/customize/molecules/input-field/SearchField";
import ModalCard from "@/components/customize/organisms/cards/ModalCard";
import TransactionCard from "@/components/customize/organisms/cards/TransactionCard";
import TransactionForm from "@/components/customize/organisms/forms/TransactionForm";
import TransactionTable from "@/components/customize/organisms/tables/TransactionTable";
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
import { FormProvider, useForm } from "react-hook-form";

function TransactionView() {
  const [selected, setSelected] = useState<DateRange>();
  const [isShowAddModal, setIsShowAddModal] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const methods = useForm({
    resolver: yupResolver(transactionSchema),
    defaultValues: transactionField(),
    mode: "onSubmit",
  });

  const { handleSubmit, reset, control } = methods;

  const onSubmit = async (data: ITransactionRequest) => {
    try {
      await TransactionRepository.AddTransaction(data);
      setIsShowAddModal(false);
      reset();
    } catch (e: any) {
      console.log(e);
    }
  };

  const handleProductChange = (product: any) => {
    setSelectedProducts((prev: any) => {
      if (prev.some((p: any) => p.id === product.id)) {
        return prev.filter((p: any) => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  useEffect(() => {
    const to = new Date();
    const from = addDays(to, -7);

    setSelected({ from: from, to: to });
  }, []);

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
            <p className="font-semibold text-2xl mb-4 lining-nums">
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
            {productList.map((product, index) => (
              <Checkbox
                key={product.id}
                label={product.name}
                description={"IDR " + fNum(product.price)}
                checked={selectedProducts.some(
                  (p: IProductListResponse) => p.id === product.id
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
              {/* <DevTool control={control} /> */}
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

      {/* TODO: delete later */}
      {/* <TransactionTable
        isShowAddModal={isShowAddModal}
        setIsShowAddModal={setIsShowAddModal}
      /> */}
    </div>
  );
}

export default TransactionView;
