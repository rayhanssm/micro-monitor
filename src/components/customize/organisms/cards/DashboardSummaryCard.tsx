import React from "react";

type IProps = {
  icon?: React.ReactElement;
  title: string;
  content: React.ReactElement;
  footerIcon?: React.ReactElement;
  footer?: string;
};

function DashboardSummaryCard({
  content,
  footer,
  icon,
  title,
  footerIcon,
}: IProps) {
  return (
    <div className="flex flex-col justify-between p-6 rounded-lg shadow-md border lining-nums">
      <div className="flex gap-4">
        {icon && <div className="p-1 bg-teal-100 rounded-md">{icon}</div>}
        <p className="text-[#1C1C1C] text-2xl font-semibold">{title}</p>
      </div>
      {content}
      {footer && (
        <div className="flex gap-2.5 items-center">
          {footerIcon && footerIcon}
          {footer && (
            <p className="text-slate-500 text-xl font-semibold">{footer}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default DashboardSummaryCard;
