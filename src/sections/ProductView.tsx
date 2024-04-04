"use client";

import { productList } from "@/_dummyData/product";
import IconButton from "@/components/customize/atoms/button/IconButton";
import SearchField from "@/components/customize/molecules/input-field/SearchField";
import Pagination from "@/components/customize/molecules/pagination/Pagination";
import ProductForm from "@/components/customize/organisms/forms/ProductForm";
import ModalCard from "@/components/customize/organisms/modal-card/ModalCard";
import ProductCard from "@/components/customize/organisms/product-card/ProductCard";
import { CirclePlus } from "lucide-react";
import React, { useState } from "react";

function ProductView() {
  const [isShowAddModal, setIsShowAddModal] = useState(false);
  const [currPage, setCurrPage] = useState<number>(1);

  return (
    <div className="px-[116px] py-[112px]">
      <div className="flex justify-between mb-6">
        <SearchField name="productSearch" />

        <div className="flex gap-6">
          <IconButton
            icon={<CirclePlus />}
            text="Add"
            type="filled"
            onClick={() => setIsShowAddModal(true)}
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-x-10 gap-y-5">
        {productList.map((product) => (
          <ProductCard key={product.id} data={product} />
        ))}
      </div>

      <div className="flex justify-center mt-14">
        <Pagination
          current={currPage}
          setCurrent={setCurrPage}
          total={Math.ceil(productList.length / 12)}
        />
      </div>

      <ModalCard
        open={isShowAddModal}
        setOpen={setIsShowAddModal}
        title="Add Product"
        buttonText="Add"
      >
        <ProductForm />
      </ModalCard>
    </div>
  );
}

export default ProductView;
