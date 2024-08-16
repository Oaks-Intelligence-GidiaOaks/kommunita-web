import React, { useState } from "react";
import MainLayout from "../../components/main/MainLayout";
import Story from "../../components/main/Story";
import { Link } from "react-router-dom";
import SurveyDisplay from "../../components/polls/SurveyDisplay";
import { useSelector } from "react-redux";
import { useGetSurveyFeedsQuery } from "../../service/survey.service";
import { Spinner } from "flowbite-react";
import search from "../../assets/images/Home/Search.png";

const SurveyHome = () => {
  const [link, setLink] = useState("");

  const activeLink =
    "border-b-[5px] border-primary-dark-green text-primary-dark-green pb-4";

  const { data, isFetching } = useGetSurveyFeedsQuery();
  const surveyFeeds = data?.data;
  const user_id = useSelector((state) => state.user.user._id);
  // console.log(surveyFeeds);

  // Filter out surveys where the user ID already exists in the list of respondents
  const filteredSurveyFeeds = surveyFeeds?.filter((survey) => {
    // Check if any respondent has the same user ID
    const isUserRespondent = survey?.respondents?.some(
      (respondent) => respondent?.respondent?._id === user_id
    );
    console.log(isUserRespondent, "check");
    // Return true if the user is not aisUserRespondent respondent to this survey
    return !isUserRespondent;
  });

  return (
    <MainLayout>
      <Story />

      <div className="mt-8 px-5 pb-20">
        <h2 className="font-semibold text-2xl mb-10">Survey</h2>

        {/* Navigation */}
        <div className="flex text-primary-dark-gray items-center gap-10 lg:text-xl font-semibold border-b-[3px] border-b-primary-dark-gray">
          <Link
            onClick={() => setLink("")}
            className={link == "" ? activeLink : "pb-5"}
            to="/survey"
          >
            Active Survey
          </Link>
          {/* <Link
            onClick={() => setLink("history")}
            className={link == "history" ? activeLink : "pb-5"}
            to="/survey/"
          >
            History
          </Link>
          <Link
            onClick={() => setLink("analytics")}
            className={link == "analytics" ? activeLink : "pb-5"}
            to="/survey/"
          >
            Analytics
          </Link> */}
        </div>

        {/* Polls content */}
        <div className="mt-5 mb-5">
          {isFetching ? (
            <div className="flex justify-center items-center mt-5">
              <Spinner />
            </div>
          ) : filteredSurveyFeeds && filteredSurveyFeeds?.length > 0 ? (
            filteredSurveyFeeds?.map((row, idx) => (
              <>
                <SurveyDisplay key={idx} data={row} />
              </>
            ))
          ) : (
            <div className="flex items-center flex-col mt-10 justify-center h-auto">
              <img src={search} alt="Search icon" />
              <h2 className="font-bold text-4xl mt-5 mb-5">
                No Active Surveys
              </h2>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default SurveyHome;
