import TransactionView from "@/sections/TransactionView";
import React from "react";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "Transaksi",
};

function Transaction() {
  return (
    <>
      <TransactionView />
      <ToastContainer />
    </>
  );
}

export default Transaction;
