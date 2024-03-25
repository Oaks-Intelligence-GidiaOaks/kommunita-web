import React from "react";
import ProfileHero from "../../components/profile/ProfileHero";
import ProfileNav from "../../components/profile/ProfileNav";
import MenuItems from "../../components/sidebar/MenuItems";
import Profile from "../../components/sidebar/Profile";

const Layout = ({ children }) => {
  return (
    <div className="bg-[#EFF2FC]">
      <div className="hidden xl:block">
        <ProfileHero />
      </div>
      <div className="container">
        <div className="xl:mt-20 pt-5 xl:pt-0 flex gap-3 justify-between">
          <div className="bg-[#fff] max-w-[277px] w-full rounded border-r-[0.5px] hidden lg:block h-[100%]">
            <div className="lg:block xl:hidden">
              <Profile />
            </div>
            <MenuItems />
          </div>
          <div className="border-b-[3px] border-b-primary-dark-gray">
            <div className="flex items-center justify-center ">
              <ProfileNav />
            </div>
            <div className="mt-10 flex justify-between w-full">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
