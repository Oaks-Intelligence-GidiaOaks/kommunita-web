import React, { useState } from "react";

const Header = () => {
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState("");

  const handleCategory = (e) => {
    // console.log(e.target);
    setCategory(e);
    setShow(false);
  };
  return (
    <div className="w-full relative flex items-center justify-between">
      <p className="font-semibold text-lg">Favorites</p>
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
        <div className=" absolute right-0 top-8 rounded-lg bg-[#fff] text-primary-gray p-4 w-48">
          <p
            className="mb-2 hover:bg-primary-gray hover:text-white cursor-pointer"
            onClick={(e) => handleCategory("")}
          >
            All
          </p>
          <p
            className="mb-2 hover:bg-primary-gray hover:text-white cursor-pointer"
            onClick={(e) => handleCategory("Post")}
          >
            Post
          </p>
          <p
            className="mb-2 hover:bg-primary-gray hover:text-white cursor-pointer"
            onClick={(e) => handleCategory("Diaries")}
          >
            Diaries
          </p>
          <p
            className="mb-2 hover:bg-primary-gray hover:text-white cursor-pointer"
            onClick={(e) => handleCategory("Videos")}
          >
            Videos
          </p>
          <p
            className="mb-2 hover:bg-primary-gray hover:text-white cursor-pointer"
            onClick={(e) => handleCategory("Images")}
          >
            Images
          </p>
        </div>
      )}
    </div>
  );
};

export default Header;
