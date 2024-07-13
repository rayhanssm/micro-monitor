import React from "react";
import { Controller, useFormContext } from "react-hook-form";

type IProps = {
  label: string;
  name: string;
  file: File | string;
  setFile: (file: File) => void;
};

function FileField({ label, name, file, setFile }: IProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <label className="w-fit text-slate-900 text-sm font-medium">
            {label}
          </label>
          <input
            {...field}
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setFile(e.target.files[0]);
                console.log(e.target.files)
              }
            }}
            type="file"
            className="w-full bg-white border border-slate-300 text-slate-900 text-sm rounded-lg px-3 py-2"
          />
          <p className="text-sm text-red-500 mt-1">{error?.message}</p>
        </div>
      )}
    />
  );
}

export default FileField;
