import React from "react";

const PollSurveyHeader = ({ title }) => {
  return (
    <div className="flex items-center  justify-between mb-5">
      <div>
        <h2 className="font-semibold text-xl">{title || "Enter Title Prop"}</h2>
      </div>
    </div>
  );
};

export default PollSurveyHeader;
