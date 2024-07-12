import ProductView from "@/sections/ProductView";
import React from "react";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "Produk",
};

function Product() {
  return (
    <>
      <ProductView />
      <ToastContainer />
    </>
  );
}

export default Product;
