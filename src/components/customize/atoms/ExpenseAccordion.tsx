import { expenseField, expenseSchema } from "@/data/ExpenseData";
import { ExpenseRepository } from "@/repositories/ExpenseRepository";
import { IExpenseRequest } from "@/types/requests/ExpenseRequest";
import { IExpenseResponse } from "@/types/responses/ExpenseResponse";
import { fTime } from "@/utils/formatDate";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChevronDown, ChevronUp, Pencil, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import ModalCard from "../organisms/cards/ModalCard";
import ExpenseForm from "../organisms/forms/ExpenseForm";
import { fNum } from "@/utils/formatNumber";

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
      await ExpenseRepository.EditExpense(data, selectedExpenseID);
      setIsShowEdit(false);
      setIsReload(!isReload);
    } catch (e: any) {
      console.log(e);
    }
  };

  const onDelete = async (id: string) => {
    try {
      if (!id) return;
      await ExpenseRepository.DeleteExpense(id);
      setIsShowDelete(false);
      setIsReload(!isReload);
    } catch (e: any) {
      console.log(e);
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
          <div className="flex items-center gap-3 ml-2">
            <div className="px-2 py-1 rounded-xl text-white text-base font-bold lining-nums bg-teal-700">
              #{detailData.expenseID}
            </div>
            <p
              className="text-sm lining-nums text-slate-500"
              suppressHydrationWarning
            >
              {fTime(detailData.expenseDate)}
            </p>
          </div>
        </button>
        <div className="flex gap-2">
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
        title="Edit Pengeluaran"
        buttonText={isSubmitting ? "Loading..." : "Edit"}
        onClick={handleSubmit(onEdit)}
      >
        <FormProvider {...methods}>
          <ExpenseForm onSubmit={handleSubmit(onEdit)} />
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