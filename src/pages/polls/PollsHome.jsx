import React, { useState } from "react";
import MainLayout from "../../components/main/MainLayout";
import Story from "../../components/main/Story";
import { Link } from "react-router-dom";
import PollDisplay from "../../components/polls/PollDisplay";
import { useGetPollsQuery } from "../../service/polls.service";
import getTimeAgoString from "../../utils/getTimeAgoString";
import { useGetFeedsQuery } from "../../service/feeds.service";

const PollsHome = () => {
  const { data: polls, isLoading:isLoadingPolls } = useGetPollsQuery();
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
            onClick={() => setLink("")}
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
          {
            isLoadingPolls ? (
              <div className="flex justify-center items-center h-screen">
                <div className="spinner-border text-primary-dark-gray" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) :  !polls?.data?.length || polls?.data == undefined ? (
              <div className="flex items-center flex-col mt-10 justify-center h-auto">
              <img src={search} alt="Search icon" />
              <h2 className="font-bold text-4xl mt-5 mb-5">NO BOOKMARKS YET</h2>
              {/* <p>Follow other users to begin to see posts</p> */}
              <Link to="/explore">
                <p className="text-primary-bright-green mt-2 font-semibold">
                  Click here to explore post and diaries
                </p>
              </Link>
            </div>
            ) : (
              polls?.data
            .filter((it) => !it.expired)
            .map((poll, id) => (
              <PollDisplay
              key={poll._id}
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
            )
            ))
          }
        </div>
      </div>
    </MainLayout>
  );
};

export default PollsHome;
