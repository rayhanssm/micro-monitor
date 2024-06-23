"use client";

import DashboardButtonGroup from "@/components/customize/molecules/button-group/DashboardButtonGroup";
import DashboardSummary from "@/components/customize/templates/dashboard/DashboardSummary";
import DashboardSummaryMonthly from "@/components/customize/templates/dashboard/DashboardSummaryMonthly";
import DashboardSummaryOverall from "@/components/customize/templates/dashboard/DashboardSummaryOverall";
import React, { useState } from "react";

function DashboardView() {
  const [selected, setSelected] = useState(3);

  const dashboardSummary = () => {
    switch (selected) {
      case 1:
        return <DashboardSummary selected={selected} />;
      case 2:
        return <DashboardSummaryMonthly selected={selected} />;
      case 3:
        return <DashboardSummaryOverall selected={selected} />;
      default:
        return null;
    }
  };

  return (
    <div className="px-[116px] py-[112px]">
      <DashboardButtonGroup selected={selected} setSelected={setSelected} />
      {dashboardSummary()}
    </div>
  );
}

export default DashboardView;
