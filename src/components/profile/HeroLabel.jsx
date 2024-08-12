import React from "react";

const HeroLabel = ({ icon, label }) => {
  return (
    <div className="flex gap-2 items-center justify-between">
      <div className="flex items-center justify-between bg-[#02BA09] bg-opacity-25 h-[18px] w-[18px]">
        {icon}
      </div>
      <p className="text-xs lg:text-sm font-semibold">{label}</p>
    </div>
  );
};

export default HeroLabel;
