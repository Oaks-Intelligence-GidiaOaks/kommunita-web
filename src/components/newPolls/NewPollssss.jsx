import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useGetUserProfiileQuery } from "../../service/user.service";
import { FaCheckCircle } from "react-icons/fa";
import { profile_placeholder } from "../../assets/images";
import getTimeAgoString from "../../utils/getTimeAgoString";
import PollTimeLeft from "./PollTimeLeft";

const NewPollssss = ({ poll, onRefresh }) => {
  const { data: user } = useGetUserProfiileQuery();
  const [pollState, setPollState] = useState({
    question: poll.question,
    answers: poll.result,
    pollCount: poll.totalVotes,
    answersWeight: poll.votes.map((sm) => sm.count),
    selectedAnswer: -1,
  });
  const [voted, setVoted] = useState(false);
  const [votedId, setVotedId] = useState("");

  useEffect(() => {
    if (poll.votes.length !== 0) {
      poll.votes.forEach((vt) => {
        if (vt.user_id === user?.data?._id) {
          setVoted(true);
          setVotedId(vt.option_index);
        }
      });
    }
  }, [user, poll.votes]);

  const token = useSelector((state) => state.user?.token);

  const handleSubmitPoll = async (idx) => {
    const data = {
      poll_id: poll._id,
      option_index: idx,
    };

    const apiUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

    try {
      const response = await axios.post(`${apiUrl}/user/poll/vote`, data, {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
      console.log("Post submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting post:", error);
      showAlert(
        "Oops!",
        error?.response?.data?.message || "An error occurred",
        "error"
      );
    } finally {
      onRefresh();
    }
  };

  const markAnswer = (i) => {
    const newCount = voted ? pollState.pollCount : pollState.pollCount + 1;
    const newAns = pollState.answers.map((ans) => {
      if (ans.option_index === votedId && ans.option_index !== i.option_index) {
        const ct = ans.count - 1;
        return { ...ans, count: ct, percentage: (ct * 100) / newCount };
      } else if (ans.option_index === votedId && ans.option_index === i.option_index) {
        return ans;
      } else if (ans.option_index !== votedId && ans.option_index === i.option_index) {
        const ct = ans.count + 1;
        setVotedId(i.option_index);
        return { ...ans, count: ct, percentage: (ct * 100) / newCount };
      } else {
        return { ...ans, percentage: (ans.count * 100) / newCount };
      }
    });
    setPollState({ ...pollState, answers: newAns, pollCount: newCount });
    handleSubmitPoll(i.option_index);
  };

  const getLeadingOption = () => {
    return pollState.answers.reduce((max, option) =>
      option.percentage > max.percentage ? option : max
    );
  };

  const leadingOption = getLeadingOption();

  return (
    <div className="flex items-center justify-center mt-5 rounded-lg mb-5">
      <div className="bg-white rounded-lg w-full p-10">
        <div className="flex items-center justify-between mb-11">
          <div className="flex gap-3 items-center">
            <div className="rounded-full border-red-100 border">
              <img
                src={poll.created_by?.photo_url || profile_placeholder}
                className="w-[40px] h-[40px]"
                alt="avatar"
              />
            </div>
            <div>
              <div className="flex gap-2">
                <p className="post-name pb-1">
                  {poll.created_by?.display_name || "Peterson Lake"}
                </p>{" "}
                {poll.verifiedUser && (
                  <span>
                    <FaCheckCircle className="pb-1" />
                  </span>
                )}
              </div>
              <p className="username">
                @{poll.created_by?.username || "malenxe"}{" "}
                <span className="post-time ml-2 font-bold">
                  {getTimeAgoString(poll?.createdAt)}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-end mb-5">
          <h2 className="font-semibold text-xl">{pollState.question}</h2>
          <PollTimeLeft targetDate={poll?.duration} />
        </div>
        <section>
          {pollState.answers?.map((option, id) => (
            <div
              key={id}
              onClick={() => !poll.expired && markAnswer(option)}
              className={`flex relative cursor-pointer items-center mb-4 justify-between rounded-lg text-gray-400 border-b-2 ${
                option.option_index === leadingOption.option_index
                  ? "border-[#2CC84A] border-2"
                  : ""
              }`}
            >
              <div
                style={{
                  width: option.percentage === 0 ? "0" : option.percentage + "%",
                  backgroundColor: option.percentage === 0 && "#fff",
                }}
                className={`flex ${
                  poll.expired ? "bg-gray-600" : "bg-[#2CC84A4D] bg-opacity-30"
                } justify-between h-[50px] relative items-center gap-4 p-1 rounded-tl-lg rounded-tr-full rounded-br-full px-2 overflow-visible `}
              >
                <p className="mr-3">{option.option_index + 1}.</p>
                <div className="absolute left-7 lg:left-10 bg-border-none w-[300px] flex-1 ">
                  {option.option}
                </div>
              </div>
              <div className="z-50 absolute right-14">
                <span className="text-gray-400 text-sm">
                  {Math.round(option.percentage) + "%"}
                </span>
                <span className="lg:ml-6 ml-2 percentage-value text-sm mr-2">
                  {option.count} votes
                </span>
              </div>
            </div>
          ))}
          <div className="flex justify-end">
            <button className="flex text-gray-400 self-end mb-4 items-center gap-2">
              {pollState.pollCount} Votes
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default NewPollssss;
