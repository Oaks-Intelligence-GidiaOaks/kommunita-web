import React, { useState } from "react";

const Header = ({ setFilter }) => {
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState("");

  const handleCategory = (cat) => {
    // console.log(e.target);
    setCategory(cat);
    setFilter(cat);
    setShow(false);
  };
  return (
    <div className="w-full relative flex items-center justify-between text-[#51546C] z-50">
      <p className="font-semibold text-lg text-[18px]">Favourites</p>
      <div className="flex items-center gap-2">
        {category && (
          <svg
            width="6"
            height="6"
            viewBox="0 0 6 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="3" cy="3" r="3" fill="#3D7100" />
          </svg>
        )}
        <p className="font-semibold">{category || "Sort"} </p>
        <svg
          onClick={() => setShow(!show)}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </div>
      {show && (
        <div className=" absolute right-0 top-12 rounded-lg bg-[#fff] text-primary-gray p-4 w-[199px]">
          <p
            className="mb-3 hover:bg-primary-gray hover:text-white cursor-pointer"
            onClick={() => handleCategory("")}
          >
            All
          </p>
          <p
            className="mb-3 hover:bg-primary-gray hover:text-white cursor-pointer"
            onClick={() => handleCategory("posts")}
          >
            Post
          </p>
          <p
            className="mb-3 hover:bg-primary-gray hover:text-white cursor-pointer"
            onClick={() => handleCategory("diary")}
          >
            Diaries
          </p>
          <p
            className="mb-3 hover:bg-primary-gray hover:text-white cursor-pointer"
            onClick={() => handleCategory("videos")}
          >
            Videos
          </p>
          <p
            className="mb-3 hover:bg-primary-gray hover:text-white cursor-pointer"
            onClick={() => handleCategory("images")}
          >
            Images
          </p>
        </div>
      )}
    </div>
  );
};

export default Header;
