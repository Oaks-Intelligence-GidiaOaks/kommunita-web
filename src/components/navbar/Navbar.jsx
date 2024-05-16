import logo from "../../assets/images/logo.svg";
import feeds from "../../assets/images/menu/feeds.svg";
import explore from "../../assets/images/menu/explore.svg";
import diaries from "../../assets/images/menu/diaries.svg";
import search from "../../assets/images/menu/search.svg";
import { Link } from "react-router-dom";
import miniLogo from "../../assets/images/k-logo.png";
import "./style.css";
import { SideNav } from "../sidebar";
import { useState } from "react";
import new_logo from "../../assets/images/new-logo.svg";

function Navbar() {
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const currentPath = window.location.pathname;
  const nAL = "pt-1 pb-2";
  const aL = nAL + " text-[#2CC84A]";
  return (
    <section className="">
      <div className="container h-auto bg-white flex items-center justify-between w-[1280px]">
        {/* <Link to="/"> */}
        <div
          onClick={() => {
            window.location.href = "/";
          }}
          className="logo lg:block cursor-pointer flex gap-2"
        >
          <img src={new_logo} alt="logo" />
        </div>
        {/* </Link>
      <Link to="/"> */}
        <div
          onClick={() => {
            window.location.href = "/";
          }}
          className="logo lg:hidden cursor-pointer"
        >
          <img src={miniLogo} alt="logo" />
        </div>
        {/* </Link> */}

        {showMobileNav && (
          <div className="absolute z-50 top-16 left-0 lg:hidden ">
            <SideNav />
          </div>
        )}

        <div className="menu-items flex gap-4 md:gap-8 lg:gap-14 pt-5">
          <Link to="/">
            <div className="items flex flex-col justify-center items-center">
              <div className="flex justify-center items-center h-[28.327px] w-[28.327px] rounded-full bg-[#2CC84A]">
                <img src={feeds} alt="feeds" />
              </div>
              <p
                className={
                  currentPath !== "/explore" && currentPath !== "/diary"
                    ? aL
                    : nAL
                }
              >
                My Feed
              </p>
              {currentPath !== "/explore" && currentPath !== "/diary" && (
                <div className="active-border"></div>
              )}
            </div>
          </Link>
          <Link to="/explore">
            <div className="items flex flex-col justify-center items-center">
              <div className="flex justify-center items-center active h-[28.327px] w-[28.327px] rounded-full bg-[#2CC84A]">
                <img src={explore} alt="explore" />
              </div>
              <p className={currentPath === "/explore" ? aL : nAL}>Explore</p>
              {currentPath === "/explore" && (
                <div className="active-border"></div>
              )}
            </div>
          </Link>

          <Link to="/diary">
            <div className="items flex flex-col justify-center items-center">
              <div className="flex justify-center items-center active h-[28.327px] w-[28.327px] rounded-full">
                <img src={diaries} alt="diaries" />
              </div>
              <p className={currentPath === "/diary" ? aL : nAL}>Diaries</p>
              {currentPath === "/diary" && (
                <div className="active-border"></div>
              )}
            </div>
          </Link>
        </div>
        <div className="search hidden lg:block">
          <div className="flex search-box">
            <input
              type="text"
              className="search-input w-full focus:outline-none focus:ring-0 "
              placeholder="Search"
            />
            <img src={search} alt="" />
          </div>
        </div>
        <div className="search lg:!hidden flex items-center gap-2 ">
          {!showSearch && (
            <div
              onClick={() => setShowSearch(!showSearch)}
              className="flex w-[30px] h-[30px] bg-primary-light-gray bg-opacity-50 cursor-pointer rounded-full items-center justify-center"
            >
              <img src={search} alt="" width={16} />
            </div>
          )}
          {showSearch && (
            <div className="flex search-box-mobile lg:hidden">
              <input
                type="text"
                className="search-input w-full focus:outline-none focus:ring-0 "
                placeholder="Search"
              />
              <img
                onClick={() => setShowSearch(!showSearch)}
                src={search}
                alt=""
              />
            </div>
          )}
          <div>
            <svg
              onClick={() => setShowMobileNav(!showMobileNav)}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 lg:hidden cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Navbar;
