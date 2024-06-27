import React from "react";

type IProps = {
  text: string;
  textColor: string;
  bgColor: string;
  borderColor: string;
};

function RecommendationPill({ text, textColor, bgColor, borderColor }: IProps) {
  return (
    <div className={`w-fit px-3 py-1 border rounded-xl  ${bgColor} ${borderColor}`}>
      <p className={`text-[8px] ${textColor} font-semibold`}>{text}</p>
    </div>
  );
}

export default RecommendationPill;
