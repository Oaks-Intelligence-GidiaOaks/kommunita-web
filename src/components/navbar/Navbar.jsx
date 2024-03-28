import logo from "../../assets/images/logo.svg";
import feeds from "../../assets/images/menu/feeds.svg";
import explore from "../../assets/images/menu/explore.svg";
import diaries from "../../assets/images/menu/diaries.svg";
import search from "../../assets/images/menu/search.svg";
import { Link } from "react-router-dom";
import "./style.css";

function Navbar() {
  const currentPath = window.location.pathname;
  const nAL = "pt-1 pb-2";
  const aL = nAL + " text-[#2CC84A]";
  return (
    <section className="container h-auto bg-white w-full flex items-center justify-center sm:justify-between">
      <div className="logo hidden sm:block">
        <img src={logo} alt="logo" />
      </div>
      <div className="menu-items flex gap-14 pt-5">
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
            {currentPath === "/diary" && <div className="active-border"></div>}
          </div>
        </Link>
      </div>
      <div className="search hidden lg:block">
        <div className="flex search-box">
          <input
            type="text"
            className="search-input w-full focus:outline-none focus:ring-0"
            placeholder="Search"
          />
          <img src={search} alt="" />
        </div>
      </div>
    </section>
  );
}

export default Navbar;
