import { expenseField, expenseSchema } from "@/data/ExpenseData";
import { ExpenseRepository } from "@/repositories/ExpenseRepository";
import { IExpenseListResponse } from "@/types/responses/ExpenseResponse";
import { showToast } from "@/utils/toast";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { LoaderCircle } from "lucide-react";
import { fDayDate } from "@/utils/formatDate";
import ExpenseCard from "../../organisms/cards/ExpenseCard";
import ModalCard from "../../organisms/cards/ModalCard";
import ExpenseForm from "../../organisms/forms/ExpenseForm";
import { IExpenseRequest } from "@/types/requests/ExpenseRequest";

type IProps = {
  selected: Date[];
  isShowAddModal: boolean;
  setIsShowAddModal: (value: boolean) => void;
};

function ExpenseMonthly({
  selected,
  isShowAddModal,
  setIsShowAddModal,
}: IProps) {
  const [starDate, endDate] = selected;
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
      const formData = new FormData();
      formData.append("expenseDate", data.expenseDate.toISOString());
      formData.append("expenseTotal", data.expenseTotal.toString());
      formData.append("expenseCategory", data.expenseCategory);

      data.details.forEach((detail, index) => {
        formData.append(`details[${index}][description]`, detail.description);
        if (!detail.value) return;
        formData.append(`details[${index}][value]`, detail.value.toString());
      });

      formData.append("file", expenseFile);

      await ExpenseRepository.AddExpense(formData);

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

  const getData = async () => {
    try {
      setIsLoadingData(true);
      const res = await ExpenseRepository.GetExpenseMonthlyList({
        startDate: starDate,
        endDate: endDate,
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
    if (selected) {
      getData();
    }
  }, [selected, isReload]);

  useEffect(() => {
    const total = watchedDetails.reduce(
      (sum, item) => sum + Number(item.value),
      0
    );

    setValue("expenseTotal", total);
  }, [watchedDetails]);

  useEffect(() => {
    setValue("expenseCategory", "Bulanan");
  }, []);

  return (
    <div>
      {isLoadingData ? (
        <div className="w-full flex justify-center pt-20">
          <LoaderCircle size={40} className="animate-spin text-teal-500" />
        </div>
      ) : (
        <div className="flex flex-col lg:grid grid-cols-2 gap-x-10 gap-y-5">
          {data?.length === 0 || data === null
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
    </div>
  );
}

export default ExpenseMonthly;
