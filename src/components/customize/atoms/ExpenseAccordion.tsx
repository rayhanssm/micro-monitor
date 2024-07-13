import { expenseField, expenseSchema } from "@/data/ExpenseData";
import { ExpenseRepository } from "@/repositories/ExpenseRepository";
import { IExpenseRequest } from "@/types/requests/ExpenseRequest";
import { IExpenseResponse } from "@/types/responses/ExpenseResponse";
import { fTime } from "@/utils/formatDate";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  ChevronDown,
  ChevronUp,
  FileSearch,
  Pencil,
  Trash2,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import ModalCard from "../organisms/cards/ModalCard";
import ExpenseForm from "../organisms/forms/ExpenseForm";
import { fNum } from "@/utils/formatNumber";
import { showToast } from "@/utils/toast";

type IProps = {
  detailData: IExpenseResponse;
  isReload: any;
  setIsReload: any;
};

function ExpenseAccordion({ detailData, isReload, setIsReload }: IProps) {
  const [open, setOpen] = useState(false);
  const [selectedExpenseID, setselectedExpenseID] = useState("");
  const [isShowEdit, setIsShowEdit] = useState(false);
  const [isShowDelete, setIsShowDelete] = useState(false);
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
    setValue,
    formState: { isSubmitting },
  } = methods;

  const watchedDetails = useWatch({
    control,
    name: "details",
  });

  const handleClick = () => {
    setOpen(!open);
  };

  const onEdit = async (data: IExpenseRequest) => {
    try {
      if (!selectedExpenseID) return;
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

      await ExpenseRepository.EditExpense(formData, selectedExpenseID);
      setIsShowEdit(false);
      setIsReload(!isReload);
      showToast("Pengeluaran berhasil diubah", "success");
    } catch (error: any) {
      showToast(
        error.response?.data.error ? error.response.data.error : error.message,
        "error"
      );
    }
  };

  const onDelete = async (id: string) => {
    try {
      if (!id) return;
      await ExpenseRepository.DeleteExpense(id);
      setIsShowDelete(false);
      setIsReload(!isReload);
      showToast("Pengeluaran berhasil dihapus", "success");
    } catch (error: any) {
      showToast(
        error.response?.data.error ? error.response.data.error : error.message,
        "error"
      );
    }
  };

  useEffect(() => {
    if (detailData) {
      const details = detailData.details.map((d) => ({
        description: d.description,
        value: d.value,
      }));

      reset({
        details: details,
        expenseDate: detailData.expenseDate
          ? new Date(detailData.expenseDate)
          : new Date(),
        expenseCategory: detailData.expenseCategory,
      });
    }
  }, [detailData, isShowEdit]);

  useEffect(() => {
    if (!watchedDetails) return;

    const total = watchedDetails.reduce(
      (sum, item) => sum + Number(item.value),
      0
    );

    setValue("expenseTotal", total);
  }, [setValue, watchedDetails]);

  return (
    <div>
      <div className="flex items-center justify-between w-full">
        <button className="flex items-center pointer" onClick={handleClick}>
          {open ? <ChevronUp /> : <ChevronDown />}
          <div className="flex flex-col items-start lg:flex-row lg:items-center gap-3 ml-2">
            <div className="px-2 py-1 rounded-xl text-white text-base font-bold lining-nums bg-teal-700">
              {fTime(detailData.expenseDate)}
            </div>
          </div>
        </button>
        <div className="flex gap-2">
          <button
            onClick={() => {
              detailData.expenseFile
                ? window.open(detailData.expenseFile.toString(), "_blank")
                : showToast("Tidak ada dokumen", "error");
            }}
          >
            <FileSearch size={20} color="#0F766E" />
          </button>
          <button
            onClick={() => {
              setIsShowEdit(true);
              setselectedExpenseID(detailData.expenseID);
            }}
          >
            <Pencil size={20} color="#0F766E" />
          </button>
          <button
            onClick={() => {
              setIsShowDelete(true);
              setselectedExpenseID(detailData.expenseID);
            }}
          >
            <Trash2 size={20} color="#DC2626" />
          </button>
        </div>
      </div>
      <div
        className={`${
          open ? "p-4 mt-2 border" : ""
        } overflow-hidden transition-all duration-100 rounded-md`}
      >
        {open && (
          <table
            className={`table-auto w-full rounded-md text-base lining-nums font-medium`}
          >
            <tbody>
              {detailData.details.map((e, index) => (
                <tr key={index} className="border-b">
                  <td>{e.description}</td>
                  <td className="text-right">IDR {fNum(e.value)}</td>
                </tr>
              ))}
              <tr className="font-bold">
                <td>Total</td>
                <td className="text-right">{fNum(detailData.expenseTotal)}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>

      <ModalCard
        open={isShowEdit}
        setOpen={setIsShowEdit}
        title="Ubah Pengeluaran"
        buttonText={isSubmitting ? "Memuat..." : "Ubah"}
        onClick={handleSubmit(onEdit)}
      >
        <FormProvider {...methods}>
          <ExpenseForm
            onSubmit={handleSubmit(onEdit)}
            file={expenseFile}
            setFile={setExpenseFile}
          />
        </FormProvider>
      </ModalCard>

      <ModalCard
        open={isShowDelete}
        setOpen={setIsShowDelete}
        deleteTitle={selectedExpenseID}
        onDelete={() => onDelete(selectedExpenseID!)}
      />
    </div>
  );
}

export default ExpenseAccordion;
