import React, { useState } from "react";
import MainLayout from "../../components/main/MainLayout";
import Story from "../../components/main/Story";
import { Link } from "react-router-dom";
import PollDisplay from "../../components/polls/PollDisplay";
import { useGetPollHistoryQuery, useGetPollsQuery } from "../../service/polls.service";
import getTimeAgoString from "../../utils/getTimeAgoString";
import { useGetFeedsQuery } from "../../service/feeds.service";
import { Spinner } from "flowbite-react";

const PollHistory = () => {
  const { data: polls, isLoading } = useGetPollHistoryQuery();
  const { refetch } = useGetFeedsQuery();
  console.log(polls?.data);

  const [link, setLink] = useState("");

  const activeLink =
    "border-b-[5px] border-primary-dark-green text-primary-dark-green pb-4";
  return (
    <>
      {/* <Story /> */}
      <div className="mt-8 px-5">
      {
        isLoading ? (
          <Spinner />
        ) : (
          <div className="mt-5">
          {polls?.data.map((poll) => (
              <PollDisplay key={poll._id} {...poll} onRefresh={refetch} />
            ))}
        </div>
        )
      }
      </div>
    </>
  );
};

export default PollHistory;
