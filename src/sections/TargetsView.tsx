import DropdownButton from "@/components/customize/atoms/button/DropdownButton";
import TargetTable from "@/components/customize/organisms/tables/TargetTable";
import React from "react";

function TargetsView() {
  return (
    <div className="px-[116px] py-[88px]">
      <div className="mb-6 flex justify-end">
        <DropdownButton />
      </div>

      <TargetTable />
    </div>
  );
}

export default TargetsView;
