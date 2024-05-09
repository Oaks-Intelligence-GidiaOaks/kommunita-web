import React, { useState } from "react";
import MainLayout from "../../components/main/MainLayout";
import Story from "../../components/main/Story";
import { Link } from "react-router-dom";
import PollDisplay from "../../components/polls/PollDisplay";
import { useGetPollsQuery } from "../../service/polls.service";
import getTimeAgoString from "../../utils/getTimeAgoString";
import { useGetFeedsQuery } from "../../service/feeds.service";

const PollHistory = () => {
  const { data: polls } = useGetPollsQuery();
  const { refetch } = useGetFeedsQuery();
  console.log(polls?.data);

  const [link, setLink] = useState("");

  const activeLink =
    "border-b-[5px] border-primary-dark-green text-primary-dark-green pb-4";
  return (
    <MainLayout>
      <Story />
      <div className="mt-8 px-5">
        <h2 className="font-semibold text-2xl mb-10">Polls</h2>

        {/* Navigation */}
        <div className="flex text-primary-dark-gray items-center gap-10 lg:text-xl font-semibold border-b-[3px] border-b-primary-dark-gray">
          <Link
            onClick={() => setLink("polls")}
            className={link == "" ? activeLink : "pb-5"}
            to="/polls"
          >
            Active Polls
          </Link>
          <Link
            onClick={() => setLink("history")}
            className={link == "history" ? activeLink : "pb-5"}
            to="/polls/history"
          >
            History
          </Link>
        </div>

        {/* Polls content */}
        <div className="mt-5">
          {polls?.data
            .filter((it) => it.expired)
            .map((poll, id) => (
              <PollDisplay
                key={id}
                expired={poll.expired}
                question={poll?.question}
                fullname={poll.created_by.display_name}
                username={poll.created_by.username}
                pollId={poll._id}
                votes={poll.votes}
                result={poll.result}
                onRefresh={refetch}
                totalVotes={poll.totalVotes}
                postTime={getTimeAgoString(poll.createdAt)}
              />
            ))}
          {/* <PollDisplay /> */}
        </div>
      </div>
    </MainLayout>
  );
};

export default PollHistory;
