import ExpenseView from "@/sections/ExpenseView";
import React from "react";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "Pengeluaran",
};

function Expense() {
  return (
    <>
      <ExpenseView />
      <ToastContainer />
    </>
  );
}

export default Expense;
