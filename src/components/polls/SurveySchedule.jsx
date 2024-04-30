import React from "react";
import PollSurveyHeader from "./PollSurveyHeader";

const SurveySchedule = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center rounded-lg">
      <div className="bg-white rounded-lg md:w-[400px] lg:w-[500px] p-10">
        <PollSurveyHeader title={"Create Survey"} />
        <p className="text-xl text-[#a6a6a6] font-semibold my-5">
          Survey Topic
        </p>
        <input
          type="text"
          className="border-none w-full mb-2"
          placeholder="Ask a question..."
        />
        <section>
          <div className="flex items-center mb-4 justify-between bg-gray-100">
            {/* <input
              disabled
              type="text"
              className="bg-transparent border-none flex-1"
              placeholder="Answer Type"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#a6a6a6"
              className="w-6 h-6 cursor-pointer mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />

            </svg> */}
            <select className="bg-transparent border-none flex-1 text-[#a6a6a6]">
              <option value="" disabled className="block">
                Ask a question...
              </option>
              <option value="multiple choice" className="block">
                multiple choice
              </option>
              <option value="Single choice" className="block">
                Single choice
              </option>
              <option value="Text" className="block">
                Text
              </option>
              <option value="True" className="block">
                True or False
              </option>
              <option value="Time" className="block">
                Time
              </option>
              <option value="Date" className="block">
                Date
              </option>
            </select>
          </div>

          <div className="flex justify-end">
            <button className="flex self-end mb-4 items-center text-[#a6a6a6] gap-2">
              <p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#a6a6a6"
                  className="w-6 h-6 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </p>
              add Question
            </button>
          </div>
        </section>
        <button className="bg-primary--bright-green w-full rounded-lg p-2 font-semibold text-white">
          Create
        </button>
      </div>
    </div>
  );
};

export default SurveySchedule;
