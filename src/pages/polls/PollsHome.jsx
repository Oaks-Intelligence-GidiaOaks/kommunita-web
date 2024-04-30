import React, { useState } from "react";
import MainLayout from "../../components/main/MainLayout";
import Story from "../../components/main/Story";
import { Link } from "react-router-dom";
import PollDisplay from "../../components/polls/PollDisplay";

const PollsHome = () => {
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
            to="/polls/"
          >
            History
          </Link>
        </div>

        {/* Polls content */}
        <div className="mt-5">
          <PollDisplay />
          <PollDisplay />
          <PollDisplay />
          <PollDisplay />
        </div>
      </div>
    </MainLayout>
  );
};

export default PollsHome;
