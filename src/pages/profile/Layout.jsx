import React from "react";
import ProfileHero from "../../components/profile/ProfileHero";
import ProfileNav from "../../components/profile/ProfileNav";

const Layout = ({ children }) => {
  return (
    <div className="bg-[#EFF2FC] h-full">
      <ProfileHero />
      <div className="mt-20 flex gap-10 px-10 lg:px-24">
        <div className="w-[277px] h-[583px] bg-primary--bright-green"></div>
        <div className="w-[100%] border-b-[3px] border-b-primary-dark-gray pr-10">
          <div className="flex items-center justify-center">
            <ProfileNav />
          </div>
          <div className="p-10">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
