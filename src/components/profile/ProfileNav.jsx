import React from "react";
import { Link } from "react-router-dom";
import { useGetPostQuery } from "../../service/post.service";

const ProfileNav = () => {
  const { data } = useGetPostQuery();

  const currentPath = window.location.pathname;
  // const nonActiveLink =

  const activeLink =
    "border-b-[5px] border-primary-dark-green text-primary-dark-green pb-4";
  return (
    // <div className="flex text-primary-dark-gray items-center gap-10 lg:text-xl font-semibold border-b-[3px] border-b-primary-dark-gray">
    <div className="border-b-[3px] border-gray-200 dark:border-gray-700">
      <ul
        className="flex flex-wrap -mb-px  font-medium text-center justify-center gap-10"
        role="tablist"
      >
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
        </Link>
      </ul>
    </div>
  );
};

export default ProfileNav;
