import React, { useState } from "react";
import Profile from "./../sidebar/Profile";
import MenuItems from "./../sidebar/MenuItems";

const MobileProfile = () => {
  const [show, setShow] = useState(false);

  return (
    <div className="bg-[#fff] w-[100%] rounded border-r-[0.5px] h-[100%] flex items-center flex-col mt-3">
      <div className="">
        <Profile />
      </div>
      <div className="mt-3" onClick={() => setShow(!show)}>
        {!show && (
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
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        )}
      </div>
      {show && <MenuItems />}
      <div onClick={() => setShow(!show)}>
        {show && (
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
              d="m4.5 15.75 7.5-7.5 7.5 7.5"
            />
          </svg>
        )}
      </div>
    </div>
  );
};

export default MobileProfile;
