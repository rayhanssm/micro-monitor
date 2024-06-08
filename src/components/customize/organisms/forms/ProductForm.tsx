import React from "react";
import TextField from "../../molecules/input-field/TextField";
import NumberField from "../../molecules/input-field/NumberField";

type IProps = {
  onSubmit: () => void;
};

function ProductForm({ onSubmit }: IProps) {
  return (
    <form className="space-y-2 mb-[30px]" onSubmit={onSubmit}>
      <TextField label="Nama Produk" name="name" />
      <NumberField label="Harga" name="price" type="currency" />
      <NumberField label="Stok" name="stock" type="number" />
    </form>
  );
}

export default ProductForm;
