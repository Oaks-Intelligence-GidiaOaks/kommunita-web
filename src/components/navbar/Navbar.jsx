import new_logo from "../../assets/images/new-logo.svg";
import { Link } from "react-router-dom";
import explore from "../../assets/images/menu/explore.svg";
import diaries from "../../assets/images/menu/diaries.svg";
import search from "../../assets/images/menu/search.svg";
import feeds from "../../assets/images/menu/feeds.svg";
import "./style.css";
import { useState } from "react";
import { useSearchGeneralMutation } from "../../service/search.service";
import rtkMutation from "../../utils/rtkMutation";
import { showAlert } from "../../static/alert";
import Modals from "../modals/Modal";
import GeneralSearch from "../search/GeneralSearch";
import { BeatLoader } from "react-spinners";

const Navbar = () => {
  const currentPath = window.location.pathname;
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const [searchGeneral, { error, isSuccess }] = useSearchGeneralMutation();
  const [searchedData, setSearchedData] = useState(null);
  const [searching, setSearching] = useState(false);
  const [searchString, setSearchString] = useState("");
  const nAL = "pt-1 pb-2";
  const aL = nAL + " text-[#2CC84A]";

  const handleSearch = async () => {
    setSearching(true);
    // console.log(searchString);
    if (searchString) {
      const postData = {
        search_term: searchString,
      };
      try {
        const res = await rtkMutation(searchGeneral, { ...postData });
        console.log(res.data);
        setSearchedData(res.data);
        setOpenSearchModal(true);
      } catch (error) {
        console.error("Error making search: ", error);
        showAlert("Oops", "An error occurred while searching content", "error");
      }
    }
    setSearching(false);
  };

  return (
    <nav className="h-auto flex justify-between items-center p-4 w-full top-0 z-10">
      <div className="logo">
        <Link to={"/"}>
          <img src={new_logo} alt="" />
        </Link>
      </div>
      <div className="menus flex space-x-10">
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

      <div className="search">
        <div className="flex search-box">
          <input
            type="text"
            className="search-input w-full focus:outline-none focus:ring-0 "
            placeholder="Search"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
          />
          <div className="cursor-pointer" onClick={handleSearch}>
            {searching ? (
              <BeatLoader color="#ffffff" loading={true} />
            ) : (
              <img src={search} alt="" />
            )}
          </div>
        </div>
      </div>
      {openSearchModal && (
        <Modals
          title={searchString}
          openModal={openSearchModal}
          modalSize="2xl"
          onClose={() => setOpenSearchModal(false)}
        >
          <GeneralSearch data={searchedData} />
        </Modals>
      )}
    </nav>
  );
};

export default Navbar;
