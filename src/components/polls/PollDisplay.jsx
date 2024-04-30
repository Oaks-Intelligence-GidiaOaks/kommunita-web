import React from "react";
import avatar4 from "../../assets/images/sidebar/avatar4.svg";
import verified from "../../assets/images/main/verified.svg";

const PollDisplay = ({
  question,
  avatar,
  fullname,
  username,
  verifiedUser,
  postTime,
  options,
}) => {
  return (
    <>
      <div className="flex items-center justify-center rounded-lg mb-5">
        <div className="bg-white rounded-lg w-full p-10">
          <div className="flex items-center justify-between mb-11">
            <div className="flex gap-3 items-center">
              <div className="rounded-full border-red-100 border">
                <img
                  src={avatar || avatar4}
                  className="w-[40px] h-[40px]"
                  alt=""
                />
              </div>
              <div>
                <div className="flex gap-2">
                  <p className="post-name pb-1">
                    {fullname || "Peterson Lake"}
                  </p>{" "}
                  {verifiedUser && (
                    <span>
                      <img src={verified} alt="" className="pb-1" />
                    </span>
                  )}
                </div>
                <p className="username">
                  @{username || "malenxe"}{" "}
                  <span className="post-time ml-2 font-bold">
                    {postTime || "5h"}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mb-5">
            <h2 className="font-semibold text-xl">
              {question || "Enter Question Prop"}
            </h2>
            <p className="text-[#2D2B2B]">04:32</p>
          </div>
          <section>
            <div className="flex items-center mb-4 justify-between border-b-2 pb-2 px-3 text-[#a6a6a6]">
              <div className="flex items-center gap-4 flex-1">
                <p>1.</p>
                <input
                  type="text"
                  className="bg-transparent border-none flex-1"
                  placeholder="Option #1"
                />
              </div>
              <div className="flex items-center gap-2">
                <p className="text-xs">3124 votes</p>
                <p className="text-[#2D2B2B]">20%</p>
              </div>
            </div>
            <div className="flex items-center mb-4 justify-between border-b-2 pb-2 px-3 text-[#a6a6a6]">
              <div className="flex items-center gap-4 flex-1">
                <p>2.</p>
                <input
                  type="text"
                  className="bg-transparent border-none flex-1"
                  placeholder="Option #2"
                />
              </div>
              <div className="flex items-center gap-2">
                <p className="text-xs">3124 votes</p>
                <p className="text-[#2D2B2B]">20%</p>
              </div>
            </div>
            <div className="flex items-center mb-4 justify-between border-b-2 pb-2 px-3 text-[#a6a6a6]">
              <div className="flex items-center gap-4 flex-1">
                <p>3.</p>
                <input
                  type="text"
                  className="bg-transparent border-none flex-1"
                  placeholder="Option #3"
                />
              </div>
              <div className="flex items-center gap-2">
                <p className="text-xs">3124 votes</p>
                <p className="text-[#2D2B2B]">20%</p>
              </div>
            </div>

            <div className="flex justify-end">
              <button className="flex text-[#2D2B2B] self-end mb-4 items-center gap-2">
                3042 Votes
              </button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default PollDisplay;
