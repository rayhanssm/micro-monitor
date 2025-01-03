"use client";

import { TransactionRepository } from "@/repositories/TransactionRepository";
import { ITransactionDetailResponse } from "@/types/responses/TransactionResponse";
import { fTime } from "@/utils/formatDate";
import { fNum } from "@/utils/formatNumber";
import { ChevronDown, ChevronUp, Pencil, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import ModalCard from "../organisms/cards/ModalCard";
import { ITransactionRequest } from "@/types/requests/TransactionRequest";
import SearchField from "../molecules/input-field/SearchField";
import Checkbox from "./Checkbox";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { transactionSchema } from "@/data/TransactionData";
import TransactionEditForm from "../organisms/forms/TransactionEditForm";
import { IProductListResponse } from "@/types/responses/ProductResponse";
import Button from "./button/Button";
import { Cookies } from "react-cookie";
import TransactionNoProductForm from "../organisms/forms/TransactionNoProductForm";
import { showToast } from "@/utils/toast";

type IProps = {
  data: ITransactionDetailResponse;
  isReload: any;
  setIsReload: any;
  productData: IProductListResponse[] | null;
  setSearchText: any;
};

function TransactionAccordion({
  data,
  isReload,
  setIsReload,
  productData,
  setSearchText,
}: IProps) {
  const [open, setOpen] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState("");
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);
  const [deleteItem, setDeleteItem] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<
    IProductListResponse[]
  >([]);

  const [totalTransaction, setTotalTransaction] = useState(0);
  const [transactionValue, setTransactionValue] = useState<number[]>([]);

  const [flagProduct, setFlagProduct] = useState(true);

  const methods = useForm({
    resolver: yupResolver(transactionSchema),
    mode: "onSubmit",
  });

  const {
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { isSubmitting },
  } = methods;

  const watchedProducts = useWatch({
    control,
    name: "products",
  });

  const handleClick = () => {
    setOpen(!open);
  };

  const handleProductChange = (product: IProductListResponse) => {
    setSelectedProducts((prevSelectedProducts) => {
      const newSelectedProducts = [...prevSelectedProducts];
      const index = newSelectedProducts.findIndex(
        (p) => p.productID === product.productID
      );

      if (index === -1) {
        newSelectedProducts.push({
          ...product,
          quantity: 1,
        });
      } else {
        newSelectedProducts.splice(index, 1);
      }

      const newFields = newSelectedProducts.map((p) => ({
        productID: p.productID,
        quantity: p.quantity || 1,
        value: p.productPrice * (p.quantity || 1),
      }));

      setValue("products", newFields);

      return newSelectedProducts;
    });
  };

  const onEdit = async (data: ITransactionRequest) => {
    try {
      if (!selectedTransactionId) return;
      await TransactionRepository.EditTransaction(data, selectedTransactionId);
      setIsShowEditModal(false);
      reset();
      setSelectedTransactionId("");
      setSelectedProducts([]);
      setIsReload(!isReload);
      showToast("Transaksi berhasil diubah", "success");
    } catch (error: any) {
      showToast(
        error.response?.data.error ? error.response.data.error : error.message,
        "error"
      );
    }
  };

  const onDelete = async (selectedTransactionId: string) => {
    try {
      if (!selectedTransactionId) return;
      await TransactionRepository.DeleteTransaction(selectedTransactionId);
      setIsShowDeleteModal(false);
      setIsReload(!isReload);
      showToast("Transaksi berhasil dihapus", "success");
    } catch (error: any) {
      showToast(
        error.response?.data.error ? error.response.data.error : error.message,
        "error"
      );
    }
  };

  const onSubmitNoProduct = async (data: ITransactionRequest) => {
    try {
      if (!selectedTransactionId) return;
      await TransactionRepository.EditTransaction(data, selectedTransactionId);
      setIsShowEditModal(false);
      reset();
      setIsReload(!isReload);
      showToast("Transaksi berhasil diubah", "success");
    } catch (error: any) {
      showToast(
        error.response?.data.error ? error.response.data.error : error.message,
        "error"
      );
    }
  };

  const calculateValues = () => {
    let total = 0;
    const values: number[] = [];

    selectedProducts?.forEach((product, index) => {
      const quantity = watchedProducts[index]?.quantity || 0;
      let productPrice = 0;

      if (product.productPrice) {
        productPrice = product.productPrice;
      } else if (watchedProducts[index]?.value && quantity > 0) {
        productPrice = watchedProducts[index].value / quantity;
      }

      let value = 0;

      value = productPrice * quantity;

      total += value;
      values[index] = value;

      if (watchedProducts[index]?.value !== value) {
        setValue(`products.${index}.value`, value);
      }
    });

    return { total, values };
  };

  useEffect(() => {
    if (!selectedProducts?.length) return;

    const { total, values } = calculateValues();

    if (transactionValue.join() !== values.join()) {
      setTransactionValue(values);
    }

    if (totalTransaction !== total) {
      setTotalTransaction(total);
      setValue("transactionTotal", total);
    }
  }, [
    watchedProducts,
    selectedProducts,
    setValue,
    totalTransaction,
    transactionValue,
  ]);

  useEffect(() => {
    if (isShowEditModal && selectedTransactionId) {
      const newSelectedProducts = data.products.map((product: any) => ({
        productID: product.productID,
        productName: product.productName,
        productPrice: product.value / product.quantity,
        productStock: 0,
      }));

      setSelectedProducts(newSelectedProducts);

      reset({
        transactionDate: new Date(data.transactionDate),
        transactionTotal: data.transactionTotal,
        products: data.products.map((product: any) => ({
          productID: product.productID,
          quantity: product.quantity,
          value: product.value,
        })),
      });
    }
  }, [selectedTransactionId, isShowEditModal, setValue]);

  useEffect(() => {
    const cookies = new Cookies();
    const flagProduct = cookies.get("flagProduct");

    setFlagProduct(flagProduct);
  }, [flagProduct]);

  return (
    <div>
      <div className="flex items-center justify-between w-full">
        <button className="flex items-center pointer" onClick={handleClick}>
          {open ? <ChevronUp /> : <ChevronDown />}
          <div className="flex flex-col items-start lg:flex-row lg:items-center gap-3 ml-2">
            <div className="px-2 py-1 rounded-xl text-white text-base font-bold lining-nums bg-teal-700">
              {fTime(data.transactionDate)} - {data.userName}
            </div>
          </div>
        </button>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setIsShowEditModal(true);
              setSelectedTransactionId(data.transactionID);
            }}
          >
            <Pencil size={20} color="#0F766E" />
          </button>
          <button
            onClick={() => {
              setIsShowDeleteModal(true);
              setSelectedTransactionId(data.transactionID);
              setDeleteItem(data.transactionID);
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
              {data.products.length > 0 &&
                data.products.map((p, index) => (
                  <tr key={index} className="border-b">
                    <td>{p.productName}</td>
                    <td className="text-slate-500">x{p.quantity}</td>
                    <td className="text-right">IDR {fNum(p.value)}</td>
                  </tr>
                ))}
              <tr className="font-bold">
                <td>Total</td>
                <td></td>
                <td className="text-right">{fNum(data.transactionTotal)}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>

      {/* Edit transaction modal */}
      <div>
        {flagProduct === true ? (
          <ModalCard
            open={isShowEditModal}
            setOpen={setIsShowEditModal}
            title="Ubah Transaksi"
            onClick={handleSubmit(onEdit)}
            maxWidth="max-w-2xl"
          >
            <div className="flex flex-col lg:grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2 overflow-y-auto max-h-80 w-full">
                <SearchField
                  name="productSearch"
                  setSearchText={setSearchText}
                />
                {productData?.length === 0 || productData === null
                  ? "Tidak ada data"
                  : productData?.map((product) => (
                      <Checkbox
                        key={product.productID}
                        label={product.productName}
                        description={"IDR " + fNum(product.productPrice)}
                        checked={selectedProducts.some(
                          (p: IProductListResponse) =>
                            p.productID === product.productID
                        )}
                        onChange={() => handleProductChange(product)}
                      />
                    ))}
              </div>
              <div className="overflow-y-auto max-h-80">
                <FormProvider {...methods}>
                  <TransactionEditForm
                    onSubmit={handleSubmit(onEdit)}
                    selectedProducts={selectedProducts}
                    totalTransaction={totalTransaction}
                    transactionValue={transactionValue}
                  />
                </FormProvider>
                <div className="flex gap-2 justify-end">
                  <Button
                    text="Batal"
                    btnStyle="outlined"
                    additionClassname="w-full"
                    onClick={() => setIsShowEditModal(false)}
                  />
                  <Button
                    text="Ubah"
                    btnStyle="filled"
                    additionClassname="w-full"
                    onClick={handleSubmit(onEdit)}
                  />
                </div>
              </div>
            </div>
          </ModalCard>
        ) : (
          <ModalCard
            open={isShowEditModal}
            setOpen={setIsShowEditModal}
            title="Ubah Transaksi"
            buttonText={isSubmitting ? "Memuat..." : "Ubah"}
            onClick={handleSubmit(onSubmitNoProduct)}
          >
            <FormProvider {...methods}>
              <TransactionNoProductForm
                onSubmit={handleSubmit(onSubmitNoProduct)}
                data={data}
              />
            </FormProvider>
          </ModalCard>
        )}
      </div>

      {/* Delete modal */}
      <ModalCard
        open={isShowDeleteModal}
        setOpen={setIsShowDeleteModal}
        deleteTitle={deleteItem}
        onDelete={() => onDelete(selectedTransactionId!)}
      />
    </div>
  );
}

export default TransactionAccordion;
