import React, { useState } from "react";
import MainLayout from "../../components/main/MainLayout";
import Story from "../../components/main/Story";
import { Link } from "react-router-dom";
import PollDisplay from "../../components/polls/PollDisplay";
import {
  useGetActivPollQuery,
  useGetPollsQuery,
} from "../../service/polls.service";
import getTimeAgoString from "../../utils/getTimeAgoString";
import { useGetFeedsQuery } from "../../service/feeds.service";
import search from "../../assets/images/Home/Search.png";
import NewPollssss from "../../components/newPolls/NewPollssss";
import { Spinner } from "flowbite-react";

const PollsHome = () => {
  const {
    data: polls,
    isLoading: isLoadingPolls,
    isFetching,
  } = useGetActivPollQuery();
  const { refetch } = useGetFeedsQuery();
  console.log(polls?.data, "polls data");

  return (
    <>
      {/* <Story /> */}
      <div className="mt-8 px-5">
        <div className="mt-5">
          {isFetching ? (
            <div className="flex justify-center items-center mt-5">
              <Spinner />
            </div>
          ) : !polls?.data?.length || polls?.data == undefined ? (
            <div className="flex items-center flex-col mt-10 justify-center h-auto">
              <img src={search} alt="Search icon" />
              <h2 className="font-bold text-4xl mt-5 mb-5 text-center">
                NO ACTIVE POLL
              </h2>
            </div>
          ) : (
            polls?.data.map((poll) => (
              <NewPollssss
                key={poll?.post?._id}
                poll={poll}
                onRefresh={refetch}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default PollsHome;
