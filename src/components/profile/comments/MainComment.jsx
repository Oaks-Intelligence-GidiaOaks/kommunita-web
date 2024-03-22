import React from "react";
import ReplyComment from "./ReplyComment";

const MainComment = () => {
  return (
    <div className="relative mt-5 text-primary-dark-gray ">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <div className="border-white w-[40px] h-[38px] overflow-hidden rounded">
            <img
              src="/src/assets/images/gp-thumbnail.jpeg"
              width={40}
              height={38}
              alt="user-thumbnail"
            />
          </div>
          <div className="">
            <div className="flex gap-2 font-semibold">
              <h2>User Name</h2>
              <h2>.</h2>
              <h2>30mins ago</h2>
            </div>
            <p className="text-xs mt-1  font-semibold">
              #GetThusLook For NewYear by Zara @Rs2789/-
            </p>
          </div>
        </div>
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
            d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
          />
        </svg>
        {/* This is the comment reply section */}
        <div className="absolute top-11 left-[5%]">
          <svg
            width="23"
            height="21"
            viewBox="0 0 23 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.28906 0.675354V12.2966C1.28906 16.6919 4.85219 20.255 9.24754 20.255H22.2761"
              stroke="#0E0E0E"
              strokeOpacity="0.6"
              strokeWidth="0.795847"
              strokeDasharray="1.59 1.59"
            />
          </svg>
        </div>
      </div>
      <div className="ml-11 -mt-4">
        <ReplyComment />
      </div>
    </div>
  );
};

export default MainComment;
