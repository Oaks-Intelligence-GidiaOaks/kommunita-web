import React, { useState } from "react";
import FollowCard from "./FollowCard";
import { AdsSection } from "../ads";
import { useGetUserProfiileQuery } from "../../service/user.service";
import { useGetMyFollowersQuery, useGetMyFollowingsQuery, useUnfollowUserMutation } from "../../service/whotofollow.service";
import { useSelector } from "react-redux";
import { showAlert } from "../../static/alert";
import { Spinner } from "flowbite-react";


const FollowersList = () => {
  const [activeTab, setActiveTab] = useState("followers");
  const user_id = useSelector((state) => state.user.user._id);
  const [submitting, setSubmitting] = useState(false);

  

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const { data: user } = useGetUserProfiileQuery();
  const { data: followers, isLoading: loadingFollowers } = useGetMyFollowersQuery();
  const { data: followings, isLoading: loadingFollowing, refetch:refetchFollowingList } = useGetMyFollowingsQuery();
  const [unfollowUser, { isLoading: unfollowLoading}] = useUnfollowUserMutation();

  const handleUnFollow = async (id) => {
    setSubmitting(true);
    const postData = {
      user_to_unfollow_id: id,
    };
    try {
      await rtkMutation(unfollowUser, postData);
      refetchFollowingList()
  
    } catch (error) {
      console.error("Error unfollowing user: ", error);
      showAlert("Oops", "An error occurred while unfollowing this user", "error");
    } 
  };

console.log(followings?.data)

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
                className={`inline-block p-4 rounded-t-lg ${
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
                className={`inline-block p-4 rounded-t-lg ${
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
          <div className="mt-3 justify-center flex">
            <Spinner />
          </div>
        ) : followers?.data.length === 0 ? (
          <div className="mt-3 justify-center flex">No Followers</div>
        ) : (
          <div className="grid grid-cols-12 w-full gap-3">
            <div className="w-full col-span-12 md:col-span-8 overflow-y-auto h-[55vh] custom-scrollbar">
              {followers?.data.map((follower) => (
                <FollowCard
                  key={follower.id}
                  follow={follower}
                  // isFollowing={isFollower}
                  // isFollowing={checkFollowerStatus(follower._id)}
                  onClick={() =>{ console.log(`Follow/Unfollow ${follower._id}`)
                  // console.log(checkFollowerStatus(follower._id))
                }}
                />
              ))}
            </div>
            <div className="hidden md:block col-span-4 overflow-y-auto h-[55vh] custom-scrollbar">
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
          <div className="mt-3 justify-center flex">
            <Spinner />
          </div>
        ) : followings?.data.length === 0 ? (
          <div className="mt-3 justify-center flex">No Followings</div>
        ) : (
          <div className="grid grid-cols-12 w-full gap-3">
            <div className="w-full col-span-12 md:col-span-8 overflow-y-auto h-[55vh] custom-scrollbar">
              {followings?.data.map((follow) => (
                <FollowCard
                  key={follow?._id}
                  follow={follow}
                  isFollowing={true}
                  onClick={() => handleUnFollow(follow?._id)(`Follow/Unfollow ${follow._id}`)}
                />
              ))}
            </div>
            <div className="hidden md:block col-span-4 overflow-y-auto h-[55vh] custom-scrollbar">
              <AdsSection />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FollowersList;
