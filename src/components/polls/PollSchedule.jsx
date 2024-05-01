import React, { useEffect, useState } from "react";
import PollSurveyHeader from "./PollSurveyHeader";

const PollSchedule = ({ onclick }) => {
  // let count = 1;
  let ops = ["Option"];
  const [options, setOptions] = useState(ops);

  const render = () => {
    setOptions(ops);
  };

  const handleOptionIncrease = () => {
    ops.push(`New option`);
    render();
  };
  const handleOptionDecrease = () => {
    ops.pop();
    render();
  };

  // useEffect(() => {
  //   setOptions[ops];
  // }, [ops, render]);

  return (
    <div className="w-screen h-screen flex items-center justify-center rounded-lg">
      <div className="bg-white relative rounded-lg md:w-[400px] lg:w-[500px] p-10">
        <div
          className="absolute top-2 right-2 cursor-pointer hover:bg-slate-400"
          onClick={onclick}
        >
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
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>
        <PollSurveyHeader title={"Create Poll"} />
        <input
          type="text"
          className="border-none w-full mb-2"
          placeholder="Ask a question..."
        />
        <section>
          {options.map((option, id) => (
            <div
              key={id}
              className="flex items-center mb-4 justify-between bg-gray-100"
            >
              <input
                type="text"
                className="bg-transparent border-none flex-1"
                placeholder={option}
              />
              <svg
                onClick={handleOptionDecrease}
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
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </div>
          ))}

          <div className="flex justify-end">
            <button
              className="flex self-end mb-4 items-center text-[#a6a6a6] gap-2"
              onClick={handleOptionIncrease}
            >
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
              add option
            </button>
          </div>
          <div className="flex items-center mb-4 justify-between bg-gray-100 px-3">
            <div className="flex items-center">
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
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <input
                type="text"
                className="w-full flex-1 bg-transparent outline-none border-none"
                placeholder="Duration"
              />
            </div>
          </div>
        </section>
        <button className="bg-primary--bright-green w-full rounded-lg p-2 font-semibold text-white">
          Start Poll
        </button>
      </div>
    </div>
  );
};

export default PollSchedule;
