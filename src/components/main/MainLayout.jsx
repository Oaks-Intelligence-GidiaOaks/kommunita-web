import React from "react";
import { Nav } from "../navbar";
import { SideNav } from "../sidebar";
import { AdsSection } from "../ads";

const MainLayout = ({ children, showNav }) => {
  return (
    <>
      <Nav />
      <section className="bg-[#EFF2FC]">
        {/* <div className="mx-auto px-8 flex justify-between w-full"> */}
        <div className="mx-auto px-4 sm:px-4 lg:px-12 grid grid-cols-12 justify-between w-full">
          <div className="hidden lg:block col-span-3">
            <SideNav />
            {/* <section className="lg:hidden">
              <AdsSection />
            </section> */}
          </div>
          <div
            className={
              showNav
                ? "col-span-12 md:col-span-7 lg:col-span-5"
                : "col-span-12  lg:col-span-8"
            }
          >
            {/* <div className="md:hidden">
              <MobileProfile />
            </div> */}
            <div className="w-full">{children}</div>
          </div>
          {showNav && (
            <section className="hidden md:block w-full col-span-5 lg:col-span-4">
              <AdsSection />
            </section>
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
