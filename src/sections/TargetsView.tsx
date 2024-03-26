import DropdownButton from "@/components/customize/atoms/button/DropdownButton";
import TargetTable from "@/components/customize/organisms/tables/TargetTable";
import React from "react";

function TargetsView() {
  // TODO: adjust later
  const optionsDummy = ["2024", "2023", "2022"];

  return (
    <div className="px-[116px] py-[112px]">
      <div className="mb-6 flex justify-end">
        <DropdownButton options={optionsDummy} />
      </div>

      <TargetTable />
    </div>
  );
}

export default TargetsView;
