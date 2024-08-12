import React, { useState } from "react";
import MainLayout from "../../components/main/MainLayout";
import Story from "../../components/main/Story";
import { Link } from "react-router-dom";
import PollDisplay from "../../components/polls/PollDisplay";
import {
  useGetPollHistoryQuery,
  useGetPollsQuery,
} from "../../service/polls.service";
import getTimeAgoString from "../../utils/getTimeAgoString";
import { useGetFeedsQuery } from "../../service/feeds.service";
import { Spinner } from "flowbite-react";
import search from "../../assets/images/Home/Search.png";


const PollHistory = () => {
  const { data: polls, isLoading } = useGetPollHistoryQuery();
  const { refetch } = useGetFeedsQuery();
  console.log(polls?.data);

  return (
    <>
      {/* <Story /> */}
      <div className="mt-8 px-5">
        {isLoading ? (
          <Spinner />
        ) : !polls?.data?.length || polls?.data == undefined ? (
          <div className="flex items-center flex-col mt-10 justify-center h-auto">
            <img src={search} alt="Search icon" />
            <h2 className="font-bold text-4xl mt-5 mb-5">NO DATA FOUND</h2>
          </div>
        ) : (
          <div className="mt-5">
            {polls?.data.map((poll) => (
              <PollDisplay key={poll._id} {...poll} onRefresh={refetch} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default PollHistory;
