import { useEffect, useState } from "react";
import PollSurveyHeader from "./PollSurveyHeader";
// import axios from "axios";
// import { useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import { showAlert } from "../../static/alert";
// import DateTimePicker from "react-datetime-picker";
// import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import rtkMutation from "../../utils/rtkMutation";
import { useCreatePollMutation } from "../../service/polls.service";
import { BiWorld } from "react-icons/bi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoTimeOutline } from "react-icons/io5";
import { LiaTimesCircle } from "react-icons/lia";
import { useGetFeedsQuery } from "../../service/feeds.service";

const PollSchedule = ({ onclick }) => {
  const [createPoll, { error, isSuccess }] = useCreatePollMutation();
  const { refetch } = useGetFeedsQuery();
  // let count = 1;
  // let ops = ["Option"];
  const [options, setOptions] = useState([]);
  const [pollQuestion, setPollQuestion] = useState("");
  const [audience, setAudience] = useState("Public");
  const [duration, setDuration] = useState(null);
  const [submitting, setSubmitting] = useState("");

  const [openAddOption, setOpenAddOption] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      question: pollQuestion,
      options,
      audience,
      duration,
    };
    setSubmitting(true);
    try {
      await rtkMutation(createPoll, postData);
      setOptions([]);
      setAudience("");
      setDuration("");
      setPollQuestion("");
      refetch();
    } catch (error) {
      console.error("Error liking post:", error);
      showAlert("Oops", "An error occurred while liking the post", "error");
    } finally {
      setSubmitting(false);
      onclick();
    }
  };

  useEffect(() => {
    if (isSuccess) {
      console.log("success");
      refetch();
    } else if (error) {
      // showAlert("Oops", error.data.message || "An error occurred", "error");
      showAlert("Oops", "An error occurred", "error");
    }
  }, [isSuccess, error, refetch]);

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

  return (
    <div className="w-screen h-screen flex items-center justify-center rounded-lg px-2">
      <div className="bg-white relative z-40 rounded-lg w-full max-w-[685px] h-auto p-4 md:p-10">
        <div className="flex justify-between items-center">
          <PollSurveyHeader title={"Create Poll"} color={"#3D7100"} />
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-gray-100 rounded-sm px-2 gap-2">
              <BiWorld size={20} className="text-[#3D7100]" />

              <select
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="bg-transparent border-none  focus:outline-none focus:ring-0"
              >
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
            </div>
            <div
              className="cursor-pointer hover:bg-red-500 hover:text-white rounded-full"
              onClick={onclick}
            >
              <LiaTimesCircle size={25} />
            </div>
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
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#a6a6a6"
                    className="w-4 h-4 cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </>
                <span className=" text-xs rounded-lg text-primary-green cursor-pointer">
                  Add Option
                </span>
              </button>
            </div>
            {/* <div className="flex w-full flex-1 items-center mb-4 justify-between bg-gray-100 px-3"> */}
            <div className="w-full pb-5">
              <div className="w-full bg-[#F4F4F4] border">
                <DatePicker
                  selected={duration}
                  onChange={(date) => setDuration(date)}
                  showTimeSelect
                  showIcon
                  icon={
                    <IoTimeOutline className="text-center text-[#A6A6A6] " />
                  }
                  dateFormat="Pp"
                  placeholderText="Duration"
                  className="w-full border-none text-[#A6A6A6] bg-[#F4F4F4] flex items-center p-2 rounded ring-0 focus:ring-transparent font-Inter text-[14px] justify-center"
                />
              </div>
            </div>
          </section>
          <button
            onClick={handleSubmit}
            className="bg-[#3D7100] w-full rounded-lg p-2 font-semibold text-white"
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
          className="absolute top-2 right-2 cursor-pointer hover:bg-red-500 hover:text-white rounded-full"
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

          <button
            className={`${
              option ? "bg-[#3D7100]" : "bg-[#afc595]"
            } w-full rounded-lg p-2 font-semibold text-white`}
            disabled={!option}
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};
