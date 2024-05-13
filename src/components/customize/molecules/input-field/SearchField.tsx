"use client";

import { Search } from "lucide-react";
import React from "react";

type IProps = {
  name: string;
  setSearchText: (search: string) => void;
};

function SearchField({ name, setSearchText }: IProps) {
  return (
    <div className="flex items-center py-[10px] px-2 gap-2 h-fit border rounded-md">
      <Search color="#94a3b8" size={16} />
      <input
        type="search"
        name={name}
        id="search-field"
        placeholder="Type and enter to search..."
        className="block w-56 outline-none placeholder-slate-400 text-sm"
        onKeyDown={(e: any) => {
          if (e.key === "Enter") {
            setSearchText(e.target.value);
          }
        }}
      />
    </div>
  );
}

export default SearchField;
