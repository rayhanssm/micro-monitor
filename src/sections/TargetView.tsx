import { yearOptionsDummy } from "@/_dummyData/options";
import DropdownButton from "@/components/customize/atoms/button/DropdownButton";
import TargetTable from "@/components/customize/organisms/tables/TargetTable";
import React from "react";

function TargetView() {
  return (
    <div className="px-[116px] py-[112px]">
      <div className="mb-6 flex justify-end">
        <DropdownButton options={yearOptionsDummy} />
      </div>

      <TargetTable />
    </div>
  );
}

export default TargetView;
