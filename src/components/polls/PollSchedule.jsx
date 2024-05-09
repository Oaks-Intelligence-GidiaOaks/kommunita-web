import React, { useEffect, useState } from "react";
import PollSurveyHeader from "./PollSurveyHeader";
import axios from "axios";
import { useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import { showAlert } from "../../static/alert";
import DateTimePicker from "react-datetime-picker";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
const PollSchedule = ({ onclick }) => {
  // let count = 1;
  // let ops = ["Option"];
  const [options, setOptions] = useState([]);
  const [pollQuestion, setPollQuestion] = useState("");
  const [audience, setAudience] = useState("Public");
  const [duration, setDuration] = useState(new Date());
  const [submitting, setSubmitting] = useState("");

  // const [value, onC] = useState(new Date());

  const [openAddOption, setOpenAddOption] = useState(false);

  const token = useSelector((state) => state.user?.token);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      question: pollQuestion,
      options,
      audience,
      duration,
    };
    console.log(data);
    setSubmitting(true);
    const apiUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

    try {
      const response = await axios.post(`${apiUrl}/user/poll`, data, {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      console.log("Post submitted successfully:", response.data);

      setOptions([]);
      setAudience("");
      setDuration("");
      setPollQuestion("");
    } catch (error) {
      console.error("Error submitting post:", error);
      showAlert(
        "Oops!",
        error?.response?.data?.message || "An error occurred",
        "error"
      );
    } finally {
      setSubmitting(false);
      onclick();
    }
  };

  const handleCloseAddOption = () => {
    setOpenAddOption(false);
  };

  const handleAddOption = (data) => {
    // console.log(options);
    // const length = options.length;
    setOptions([...options, data]);
  };

  const handleOptionDelete = (op) => {
    setOptions(options.filter((p) => p != op));
    // console.log(op);
  };

  const handleSubmit1 = (e) => {
    e.preventDefault();
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
        <div className="flex justify-between items-center">
          <PollSurveyHeader title={"Create Poll"} />
          <div className="flex items-center bg-gray-100 rounded-sm p-2 gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#a6a6a6"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
              />
            </svg>
            <select
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="bg-transparent border-none  focus:outline-none focus:ring-0"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
            {/* <p className="text-[#a6a6a6]">Public</p> */}
            {/* <svg
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
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg> */}
          </div>
        </div>
        <form onSubmit={handleSubmit1}>
          <input
            type="text"
            className="flex-1 focus:outline-none focus:ring-0 border-none w-full mb-2"
            placeholder="Ask a question..."
            value={pollQuestion}
            onChange={(e) => setPollQuestion(e.target.value)}
          />
          <section>
            {options.map((option, id) => (
              <div
                key={id}
                className="flex items-center mb-4 justify-between bg-gray-100"
              >
                <p className=" ml-2 rounded-lg p-2 flex-1">{option}</p>
                <svg
                  onClick={() => handleOptionDelete(option)}
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
                // onClick={handlePlaceholderIncrease}
                onClick={() => setOpenAddOption(true)}
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
                <p className=" text-xs rounded-lg text-primary-green cursor-pointer">
                  Add Option
                </p>
              </button>
            </div>
            {/* <div className="flex w-full flex-1 items-center mb-4 justify-between bg-gray-100 px-3"> */}
            <div className="">
              <div className="w-full flex-1 p-5">
                {/* <svg
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
                </svg> */}

                {/* <input
                  className="w-full focus:outline-none focus:ring-0 flex-1 bg-transparent outline-none border-none"
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  pattern="[0-9]{2}:[0-5][0-9]:[0-5][0-9]"
                  placeholder="Duration: (HH:MM:SS)"
                  required
                /> */}
                <DateTimePickerComponent
                  onChange={(e) => setDuration(e.target.value)}
                  value={duration}
                  format="yyyy-MM-dd HH:mm:ss"
                ></DateTimePickerComponent>
                {/* <DateTimePicker onChange={setDuration} value={duration} /> */}
              </div>
            </div>
          </section>
          <button
            onClick={handleSubmit}
            className="bg-primary--bright-green w-full rounded-lg p-2 font-semibold text-white"
          >
            {submitting ? (
              <BeatLoader color="#ffffff" loading={true} />
            ) : (
              "Start Poll"
            )}
          </button>
        </form>
        {openAddOption && (
          <div className="fixed z-50 bg-gray-300 bg-opacity-50 top-0 left-0 w-screen h-screen">
            <AddOption
              onclick={handleCloseAddOption}
              handleAdd={handleAddOption}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PollSchedule;

const AddOption = ({ onclick, handleAdd }) => {
  const [option, setOption] = useState("");

  const handleSubmit = async (e) => {
    console.log(option);
    e.preventDefault();
    handleAdd(option);
    setOption("");
    onclick();
  };

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
        <form onSubmit={handleSubmit}>
          <input
            className="w-full rounded-lg mb-3"
            type="text"
            placeholder="Enter Option"
            value={option}
            onChange={(e) => setOption(e.target.value)}
          />

          <button className="bg-slate-400 w-full rounded-lg p-2 font-semibold text-white">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};
