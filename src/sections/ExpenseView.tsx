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
import { IExpenseListResponse } from "@/types/responses/ExpenseResponse";
import { fDayDate } from "@/utils/formatDate";
import { showToast } from "@/utils/toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDays } from "date-fns";
import { CirclePlus, LoaderCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { ToastContainer } from "react-toastify";

function ExpenseView() {
  const [selected, setSelected] = useState<DateRange>();
  const [isShowAddModal, setIsShowAddModal] = useState(false);
  const [data, setData] = useState<IExpenseListResponse[] | null>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isReload, setIsReload] = useState(false);
  const [expenseFile, setExpenseFile] = useState<File | string>("");

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
    setValue,
  } = methods;

  const watchedDetails = useWatch({
    control,
    name: "details",
  });

  const onSubmit = async (data: IExpenseRequest) => {
    try {
      await ExpenseRepository.AddExpense(data);
      if (expenseFile && expenseFile instanceof File) {
        const formData = new FormData();
        console.log("Expense File:", expenseFile);
        formData.set("expenseFile", expenseFile);

        await ExpenseRepository.AddExpenseFile(formData);
      }
      setIsShowAddModal(false);
      reset();
      setIsReload(!isReload);
      showToast("Pengeluaran berhasil ditambahkan", "success");
    } catch (error: any) {
      showToast(
        error.response?.data.error ? error.response.data.error : error.message,
        "error"
      );
    }
  };
  // const onSubmit = async (data: IExpenseRequest) => {
  //   try {
  //     await ExpenseRepository.AddExpense(data);
  //     setIsShowAddModal(false);
  //     reset();
  //     setIsReload(!isReload);
  //     showToast("Pengeluaran berhasil ditambahkan", "success");
  //   } catch (error: any) {
  //     showToast(
  //       error.response?.data.error ? error.response.data.error : error.message,
  //       "error"
  //     );
  //   }
  // };

  useEffect(() => {
    const to = new Date();
    const from = addDays(to, -7);

    setSelected({ from: from, to: to });
  }, []);

  const getData = async () => {
    try {
      setIsLoadingData(true);
      const res = await ExpenseRepository.GetExpenseList({
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

  useEffect(() => {
    getData();
  }, [selected, isReload]);

  useEffect(() => {
    const total = watchedDetails.reduce(
      (sum, item) => sum + Number(item.value),
      0
    );

    setValue("expenseTotal", total);
  }, [watchedDetails]);

  return (
    <div className="px-4 py-[112px] lg:px-[116px]">
      <div className="flex justify-between lg:justify-end mb-6">
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

      {isLoadingData ? (
        <div className="w-full flex justify-center pt-20">
          <LoaderCircle size={40} className="animate-spin text-teal-500" />
        </div>
      ) : (
        <div className="flex flex-col lg:grid grid-cols-2 gap-x-10 gap-y-5">
          {data?.length === 0
            ? "Tidak ada data"
            : data?.map((data, index) => (
                <div key={index}>
                  <p
                    className="font-semibold text-2xl mb-4 lining-nums"
                    suppressHydrationWarning
                  >
                    {fDayDate(data.date)}
                  </p>
                  <ExpenseCard
                    data={data}
                    isReload={isReload}
                    setIsReload={setIsReload}
                  />
                </div>
              ))}
        </div>
      )}

      <ModalCard
        open={isShowAddModal}
        setOpen={setIsShowAddModal}
        title="Tambah Pengeluaran"
        buttonText={isSubmitting ? "Memuat..." : "Tambah"}
        onClick={handleSubmit(onSubmit)}
      >
        <FormProvider {...methods}>
          <ExpenseForm
            onSubmit={handleSubmit(onSubmit)}
            file={expenseFile}
            setFile={setExpenseFile}
          />
        </FormProvider>
      </ModalCard>

      <ToastContainer />
    </div>
  );
}

export default ExpenseView;
