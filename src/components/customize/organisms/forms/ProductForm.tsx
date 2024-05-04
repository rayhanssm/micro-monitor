import React from "react";
import TextField from "../../molecules/input-field/TextField";
import NumberField from "../../molecules/input-field/NumberField";
import UploadImgField from "../../molecules/input-field/UploadImgField";

type IProps = {
  onSubmit: () => void;
};

function ProductForm({ onSubmit }: IProps) {
  return (
    <form className="space-y-2 mb-[30px]" onSubmit={onSubmit}>
      <TextField label="Product Name" name="name" />
      <NumberField label="Price" name="price" type="currency" />
      <UploadImgField />
    </form>
  );
}

export default ProductForm;
