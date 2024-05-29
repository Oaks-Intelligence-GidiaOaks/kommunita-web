import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetPostQuery } from "../../service/post.service";

const ProfileNav = () => {
  const { data } = useGetPostQuery();

  const currentPath = window.location.pathname;
  // const nonActiveLink =

  const [activeTab, setActiveTab] = useState("profile");

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const activeLink =
    "border-b-[5px] border-primary-dark-green text-primary-dark-green pb-0";
  return (
    // <div className="flex text-primary-dark-gray items-center gap-10 lg:text-xl font-semibold border-b-[3px] border-b-primary-dark-gray">
    <div className="border-b-[3px] border-gray-200 dark:border-gray-700">
      <ul
        className="flex flex-wrap -mb-px text-2xl font-semibold text-gray-400 text-center justify-center gap-10"
        role="tablist"
      >
        <li className="me-2" role="presentation">
          <button
            className={`inline-block p-4 rounded-t-lg tabs ${
              activeTab === "profile"
                ? "border-[#4C9C25] text-[#4C9C25] border-b-4"
                : "text-[#8D92AC]"
            }`}
            onClick={() => handleTabClick("profile")}
            role="tab"
            aria-controls="profile"
            aria-selected={activeTab === "profile"}
          >
            Posts ({data?.data?.length})
          </button>
        </li>
        <li className="me-2" role="presentation">
          <button
            className={`inline-block p-4 rounded-t-lg tabs ${
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
            className={`inline-block p-4 rounded-t-lg tabs ${
              activeTab === "media"
                ? "border-[#4C9C25] text-[#4C9C25] border-b-4"
                : "text-[#8D92AC]"
            }`}
            onClick={() => handleTabClick("media")}
            role="tab"
            aria-controls="media"
            aria-selected={activeTab === "media"}
          >
            Photos & Videos
          </button>
        </li>
        <li className="me-2" role="presentation">
          <button
            className={`inline-block p-4 rounded-t-lg tabs ${
              activeTab === "likes"
                ? "border-[#4C9C25] text-[#4C9C25] border-b-4"
                : "text-[#8D92AC]"
            }`}
            onClick={() => handleTabClick("likes")}
            role="tab"
            aria-controls="likes"
            aria-selected={activeTab === "likes"}
          >
            Likes
          </button>
        </li>
        {/*        
        <Link
          className={currentPath == "/profile" ? activeLink : "pb-5"}
          to="/profile"
        >
          Posts ({data?.data?.length})
        </Link>
        <Link
          className={currentPath == "/profile/diaries" ? activeLink : "pb-5"}
          to="/profile/diaries"
        >
          Diaries
        </Link>
        <Link
          className={currentPath == "/profile/media" ? activeLink : "pb-5"}
          to="/profile/media"
        >
          Photos & Videos
        </Link>
        <Link
          className={currentPath == "/profile/likes" ? activeLink : "pb-5"}
          to="/profile/likes"
        >
          Likes
        </Link> */}
      </ul>
    </div>
  );
};

export default ProfileNav;
