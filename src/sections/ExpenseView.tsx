"use client";

import { expenseList } from "@/_dummyData/expense";
import IconButton from "@/components/customize/atoms/button/IconButton";
import RangeDatePicker from "@/components/customize/molecules/date-picker/RangeDatePicker";
import ExpenseCard from "@/components/customize/organisms/cards/ExpenseCard";
import ModalCard from "@/components/customize/organisms/cards/ModalCard";
import ExpenseForm from "@/components/customize/organisms/forms/ExpenseForm";
import { expenseField, expenseSchema } from "@/data/ExpenseData";
import { ExpenseRepository } from "@/repositories/ExpenseRepository";
import { IExpenseRequest } from "@/types/requests/ExpenseRequest";
import { fDayDate } from "@/utils/formatDate";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDays } from "date-fns";
import { CirclePlus, Download } from "lucide-react";
import React, { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";

function ExpenseView() {
  const [selected, setSelected] = useState<DateRange>();
  const [isShowAddModal, setIsShowAddModal] = useState(false);
  const [data, setData] = useState(null);
  const [isLoadingData, setIsLoadingData] = useState(false);

  const methods = useForm({
    resolver: yupResolver(expenseSchema),
    defaultValues: expenseField(),
    mode: "onSubmit",
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = methods;

  const { append } = useFieldArray({ control, name: "details" });

  const onSubmit = async (data: IExpenseRequest) => {
    try {
      await ExpenseRepository.AddExpense(data);
      setIsShowAddModal(false);
      reset();
    } catch (e: any) {
      console.log(e);
    }
  };

  useEffect(() => {
    const to = new Date();
    const from = addDays(to, -7);

    setSelected({ from: from, to: to });
  }, []);

  // TODO: adjust expense list later
  // const getData = async () => {
  //   try {
  //     setIsLoadingData(true);
  //     const res = await ExpenseRepository.GetExpenseList({
  //       selected,
  //     });
  //     setData(res.data);
  //     setIsLoadingData(false);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setIsLoadingData(false);
  //   }
  // };

  // useEffect(() => {
  //   getData();
  // }, [selected]);

  return (
    <div className="px-[116px] py-[112px]">
      <div className="flex justify-end mb-6">
        <div className="flex gap-6">
          <RangeDatePicker selected={selected} setSelected={setSelected} />
          <IconButton
            icon={<CirclePlus />}
            text="Tambah"
            type="filled"
            onClick={() => {
              setIsShowAddModal(true);
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-10 gap-y-5">
        {expenseList.map((data, index) => (
          <div key={index}>
            <p
              className="font-semibold text-2xl mb-4 lining-nums"
              suppressHydrationWarning
            >
              {fDayDate(data.date)}
            </p>
            <ExpenseCard data={data} />
          </div>
        ))}
      </div>

      <ModalCard
        open={isShowAddModal}
        setOpen={setIsShowAddModal}
        title="Tambah Pengeluaran"
        buttonText={isSubmitting ? "Loading..." : "Tambah"}
        onClick={handleSubmit(onSubmit)}
      >
        <FormProvider {...methods}>
          <ExpenseForm onSubmit={handleSubmit(onSubmit)} />
        </FormProvider>
      </ModalCard>
    </div>
  );
}

export default ExpenseView;
