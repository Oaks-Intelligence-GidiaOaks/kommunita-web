import React from "react";
import avatar2 from "../../assets/images/sidebar/avatar2.svg";
import avatar4 from "../../assets/images/sidebar/avatar4.svg";

const MessageCard = ({ message }) => {
  return (
    <div className="flex gap-5 p-4 items-start border-b-[1px] bg-white">
      <div>
        <img
          className="ml-3 rounded-lg w-[35px] h-[35px] object-cover"
          src={avatar2}
          alt=""
        />
      </div>
      <div>
        <h2 className="font-semibold">Jennifer Markus</h2>
        <p className="mb-4 text-sm">
          Hey! were you able to hit the shores of valhala or your couldn't cross
          the four walls of cantata
        </p>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <p>Today</p>
          <p>|</p>
          <p>05:30 PM</p>
        </div>
      </div>
    </div>
  );
};

export default MessageCard;
