import React from "react";
import avatar4 from "../../assets/images/sidebar/avatar4.svg";
import verified from "../../assets/images/main/verified.svg";

const SurveyDisplay = ({
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
          {/* QUESTION/ANSWER SECTION */}

          <h2 className="font-semibold text-xl mb-5">
            {question || "Enter Survey Question"}
          </h2>

          <section>
            {/* <div className="flex items-center mb-4 justify-between border-b-2 pb-2 px-3 text-[#a6a6a6]"> */}
            <div className="mb-4 pb-2 text-[#a6a6a6]">
              <div className="mb-5">
                <div className="mb-3">
                  <p>1. What is the cost of fuel in your area</p>
                </div>
                <div className="flex items-center mb-2 gap-4 flex-1 p-2 bg-gray-100 px-4">
                  <input type="radio" name="" id="" />
                  <p>450</p>
                </div>
                <div className="flex items-center mb-2 gap-4 flex-1 p-2 bg-gray-100 px-4">
                  <input type="radio" name="" id="" />
                  <p>450</p>
                </div>
                <div className="flex items-center mb-2 gap-4 flex-1 p-2 bg-gray-100 px-4">
                  <input type="radio" name="" id="" />
                  <p>450</p>
                </div>
              </div>
              <div className="mb-3">
                <div className="mb-3">
                  <p>1. What is electricity tariff cost in your area</p>
                </div>
                <div className="flex items-center mb-2 gap-4 flex-1 p-2 bg-gray-100 px-4">
                  <input
                    type="text"
                    className="bg-transparent outline-none border-none flex-1"
                    name=""
                    id=""
                    placeholder="write your bio here..."
                  />
                </div>
              </div>
            </div>
            <button className="bg-primary--bright-green w-full rounded-lg p-2 font-semibold text-white">
              Next
            </button>
          </section>
        </div>
      </div>
    </>
  );
};

export default SurveyDisplay;
