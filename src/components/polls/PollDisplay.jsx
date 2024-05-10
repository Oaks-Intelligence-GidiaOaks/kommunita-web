import React from "react";
import avatar4 from "../../assets/images/sidebar/avatar4.svg";
import verified from "../../assets/images/main/verified.svg";
import { LeafPoll } from "react-leaf-polls";
import "react-leaf-polls/dist/index.css";
import { useEffect } from "react";
import { useState } from "react";
import { showAlert } from "../../static/alert";
import axios from "axios";
import { useSelector } from "react-redux";
import { useGetUserProfiileQuery } from "../../service/user.service";

const PollDisplay = ({
  question,
  avatar,
  fullname,
  username,
  verifiedUser,
  postTime,
  pollId,
  votes,
  totalVotes,
  result,
  onRefresh,
  expired,
}) => {
  const { data: user } = useGetUserProfiileQuery();
  // console.log(user?.data?._id);
  const [poll, setPoll] = useState({
    question,
    answers: result,
    pollCount: totalVotes,
    answersWeight: votes.map((sm) => {
      return sm.count;
    }),
    selectedAnswer: -1,
  });
  const [poll_id, setPoll_id] = useState(pollId);
  const [voted, setVoted] = useState(false);
  const [votedId, setVotedId] = useState("");
  // console.log(expired);
  useEffect(() => {
    if (votes.length != 0) {
      votes.map((vt) => {
        if (vt.user_id == user?.data?._id) {
          setVoted(true);
          setVotedId(vt.option_index);
        }
      });
    }
  }, [user]);

  const token = useSelector((state) => state.user?.token);

  const handleSubmitPoll = async (idx) => {
    console.log(poll_id, idx);
    if ((poll_id && idx != undefined) || null) {
      const data = {
        poll_id,
        option_index: idx,
      };
      console.log(data);
      // setSubmitting(true);
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
        // setSubmitting(false);
      }
    }
  };

  function markAnswer(i) {
    const newCount = voted ? poll.pollCount : poll.pollCount + 1;
    if (voted) {
      let op_index = 0;
      const newAns = poll.answers.map((ans) => {
        if (
          ans.option_index === votedId &&
          ans.option_index !== i.option_index
        ) {
          const ct = ans.count - 1;
          const np = {
            ...ans,
            count: ct,
            percentage: (ct * 100) / newCount,
          };
          return np;
          // console.log(np);
        } else if (
          ans.option_index === votedId &&
          ans.option_index === i.option_index
        ) {
          return ans;
        } else if (
          ans.option_index !== votedId &&
          ans.option_index === i.option_index
        ) {
          op_index = i.option_index;
          const ct = ans.count + 1;
          const np = {
            ...ans,
            count: ct,
            percentage: (ct * 100) / newCount,
          };
          setVotedId(i.option_index);
          return np;
        } else {
          const ct = ans.count;
          const np = { ...ans, percentage: (ct * 100) / newCount };
          return np;
        }
      });
      setPoll({ ...poll, answers: newAns, pollCount: newCount });
      handleSubmitPoll(op_index);
      return;
    }

    // console.log(i);
    let op_index = 0;
    const newAns = poll.answers.map((ans) => {
      if (ans.option === i.option) {
        op_index = i.option_index;
        const ct = ans.count + 1;
        const np = { ...ans, count: ct, percentage: (ct * 100) / newCount };
        setVoted(true);
        setVotedId(i.option_index);
        return np;
        // console.log(np);
      } else {
        const ct = ans.count;
        const np = { ...ans, percentage: (ct * 100) / newCount };
        return np;
      }
    });
    // console.log(newAns);
    setPoll({ ...poll, answers: newAns, pollCount: newCount });

    handleSubmitPoll(op_index);
  }
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
            <h2 className="font-semibold text-xl">{poll.question}</h2>
            {/* <p className="text-[#2D2B2B]">04:32</p> */}
          </div>
          <section>
            {poll.answers?.map((option, id) => (
              <div
                key={id}
                onClick={() => !expired && markAnswer(option)}
                className="flex relative cursor-pointer items-center mb-4 justify-between border-2 rounded-lg text-white bg-slate-400"
              >
                <div
                  style={{
                    width:
                      option.percentage === 0 ? "0" : option.percentage + "%",
                    backgroundColor: option.percentage === 0 && "#94a3b8d9",
                  }}
                  className={`flex ${
                    expired ? "bg-gray-600" : "bg-primary-dark-green"
                  } justify-between h-[50px] relative items-center gap-4 p-1 rounded-lg px-2`}
                >
                  <p>{option.option_index + 1}.</p>
                  <div
                    style={{ width: "200px" }}
                    className="bg-border-none absolute left-10 flex-1 "
                  >
                    {option.option}
                  </div>
                  <span style={{}} className="text-black ml-20">
                    {Math.round(option.percentage) + "%"}
                  </span>
                </div>
                <span className="absolute right-0 bottom-0 percentage-value mr-2">
                  {option.count} votes
                </span>
              </div>
            ))}

            <div className="flex justify-end">
              <button className="flex text-[#2D2B2B] self-end mb-4 items-center gap-2">
                {poll.pollCount} Votes
              </button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default PollDisplay;
