import logo from "../../assets/images/logo.svg";
import feeds from "../../assets/images/menu/feeds.svg";
import explore from "../../assets/images/menu/explore.svg";
import diaries from "../../assets/images/menu/diaries.svg";
import search from "../../assets/images/menu/search.svg";
import "./style.css";

function Navbar() {
  return (
    <section className="container h-auto bg-white w-full flex items-center justify-between">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="menu-items flex gap-14 pt-5">
        <div className="items flex flex-col justify-center items-center">
          <div className="flex justify-center items-center active h-[28.327px] w-[28.327px] rounded-full bg-[#2CC84A]">
            <img src={feeds} alt="feeds" />
          </div>
          <p className="text-[#2CC84A] pt-1 pb-2">My Feed</p>
          <div className="active-border"></div>
        </div>

        <div className="items flex flex-col justify-center items-center">
          <div className="flex justify-center items-center active h-[28.327px] w-[28.327px] rounded-full">
            <img src={explore} alt="explore" />
          </div>
          <p className="pt-1 pb-2">Explore</p>
        </div>

        <div className="items flex flex-col justify-center items-center">
          <div className="flex justify-center items-center active h-[28.327px] w-[28.327px] rounded-full">
            <img src={diaries} alt="diaries" />
          </div>
          <p className="pt-1 pb-2">Diaries</p>
        </div>
      </div>
      <div className="search">
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
