import React from "react";

type IProps = {
  text: string;
  textColor: string;
  bgColor: string;
};

function RecommendationPill({ text, textColor, bgColor }: IProps) {
  return (
    <div className={`w-fit px-3 py-1 rounded-xl  ${bgColor}`}>
      <p className={`text-[8px] ${textColor} font-semibold`}>{text}</p>
    </div>
  );
}

export default RecommendationPill;
