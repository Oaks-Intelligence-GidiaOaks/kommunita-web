import React, { useState } from "react";
import { Link } from "react-router-dom";
import { data } from "../../components/explore/category";
import ExploreMain from "../../components/explore/Main";
import Likes from "./../../components/sidebar/Likes";
import ExploreNav from "../../components/explore/ExploreNav";
import CategoryCard from "../../components/explore/CategoryCard";

const ExploreHome = () => {
  const [selectedCategory, setCategory] = useState("");

  const selectCategory = (cat) => {
    // console.log(cat);
    setCategory(cat);
  };
  return (
    <>
      <section className="bg-[#EFF2FC] pt-5">
        <div className="container flex flex-col justify-between w-full px-48">
          <Link onClick={() => setCategory("")} to="/">
            <div className="flex gap-2 items-center mb-10">
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
              <p className="text-lg font-semibold">
                {selectedCategory || "Explore"}
              </p>
            </div>
          </Link>
          {!selectedCategory && (
            <div>
              <p className="font-semibold text-lg mb-5">Categories</p>
              <div className="grid grid-cols-4 gap-5 items-center w-full mb-10">
                {data.map((dt) => (
                  <CategoryCard cat={dt} onclick={selectCategory} />
                ))}
              </div>
            </div>
          )}
          <ExploreNav />

          <div className="flex justify-between w-full">
            <ExploreMain />
            <div>
              <Likes />
              <div className="mt-3">
                <img src="src/assets/images/ads/ad1.svg" alt="advert" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ExploreHome;
