"use client";

import DashboardButtonGroup from "@/components/customize/molecules/button-group/DashboardButtonGroup";
import DashboardSummaryDaily from "@/components/customize/templates/dashboard/DashboardSummaryDaily";
import DashboardSummaryMonthly from "@/components/customize/templates/dashboard/DashboardSummaryMonthly";
import DashboardSummaryPeriodically from "@/components/customize/templates/dashboard/DashboardSummaryPeriodically";
import DashboardSummaryYearly from "@/components/customize/templates/dashboard/DashboardSummaryYearly";
import { paths } from "@/routes/paths";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Cookies } from "react-cookie";

function DashboardView() {
  const [selected, setSelected] = useState(1);
  const cookies = new Cookies();
  const router = useRouter();

  useEffect(() => {
    const role = cookies.get("role");
    if (role === "staff") {
      router.push(paths.transaction);
    }
  }, [cookies]);

  const dashboardSummary = () => {
    switch (selected) {
      case 1:
        return <DashboardSummaryDaily selected={selected} />;
      case 2:
        return <DashboardSummaryMonthly selected={selected} />;
      case 3:
        return <DashboardSummaryYearly selected={selected} />;
      case 4:
        return <DashboardSummaryPeriodically />;
      default:
        return null;
    }
  };

  return (
    <div className="px-4 py-[112px] lg:px-[116px]">
      <DashboardButtonGroup selected={selected} setSelected={setSelected} />
      {dashboardSummary()}
    </div>
  );
}

export default DashboardView;
