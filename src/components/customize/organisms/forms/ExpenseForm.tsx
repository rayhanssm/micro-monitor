import React from "react";
import NumberField from "../../molecules/input-field/NumberField";
import TextField from "../../molecules/input-field/TextField";
import DateTimeField from "../../molecules/input-field/DateTimeField";
import { useFieldArray, useFormContext } from "react-hook-form";
import Button from "../../atoms/button/Button";
import FileField from "../../molecules/input-field/FileField";

type IProps = {
  onSubmit: () => void;
  file: File | string;
  setFile: (file: File) => void;
};

function ExpenseForm({ onSubmit, file, setFile }: IProps) {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "details",
  });

  return (
    <form className="space-y-2 s mb-[30px]" onSubmit={onSubmit}>
      <DateTimeField label="Tanggal dan Jam" name="expenseDate" />
      <TextField label="Kategori" name="expenseCategory" disabled />
      <FileField
        label="Bukti Pengeluaran"
        name="expenseFile"
        file={file}
        setFile={setFile}
      />

      <div className="max-h-80 flex flex-col gap-3 overflow-y-auto">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="p-4 rounded-lg border border-slate-300"
          >
            <p className="lining-nums text-[10px] font-semibold text-slate-400">
              PENGELUARAN - {index + 1}
            </p>
            <TextField
              label="Deskripsi"
              name={`details[${index}].description`}
            />
            <NumberField
              label="Harga"
              name={`details[${index}].value`}
              type="currency"
            />
            <button
              className="flex mt-4 w-full justify-center items-center gap-2 bg-transparent border-red-600 text-red-600 hover:bg-red-600 text-sm text-red-bg-red-600 hover:text-white font-medium border py-1 px-4 rounded-md transition ease-in"
              onClick={() => remove(index)}
            >
              Hapus
            </button>
          </div>
        ))}
        <Button
          text="Tambah"
          btnStyle="outlined"
          additionClassname="w-full"
          onClick={() =>
            append({
              description: "",
              value: null,
            })
          }
        />
      </div>
    </form>
  );
}

export default ExpenseForm;
