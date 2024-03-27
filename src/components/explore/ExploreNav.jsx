import React, { useState } from "react";
import { Link } from "react-router-dom";

const ExploreNav = () => {
  const [link, setLink] = useState("");
  //   const link = window.location.pathname;

  const activeLink =
    "border-b-[5px] border-primary-dark-green text-primary-dark-green pb-4";
  return (
    <div className="flex text-primary-dark-gray items-center gap-10 lg:text-xl font-semibold border-b-[3px] border-b-primary-dark-gray">
      <Link
        onClick={() => setLink("")}
        className={link == "" ? activeLink : "pb-5"}
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
    </div>
  );
};

export default ExploreNav;
