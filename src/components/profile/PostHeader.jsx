import React from "react";

const PostHeader = ({ verified }) => {
  return (
    <div className="text-primary-dark-gray flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <div className="border-white w-[37px] h-[36px] overflow-hidden rounded">
          <img
            src="/src/assets/images/gp-thumbnail.jpeg"
            width={37}
            height={36}
            alt="user-thumbnail"
          />
        </div>
        <div className="">
          <div className="flex gap-2">
            <h2>Larry_the_Nigerian_Whinz</h2>
            <img
              src="/src/assets/images/verify_badge.png"
              width={14}
              height={8}
              alt="user-thumbnail"
            />
          </div>
          <p className="text-xs mt-1">
            @Larry9jaWhix . <span className="font-bold">h5</span>
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
    </div>
  );
};

export default PostHeader;
