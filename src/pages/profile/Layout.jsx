import React from "react";
import ProfileHero from "../../components/profile/ProfileHero";
import ProfileNav from "../../components/profile/ProfileNav";
import MenuItems from "../../components/sidebar/MenuItems";
// import Profile from "../../components/sidebar/Profile";
// import MobileProfile from "../../components/mobile/MobileProfile";

const Layout = ({ children }) => {
  return (
    <div className="bg-[#EFF2FC]">
      <div className="">
        <ProfileHero />
      </div>
      <div className="mx-auto px-4 md:px-8">
        <div className="xl:mt-20 pt-5 xl:pt-0 grid grid-cols-12 gap-3">
          <div className=" bg-red-400">
            {/* <div className="col-span-4 lg:col-span-3 xl:col-span-2 bg-[#fff] max-w-[277px] w-full rounded border-r-[0.5px] hidden lg:block max-h-[auto] overflow-hidden bg-red-400"> */}
            <MenuItems />
            Jesus is Lord
          </div>
          <div className="col-span-12 lg:col-span-9 xl:col-span-10 border-b-[3px] border-b-primary-dark-gray">
            <div className="flex items-center justify-center ">
              <ProfileNav />
            </div>
            <div className="">
              <div className="mt-10">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
