import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { data } from "../../components/explore/category";
import search from "../../assets/images/menu/search.svg";
import ExploreMain from "../../components/explore/Main";
import Likes from "./../../components/sidebar/Likes";
import ExploreNav from "../../components/explore/ExploreNav";
import CategoryCard from "../../components/explore/CategoryCard";
// import ScrollAdds from './../../components/ads/ScrollAdds';
import { AdsOnly } from "./../../components/ads/Ads";
import MainLayout from "../../components/main/MainLayout";
import MobileProfile from "./../../components/mobile/MobileProfile";
import {
  useGetCategoriesQuery,
  useGetCategoriesWithStatQuery,
} from "../../service/categories.service";
import { BeatLoader } from "react-spinners";
import rtkMutation from "../../utils/rtkMutation";
import { showAlert } from "../../static/alert";
import Modals from "../../components/modals/Modal";
import GeneralSearch from "../../components/search/GeneralSearch";
import { useSearchGeneralMutation } from "../../service/search.service";

const ExploreHome = () => {
  const { data: Category } = useGetCategoriesWithStatQuery();
  console.log(Category?.data);
  const [selectedCategory, setCategory] = useState("");
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const [searchGeneral, { error, isSuccess }] = useSearchGeneralMutation();
  const [searchedData, setSearchedData] = useState(null);
  const [searching, setSearching] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [filterString, setFilterString] = useState("");
  const [filteredCategory, setFilteredCategory] = useState("");

  useEffect(() => {
    if (filterString) {
      setFilteredCategory(
        Category?.data.filter((ct) =>
          ct.categoryName.toLowerCase().includes(filterString.toLowerCase())
        )
      );
    } else {
      setFilteredCategory(Category?.data);
    }
  }, [filterString, Category]);

  const selectCategory = (cat) => {
    setCategory(cat);
  };

  const handleSearch = async () => {
    console.log(filterString);
    // setSearching(true);
    // // console.log(searchString);
    // if (searchString) {
    //   const postData = {
    //     search_term: searchString,
    //   };
    //   try {
    //     const res = await rtkMutation(searchGeneral, { ...postData });
    //     console.log(res.data);
    //     setSearchedData(res.data);
    //     setOpenSearchModal(true);
    //   } catch (error) {
    //     console.error("Error making search: ", error);
    //     showAlert("Oops", "An error occurred while searching content", "error");
    //   }
    // }
    // setSearching(false);
  };

  return (
    <MainLayout showNav={false}>
      <div className="flex flex-col w-full p-4">
        <div
          onClick={() => setCategory("")}
          className="flex gap-2 items-center cursor-pointer"
        >
          {/* {selectedCategory && ( */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>

          <p className="text-2xl font-bold text-[#2d2b2b]">
            {selectedCategory || <span>Explore</span>}
          </p>
        </div>
        <div className="mt-16">
          {!selectedCategory && (
            <div className="">
              <div className="flex items-center justify-between">
                <p className="font-semibold mb-5 text-[#2d2b2b] text-[20px]">
                  Categories
                </p>
                <div className="search">
                  <div className="flex search-box">
                    <input
                      type="text"
                      className="search-input w-full focus:outline-none focus:ring-0 "
                      placeholder="Search"
                      value={filterString}
                      onChange={(e) => setFilterString(e.target.value)}
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
              </div>
              {/* <div className="grid grid-cols-4 gap-5 items-center w-full mb-10"> */}
              {filteredCategory && (
                <div className="flex flex-wrap lg:grid lg:grid-cols-4 gap-10 items-center w-full mb-10">
                  {filteredCategory?.map((dt) => (
                    <CategoryCard cat={dt} onclick={selectCategory} />
                  ))}
                </div>
              )}
            </div>
          )}
          <div className="mt-7">
            <ExploreNav />
          </div>
        </div>

        {/* <div className="flex justify-between w-full"> */}
        <div className="grid grid-cols-12 justify-between w-full">
          <div className="-ml-3 col-span-12 md:col-span-9">
            <ExploreMain />
          </div>
          <div className="hidden md:block col-span-3 -mt-2">
            <Likes />
            <div className="mt-3">
              <AdsOnly />
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
      </div>
    </MainLayout>
  );
};

export default ExploreHome;
