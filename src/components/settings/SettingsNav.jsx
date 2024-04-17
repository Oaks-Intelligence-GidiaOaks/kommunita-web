import React from "react";
import { Link } from "react-router-dom";
import { useGetUserProfiileQuery } from "../../service/user.service";

const SettingsNav = () => {
  const currentPath = window.location.pathname;
  // const nonActiveLink =

  const activeLink =
    "border-b-[5px] border-primary-dark-green text-primary-dark-green pb-4";
  return (
    <div className="flex text-primary-dark-gray items-center gap-10 lg:text-xl font-semibold border-b-[3px] border-b-primary-dark-gray">
      <Link
        className={currentPath == "/settings" ? activeLink : "pb-5"}
        to="/settings"
      >
        Profile
      </Link>
      <Link
        className={currentPath == "/settings/password" ? activeLink : "pb-5"}
        to="/settings/password"
      >
        Password & Security
      </Link>
    </div>
  );
};

export default SettingsNav;
