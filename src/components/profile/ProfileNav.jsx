import React from "react";
import { Link } from "react-router-dom";

const ProfileNav = () => {
  const currentPath = window.location.pathname;
  // const nonActiveLink =

  const activeLink =
    "border-b-[5px] border-primary-dark-green text-primary-dark-green pb-4";
  return (
    <div className="flex text-primary-dark-gray items-center gap-10 lg:text-xl font-semibold border-b-[3px] border-b-primary-dark-gray">
      <Link
        className={currentPath == "/profile" ? activeLink : "pb-5"}
        to="/profile"
      >
        Posts (123)
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
    </div>
  );
};

export default ProfileNav;
