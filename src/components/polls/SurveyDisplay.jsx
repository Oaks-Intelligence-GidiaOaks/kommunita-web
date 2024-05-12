import React from "react";
import avatar4 from "../../assets/images/sidebar/avatar4.svg";
import verified from "../../assets/images/main/verified.svg";
import { useGetUserProfiileQuery } from "../../service/user.service";
import getTimeAgoString from "../../utils/getTimeAgoString";

const SurveyDisplay = ({ data }) => {
  // console.log(data);
  const { data: user } = useGetUserProfiileQuery();
  // console.log(user.data);
  return (
    <>
      <div className="flex items-center justify-center rounded-lg mb-5">
        <div className="bg-white rounded-lg w-full p-10">
          <div className="flex items-center justify-between mb-11">
            <div className="flex gap-3 items-center">
              <div className="rounded-full border-red-100 border">
                <img src={avatar4} className="w-[40px] h-[40px]" alt="" />
              </div>
              <div>
                <div className="flex gap-2">
                  <p className="post-name pb-1">{user?.data?.display_name}</p>{" "}
                  {user?.data?.isEmailVerified && (
                    <span>
                      <img src={verified} alt="" className="pb-1" />
                    </span>
                  )}
                </div>
                <p className="username">
                  @{user?.data?.username}{" "}
                  <span className="post-time ml-2 font-bold">
                    {getTimeAgoString(data.createdAt)}
                  </span>
                </p>
              </div>
            </div>
          </div>
          {/* QUESTION/ANSWER SECTION */}

          <h2 className="font-semibold text-xl mb-5">
            {data.description || "Enter Survey Description"}
          </h2>

          {data.questions.map((q, i) => (
            <section className="mb-5">
              {/* <div className="flex items-center mb-4 justify-between border-b-2 pb-2 px-3 text-[#a6a6a6]"> */}
              <div className="pb-2 text-[#a6a6a6]">
                <div className="mb-5">
                  <div className="mb-3">
                    <span className="mr-2">{i + 1}</span>
                    <span>{q.question_text}</span>
                  </div>

                  {q.answer_type == "single_choice" &&
                    q.answer_options.map((an, i) => (
                      <div className="flex items-center mb-2 gap-4 flex-1 p-2 bg-gray-100 px-4">
                        <input type="radio" name={an} id="" />
                        <p>{an}</p>
                      </div>
                    ))}
                  {q.answer_type.includes("true" || "false") && (
                    <>
                      <div className="flex items-center mb-2 gap-4 flex-1 p-2 bg-gray-100 px-4">
                        <input type="radio" name="" id="" />
                        <p>True</p>
                      </div>
                      <div className="flex items-center mb-2 gap-4 flex-1 p-2 bg-gray-100 px-4">
                        <input type="radio" name="" id="" />
                        <p>False</p>
                      </div>
                    </>
                  )}
                  {q.answer_type.includes("text") && (
                    <>
                      <div className=" mb-2 gap-4 p-2 bg-gray-100">
                        <input
                          type="textarea"
                          className="bg-transparent w-full focus:ring-0 focus:outline-none border-none"
                          placeholder="Enter Answer here..."
                          name=""
                          id=""
                        />
                      </div>
                    </>
                  )}
                  {q.answer_type.includes("time") && (
                    <>
                      <div className=" mb-2 gap-4 p-2 bg-gray-100">
                        <input
                          type="time"
                          className="bg-transparent w-full focus:ring-0 focus:outline-none border-none"
                          placeholder="Enter Answer here..."
                          name=""
                          id=""
                        />
                      </div>
                    </>
                  )}
                  {q.answer_type.includes("date") && (
                    <>
                      <div className=" mb-2 gap-4 p-2 bg-gray-100">
                        <input
                          type="date"
                          className="bg-transparent w-full focus:ring-0 focus:outline-none border-none"
                          placeholder="Enter Answer here..."
                          name=""
                          id=""
                        />
                      </div>
                    </>
                  )}

                  {q.answer_type == "multiple_choice" &&
                    q.answer_options.map((an, i) => (
                      <div className="flex items-center mb-2 gap-4 flex-1 p-2 bg-gray-100 px-4">
                        <input type="checkbox" name={an} id="" />
                        <p>{an}</p>
                      </div>
                    ))}
                </div>
                {/* <div className="mb-3">
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
                </div> */}
              </div>
              <button className="bg-primary--bright-green w-full rounded-lg p-2 font-semibold text-white">
                Next
              </button>
            </section>
          ))}
        </div>
      </div>
    </>
  );
};

export default SurveyDisplay;
