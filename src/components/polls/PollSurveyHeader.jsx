import React from "react";

const PollSurveyHeader = ({ title, color }) => {
  return (
    <div className="flex items-center  justify-between mb-">
      <div>
        <h2 className={`font-semibold text-[1.5rem] text-[${color}]`}>{title || "Enter Title Prop"}</h2>
      </div>
    </div>
  );
};

export default PollSurveyHeader;
