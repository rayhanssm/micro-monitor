import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Pencil, Trash2 } from "lucide-react";
import {
  IExpenseListResponse,
  IExpenseResponse,
} from "@/types/responses/ExpenseResponse";
import { fTime } from "@/utils/formatDate";
import { fNum } from "@/utils/formatNumber";
import ModalCard from "./ModalCard";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import ExpenseForm from "../forms/ExpenseForm";
import { IExpenseRequest } from "@/types/requests/ExpenseRequest";
import { ExpenseRepository } from "@/repositories/ExpenseRepository";
import { yupResolver } from "@hookform/resolvers/yup";
import { expenseField, expenseSchema } from "@/data/ExpenseData";
import { expenseDetail } from "@/_dummyData/expense";
import ExpenseAccordion from "../../atoms/ExpenseAccordion";

type IProps = {
  data: IExpenseListResponse;
  isReload: any;
  setIsReload: any;
};

function ExpenseCard({ data, isReload, setIsReload }: IProps) {
  return (
    <div className="flex flex-col gap-6 p-4 border rounded-xl shadow-md">
      {data.expenses.map((e) => (
        <ExpenseAccordion
          key={e.expenseID}
          detailData={e}
          isReload={isReload}
          setIsReload={setIsReload}
        />
      ))}
    </div>
  );
}

export default ExpenseCard;
