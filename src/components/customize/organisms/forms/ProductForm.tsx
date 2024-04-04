import React from "react";
import TextField from "../../molecules/input-field/TextField";
import NumberField from "../../molecules/input-field/NumberField";

function ProductForm() {
  return (
    <form className="space-y-2 mb-[30px]">
      <TextField label="Product Name" name="name" />
      <div className="grid grid-cols-2 gap-2">
        <NumberField label="Price" name="price" type="currency" />
        <NumberField label="Stock" name="stock" type="number" />
      </div>
    </form>
  );
}

export default ProductForm;
