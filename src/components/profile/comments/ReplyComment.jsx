import React from "react";

const ReplyComment = () => {
  return (
    <div className="relative bg-primary-light-gray bg-opacity-10 p-2 rounded-lg mt-5 text-primary-dark-gray">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-start">
          <div className="border-white w-[13px] h-[13px] overflow-hidden rounded">
            <img
              src="/src/assets/images/gp-thumbnail.jpeg"
              width={13}
              height={13}
              alt="user-thumbnail"
            />
          </div>

          <div className="">
            <div>
              <h2 className="font-semibold -mt-[6px]">Shan Alam</h2>
            </div>
            <div>
              <p className="text-xs mt-1  font-semibold">Thankz!!</p>
            </div>
            <div className="flex text-[7px] gap-2 text-primary-gray">
              <p className="cursor-pointer">Like</p>
              <p className="cursor-pointer">Reply</p>
            </div>
          </div>
        </div>

        <div className="cursor-pointer">
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
      </div>
    </div>
  );
};

export default ReplyComment;
