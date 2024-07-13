import { ArrowUpFromLine } from "lucide-react";
import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

type IProps = {
  label: string;
  name: string;
  file: File | string;
  setFile: (file: File) => void;
};

function FileField({ label, name, file, setFile }: IProps) {
  const { control } = useFormContext();
  const [fileName, setFileName] = useState("Unggah dokumen");

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <label className="w-fit text-slate-900 text-sm font-medium mb-2 block">
            {label}
          </label>
          <div className="relative w-full">
            <input
              {...field}
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setFile(e.target.files[0]);
                  setFileName(e.target.files[0].name);
                }
              }}
              type="file"
              id={name}
              className="hidden"
            />
            <label
              htmlFor={name}
              className="flex items-center justify-between w-full bg-white border border-slate-300 text-slate-500 text-sm rounded-lg px-3 py-2 cursor-pointer"
            >
              <span>{fileName}</span>
              <ArrowUpFromLine color="#64748B" />
            </label>
          </div>
          {error && (
            <p className="text-sm text-red-500 mt-1">{error.message}</p>
          )}
        </div>
      )}
    />
  );
}

export default FileField;
