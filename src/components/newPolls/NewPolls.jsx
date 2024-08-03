import getTimeAgoString from "../../utils/getTimeAgoString";
import { useGetPollsQuery } from "../../service/polls.service";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const NewPolls = () => {
  const { data, isLoading } = useGetPollsQuery();
  console.log(data?.data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const verifiedUser = false;

  return (
    <div>
      {data?.data.map((poll, index) => (
        <div
          className="max-w-xl mx-auto p-4 bg-white rounded-lg shadow-lg"
          key={index}
        >
          <div className="flex items-center mb-4">
            <img
              src={poll.created_by?.photo_url}
              alt="profile"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="ml-4">
              <div className="flex items-center">
                <span className="font-semibold">
                  {poll.created_by?.display_name}
                </span>
                {verifiedUser && (
                  <FaCheckCircle className="ml-2 text-blue-500" />
                )}
              </div>
              <span className="text-gray-500">
                @{poll.created_by?.username} · <span>{getTimeAgoString(poll.createdAt)}</span>
              </span>
            </div>
          </div>

          <h2 className="text-xl font-bold mb-4">{poll.question}</h2>

          <div className="space-y-2">
            {poll.result?.map((option, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-2 rounded-lg ${
                  option?.percentage > 0
                    ? "bg-[#2CC84A4D] border border-[#3D7100]"
                    : "bg-gray-100"
                }`}
              >
                <span>
                  {index + 1}. {option.option}
                </span>
                <div className="flex items-center">
                  <span className="mr-2">{option?.count} votes</span>
                  <span>{option?.percentage}%</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-gray-500">{poll.totalVotes} votes</div>
        </div>
      ))}
    </div>
  );
};

export default NewPolls;