"use client";

import DashboardButtonGroup from "@/components/customize/molecules/button-group/DashboardButtonGroup";
import DashboardSummary from "@/components/customize/templates/dashboard/DashboardSummary";
import React, { useState } from "react";

function DashboardView() {
  const [selected, setSelected] = useState(1);

  return (
    <div className="px-[116px] py-[112px]">
      <DashboardButtonGroup selected={selected} setSelected={setSelected} />
      <DashboardSummary selected={selected} />
    </div>
  );
}

export default DashboardView;
