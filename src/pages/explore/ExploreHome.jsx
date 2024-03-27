import React, { useState } from "react";
import { Link } from "react-router-dom";
import { data } from "../../components/explore/category";
import ExploreMain from "../../components/explore/Main";
import Likes from "./../../components/sidebar/Likes";
import ExploreNav from "../../components/explore/ExploreNav";
import CategoryCard from "../../components/explore/CategoryCard";
// import ScrollAdds from './../../components/ads/ScrollAdds';
import { AdsOnly } from "./../../components/ads/Ads";
import MainLayout from "../../components/main/MainLayout";
import MobileProfile from "./../../components/mobile/MobileProfile";

const ExploreHome = () => {
  const [selectedCategory, setCategory] = useState("");

  const selectCategory = (cat) => {
    setCategory(cat);
  };
  return (
    <MainLayout showNav={false}>
      <div className="flex flex-col w-full p-4">
        <div
          onClick={() => setCategory("")}
          className="flex gap-2 items-center mb-10 cursor-pointer"
        >
          {selectedCategory && (
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
          )}
          <p className="text-lg font-semibold">{selectedCategory}</p>
        </div>

        {!selectedCategory && (
          <div>
            <p className="font-semibold text-lg mb-5">Categories</p>
            {/* <div className="grid grid-cols-4 gap-5 items-center w-full mb-10"> */}
            <div className="flex flex-wrap lg:grid lg:grid-cols-4 gap-2 items-center w-full mb-10">
              {data.map((dt) => (
                <CategoryCard cat={dt} onclick={selectCategory} />
              ))}
            </div>
          </div>
        )}
        <ExploreNav />

        {/* <div className="flex justify-between w-full"> */}
        <div className="grid grid-cols-12 justify-between w-full">
          <div className="col-span-12 lg:col-span-8">
            <ExploreMain />
          </div>
          <div className="hidden lg:block col-span-4">
            <Likes />
            <div className="mt-3">
              <AdsOnly />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ExploreHome;
