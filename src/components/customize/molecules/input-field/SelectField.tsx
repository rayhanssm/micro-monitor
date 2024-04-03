import useClickOutsideElement from "@/hooks/useClickOutsideElement";
import { IOption } from "@/types/options";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import React, { useState } from "react";

type IProps = {
  label: string;
  name: string;
  options: IOption[];
};

function SelectField({ label, name, options }: IProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<IOption>();
  const [searchTxt, setSearchTxt] = useState<string>();

  const optionRef = useClickOutsideElement(setIsOpen);

  const handleChangeValue = (e: any) => {
    const valueToLowerCase = e.target.value.toLowerCase();
    setSearchTxt(valueToLowerCase);
  };

  const filteredOptions = options.filter((item) => {
    if (searchTxt) {
      return (
        item.name.toLowerCase().includes(searchTxt.toLowerCase()) ||
        item.name === searchTxt
      );
    } else {
      return true;
    }
  });

  return (
    <div>
      <label className="w-fit text-slate-900 text-sm font-medium">
        {label}
      </label>

      <button
        type="button"
        className="w-full flex justify-between items-center bg-white border border-slate-300 text-slate-400 text-sm rounded-lg px-3 py-2 text-left"
        onClick={() => setIsOpen(true)}
      >
        {selected?.name ? selected.name : "Select..."}
        {isOpen ? (
          <ChevronUp size={16} color="#CBD5E1" />
        ) : (
          <ChevronDown size={16} color="#CBD5E1" />
        )}
      </button>

      <div
        ref={optionRef}
        className={`absolute w-full mt-2 p-3 rounded-md bg-white border shadow-lg ${
          isOpen ? "opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="flex items-center gap-2 w-full border border-slate-300 text-slate-900 text-md rounded-md px-3 py-2">
          <Search color="#94a3b8" size={16} />
          <input
            type="search"
            name={name}
            placeholder="Search"
            className="w-full outline-none"
            onChange={handleChangeValue}
            value={searchTxt}
          />
        </div>
        <div
          className={`mt-2 max-w-full max-h-60 overflow-auto flex flex-col gap-1 p-1.5 border rounded-md`}
        >
          {filteredOptions.length === 0 && (
            <p className="py-2 px-3 text-sm">Not found</p>
          )}
          {filteredOptions.map((item) => (
            <button
              type="button"
              key={item.value}
              className={`py-2 px-3 rounded-md text-left text-sm hover:bg-slate-100 ${
                selected?.value === item.value ? "bg-slate-100" : ""
              }`}
              onClick={() => {
                setSelected(item);
                setSearchTxt("");
                setIsOpen(false);
              }}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SelectField;
