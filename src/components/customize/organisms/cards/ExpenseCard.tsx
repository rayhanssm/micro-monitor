import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Pencil, Trash2 } from "lucide-react";
import { IExpenseResponseList } from "@/types/responses/ExpenseResponse";
import { fTime } from "@/utils/formatDate";
import { fNum } from "@/utils/formatNumber";
import ModalCard from "./ModalCard";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import ExpenseForm from "../forms/ExpenseForm";
import { IExpenseRequest } from "@/types/requests/ExpenseRequest";
import { ExpenseRepository } from "@/repositories/ExpenseRepository";
import { yupResolver } from "@hookform/resolvers/yup";
import { expenseField, expenseSchema } from "@/data/ExpenseData";
import { expenseDetail } from "@/_dummyData/expense";

type IProps = {
  data: IExpenseResponseList;
};

function ExpenseCard({ data }: IProps) {
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
    formState: { isSubmitting },
  } = methods;

  const handleClick = () => {
    setOpen(!open);
  };

  const onEdit = async (data: IExpenseRequest) => {
    try {
      if (!selectedExpenseID) return;
      await ExpenseRepository.EditExpense(data, selectedExpenseID);
    } catch (e: any) {
      console.log(e);
      console.log(data);
    }
  };

  const onDelete = async (id: string) => {
    try {
      if (!id) return;
      await ExpenseRepository.DeleteExpense(id);
      setIsShowDelete(false);
    } catch (e: any) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!expenseDetail || !isShowEdit) return;
    const details = expenseDetail.details.map((d) => ({
      description: d.description,
      value: d.value,
    }));

    reset({
      details: details,
      expenseDate: new Date(expenseDetail.expenseDate),
      expenseTotal: expenseDetail.expenseTotal,
    });
  }, [expenseDetail, isShowEdit]);

  return (
    <div className="flex flex-col gap-6 p-4 border rounded-xl shadow-md">
      {data.expenses.map((e) => (
        <div key={e.expenseID}>
          <div className="flex items-center justify-between w-full">
            <button className="flex items-center pointer" onClick={handleClick}>
              {open ? <ChevronUp /> : <ChevronDown />}
              <div className="flex items-center gap-3 ml-2">
                <div className="px-2 py-1 rounded-xl text-white text-base font-bold lining-nums bg-teal-700">
                  #{e.expenseID}
                </div>
                <p
                  className="text-sm lining-nums text-slate-500"
                  suppressHydrationWarning
                >
                  {fTime(e.expenseDate)}
                </p>
              </div>
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setIsShowEdit(true);
                  setselectedExpenseID(e.expenseID);
                }}
              >
                <Pencil size={20} color="#0F766E" />
              </button>
              <button
                onClick={() => {
                  setIsShowDelete(true);
                  setselectedExpenseID(e.expenseID);
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
                  {e.details.map((e, index) => (
                    <tr key={index} className="border-b">
                      <td>{e.description}</td>
                      <td className="text-right">IDR {fNum(e.value)}</td>
                    </tr>
                  ))}
                  <tr className="font-bold">
                    <td>Total</td>
                    <td className="text-right">{fNum(e.expenseTotal)}</td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </div>
      ))}
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

export default ExpenseCard;
