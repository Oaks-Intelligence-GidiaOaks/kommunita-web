import React, { useState } from "react";
import FollowCard from "./FollowCard";
import { AdsSection } from "../ads";
import { useGetUserProfiileQuery } from "../../service/user.service";
import {
  useGetMyFollowersQuery,
  useGetMyFollowingsQuery,
} from "../../service/whotofollow.service";

const FollowersList = () => {
  const [activeTab, setActiveTab] = useState("followers");

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const { data: user } = useGetUserProfiileQuery();
  const { data: followers, isLoading: loadingFollowers } = useGetMyFollowersQuery();
  const { data: following, isLoading: loadingFollowing } = useGetMyFollowingsQuery();

  return (
    <>
      <div className="overflow-y-auto">
        <div className="border-b-[3px] border-gray-200 dark:border-gray-700">
          <ul
            className="flex flex-wrap -mb-px sm:text-xl sm:font-semibold text-gray-400 text-center justify-center gap-2 md:gap-5 lg:gap-10"
            role="tablist"
          >
            <li className="me-2" role="presentation">
              <button
                className={`inline-block p-4 rounded-t-lg  ${
                  activeTab === "followers"
                    ? "border-[#4C9C25] text-[#4C9C25] border-b-4"
                    : "text-[#8D92AC]"
                }`}
                onClick={() => handleTabClick("followers")}
                role="tab"
                aria-controls="followers"
                aria-selected={activeTab === "followers"}
              >
                Followers ({user?.data.followers_count})
              </button>
            </li>
            <li className="me-2" role="presentation">
              <button
                className={`inline-block p-4 rounded-t-lg  ${
                  activeTab === "followings"
                    ? "border-[#4C9C25] text-[#4C9C25] border-b-4"
                    : "text-[#8D92AC]"
                }`}
                onClick={() => handleTabClick("followings")}
                role="tab"
                aria-controls="followings"
                aria-selected={activeTab === "followings"}
              >
                Followings ({user?.data.following_count})
              </button>
            </li>
          </ul>
        </div>
      </div>
      {/* followers */}
      <div
        className={`${activeTab === "followers" ? "" : "hidden"}`}
        id="profile-followers"
        role="tabpanel"
        aria-labelledby="profile-followers-tab"
      >
        {loadingFollowers ? (
          <div className="mt-3 justify-center flex">Loading...</div>
        ) : followers?.data.length === 0 ? (
          <div className="mt-3 justify-center flex">No Followers</div>
        ) : (
          <div className="grid grid-cols-12 w-full gap-3">
            <div className="w-full col-span-12 md:col-span-8">
              {followers?.data.map((follower) => (
                <FollowCard key={follower.id} follow={follower} />
              ))}
            </div>
            <div className="hidden md:block col-span-4">
              <AdsSection />
            </div>
          </div>
        )}
      </div>
      {/* followings */}
      <div
        className={`${activeTab === "followings" ? "" : "hidden"}`}
        id="profile-followings"
        role="tabpanel"
        aria-labelledby="profile-followings-tab"
      >
        {loadingFollowing ? (
          <div className="mt-3 justify-center flex">Loading...</div>
        ) : following?.data.length === 0 ? (
          <div className="mt-3 justify-center flex">No Followings</div>
        ) : (
          <div className="grid grid-cols-12 w-full gap-3">
            <div className="w-full col-span-12 md:col-span-8">
              {following?.data.map((follow) => (
                <FollowCard key={follow.id} follow={follow} />
              ))}
            </div>
            <div className="hidden md:block col-span-4">
              <AdsSection />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FollowersList;
