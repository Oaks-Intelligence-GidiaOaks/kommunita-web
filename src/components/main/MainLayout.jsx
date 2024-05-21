import React from "react";
import { Nav } from "../navbar";
import { SideNav } from "../sidebar";
import { AdsSection } from "../ads";

const MainLayout = ({ children, showNav }) => {
  return (
    <>
      <Nav />
      <section className="bg-[#EFF2FC] w-full mx-auto px-5 overflow-x-hidden">
        {/* <div className="mx-auto px-8 flex justify-between w-full"> */}
        <div className="grid grid-cols-12 justify-center w-full">
          <div className="hidden lg:block col-span-3 xl:col-span-2">
            <SideNav />
            {/* <section className="lg:hidden">
              <AdsSection />
            </section> */}
          </div>
          <div
            className={
              showNav
                ? "col-span-12 md:col-span-8 lg:col-span-6 xl:col-span-7"
                : "col-span-12  lg:col-span-9 xl:col-span-10"
            }
          >
            <div className="w-full">{children}</div>
          </div>
          {showNav && (
            <div className="w-[410px]">
              <AdsSection />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

MainLayout.defaultProps = {
  showNav: true,
};
export default MainLayout;
