import React, { useState } from "react";
import MainLayout from "../../components/main/MainLayout";
import Story from "../../components/main/Story";
import { Link } from "react-router-dom";
import SurveyDisplay from "../../components/polls/SurveyDisplay";

const SurveyHome = () => {
  const [link, setLink] = useState("");

  const activeLink =
    "border-b-[5px] border-primary-dark-green text-primary-dark-green pb-4";
  return (
    <MainLayout>
      <Story />

      <div className="mt-8 px-5">
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
          <Link
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
          </Link>
        </div>

        {/* Polls content */}
        <div className="mt-5">
          <SurveyDisplay />
          <SurveyDisplay />
          <SurveyDisplay />
          <SurveyDisplay />
        </div>
      </div>
    </MainLayout>
  );
};

export default SurveyHome;
