import React, { useState } from "react";
import { Link } from "react-router-dom";

const ExploreNav = () => {
  const [link, setLink] = useState("");
  const [activeTab, setActiveTab] = useState("popular");

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };
  //   const link = window.location.pathname;

  const activeLink =
    "border-b-[5px] border-primary-dark-green text-primary-dark-green pb-5 px-4";
  return (
    <>
      {/* <div className="flex text-primary-dark-gray items-center gap-10 lg:text-xl font-semibold border-b-[3px] border-b-primary-dark-gray">
        <Link
          onClick={() => setLink("")}
          className={link == "" ? activeLink : "pb-5 px-4"}
          to="/explore"
        >
          Popular Posts
        </Link>
        <Link
          onClick={() => setLink("diaries")}
          className={link == "diaries" ? activeLink : "pb-5"}
          to="/explore/"
        >
          Diaries
        </Link>
        <Link
          onClick={() => setLink("videos")}
          className={link == "videos" ? activeLink : "pb-5"}
          to="/explore/"
        >
          Videos
        </Link>
        <Link
          onClick={() => setLink("images")}
          className={link == "images" ? activeLink : "pb-5"}
          to="/explore/"
        >
          Images
        </Link>
      </div> */}

      {/* Hello */}
      <div className="border-b-[3px] border-gray-200 dark:border-gray-700">
        <ul
          className="flex flex-wrap -mb-px sm:text-xl sm:font-semibold text-gray-400 text-center gap-2 md:gap-5 lg:gap-10"
          role="tablist"
        >
          <li className="me-2" role="presentation">
            <button
              className={`inline-block p-4 rounded-t-lg  ${
                activeTab === "popular"
                  ? "border-[#4C9C25] text-[#4C9C25] border-b-4"
                  : "text-[#8D92AC]"
              }`}
              onClick={() => handleTabClick("popular")}
              role="tab"
              aria-controls="popular"
              aria-selected={activeTab === "popular"}
            >
              Popular Posts
            </button>
          </li>
          <li className="me-2" role="presentation">
            <button
              className={`inline-block p-4 rounded-t-lg  ${
                activeTab === "diaries"
                  ? "border-[#4C9C25] text-[#4C9C25] border-b-4"
                  : "text-[#8D92AC]"
              }`}
              onClick={() => handleTabClick("diaries")}
              role="tab"
              aria-controls="diaries"
              aria-selected={activeTab === "diaries"}
            >
              Diaries
            </button>
          </li>
          <li className="me-2" role="presentation">
            <button
              className={`inline-block p-4 rounded-t-lg ${
                activeTab === "videos"
                  ? "border-[#4C9C25] text-[#4C9C25] border-b-4"
                  : "text-[#8D92AC]"
              }`}
              onClick={() => handleTabClick("videos")}
              role="tab"
              aria-controls="videos"
              aria-selected={activeTab === "videos"}
            >
              Videos
            </button>
          </li>
          <li className="me-2" role="presentation">
            <button
              className={`inline-block p-4 rounded-t-lg  ${
                activeTab === "images"
                  ? "border-[#4C9C25] text-[#4C9C25] border-b-4"
                  : "text-[#8D92AC]"
              }`}
              onClick={() => handleTabClick("images")}
              role="tab"
              aria-controls="images"
              aria-selected={activeTab === "images"}
            >
              Images
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ExploreNav;
