import React, { useState } from "react";
import PollDisplay from "../polls/PollDisplay";
import Posts from "../main/Posts";
import getTimeAgoString from "../../utils/getTimeAgoString";
import avatar4 from "../../assets/images/sidebar/avatar4.svg";
import SearchPost from "./SearchPost";
import GeneralUserCard from "./GeneralUserCard";
import Category from "../ads/Category";

const GeneralSearch = ({ data }) => {
  const tabs = Object.keys(data);
  // const tabs = [
  //   "users",
  //   "posts",
  //   "diaries",
  //   "stories",
  //   "polls",
  //   "surveys",
  //   "categories",
  // ];
  const [activeTab, setActiveTab] = useState("users");

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };
  console.log(data);
  return (
    <div>
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul
          className="flex flex-wrap -mb-px text-sm font-medium text-center justify-center gap-5"
          role="tablist"
        >
          {tabs.map((tb, id) => (
            <li key={id} className="me-2 " role="presentation">
              <button
                className={`inline-block rounded-t-lg tabs text-xs ${
                  activeTab === tb
                    ? "border-[#4C9C25] text-[#4C9C25] border-b-4"
                    : "text-[#8D92AC]"
                }`}
                onClick={() => handleTabClick(tb)}
                role="tab"
                aria-controls={tb}
                aria-selected={activeTab === tb}
              >
                {tb} {/* {`${data.tb.length}`} */}({data[tb]?.length})
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        {/* {data.users.length > 0 && ( */}
        <div
          className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${
            activeTab === "users" ? "" : "hidden"
          }`}
          id="users"
          role="tabpanel"
          aria-labelledby="users-tab"
        >
          {data.users.length > 0 ? (
            <div className="pt-5 px-10 pb-20">
              {[...data.users]
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((user, index) => (
                  <GeneralUserCard key={index} user={user} />
                ))}
            </div>
          ) : (
            <p>No user found...</p>
          )}
        </div>
        {/* )} */}
      </div>
      <div>
        {/* {data.posts.length > 0 && ( */}
        <div
          className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${
            activeTab === "posts" ? "" : "hidden"
          }`}
          id="posts"
          role="tabpanel"
          aria-labelledby="posts-tab"
        >
          {data.posts.length > 0 ? (
            <div className="pt-5 px-10 pb-20">
              {[...data.posts]
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((post, index) => (
                  <SearchPost
                    key={index}
                    fullname={post.user_id.display_name}
                    username={post.user_id.username}
                    verifiedUser={false} // Adjust based on your data
                    postTime={getTimeAgoString(post.createdAt)}
                    content={post.content}
                    media_urls={post.media_urls}
                    post_id={post._id}
                    comment={post.comment}
                    repost={post.repost}
                    share={post.share}
                    reaction={post.reaction}
                    avatar={post.user_id.photo_url || avatar4}
                  />
                ))}
            </div>
          ) : (
            <p>No post found</p>
          )}
        </div>
        {/* )} */}
      </div>
      <div>
        {/* {data.diaries.length > 0 && ( */}
        <div
          className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${
            activeTab === "diaries" ? "" : "hidden"
          }`}
          id="diaries"
          role="tabpanel"
          aria-labelledby="diaries-tab"
        >
          {data.diaries.length > 0 ? (
            <div className="pt-5 px-10 pb-20">diaries</div>
          ) : (
            <p>No diaries found</p>
          )}
        </div>
        {/* )} */}
      </div>
      <div>
        {/* {data.stories.length > 0 && ( */}
        <div
          className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${
            activeTab === "stories" ? "" : "hidden"
          }`}
          id="stories"
          role="tabpanel"
          aria-labelledby="stories-tab"
        >
          {data.stories.length > 0 ? (
            <div className="pt-5 px-10 pb-20">stories</div>
          ) : (
            <p>Stories not found</p>
          )}
          {/* <div className="pt-5 px-10 pb-20">stories</div> */}
        </div>
        {/* )} */}
      </div>
      <div>
        {/* {data.polls.length > 0 && ( */}
        <div
          className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${
            activeTab === "polls" ? "" : "hidden"
          }`}
          id="polls"
          role="tabpanel"
          aria-labelledby="polls-tab"
        >
          {data.polls.length > 0 ? (
            <div className="pt-5 px-10 pb-20">
              {[...data.polls]
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((poll, index) => (
                  <div key={index}>
                    <PollDisplay
                      expired={poll.expired}
                      question={poll.question}
                      fullname={poll.created_by.display_name}
                      username={poll.created_by.username}
                      pollId={poll._id}
                      votes={poll.votes}
                      result={poll.result}
                      onRefresh={refetch}
                      totalVotes={poll.totalVotes}
                      postTime={getTimeAgoString(poll.createdAt)}
                    />
                  </div>
                ))}
            </div>
          ) : (
            <p>No Polls found</p>
          )}
        </div>
        {/* )} */}
      </div>
      <div>
        {/* {data.surveys.length > 0 && ( */}
        <div
          className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${
            activeTab === "surveys" ? "" : "hidden"
          }`}
          id="surveys"
          role="tabpanel"
          aria-labelledby="surveys-tab"
        >
          {data.surveys.length > 0 ? (
            <div className="pt-5 px-10 pb-20">surveys</div>
          ) : (
            <p>Surveys not found</p>
          )}
          {/* <div className="pt-5 px-10 pb-20">surveys</div> */}
        </div>
        {/* )} */}
      </div>
      <div>
        {/* {data.categories.length > 0 && ( */}
        <div
          className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${
            activeTab === "categories" ? "" : "hidden"
          }`}
          id="categories"
          role="tabpanel"
          aria-labelledby="categories-tab"
        >
          {data.categories.length > 0 ? (
            <div className="pt-5 px-10 pb-20">
              <div className="flex justify-center flex-col gap-3 pt-4 pb-5">
                {data.categories.map((cat, id) => (
                  <div
                    key={id}
                    className="category-card relative border shadow-lg rounded-sm"
                  >
                    <img
                      src={cat.photo_url}
                      className="w-full h-[161px]"
                      alt=""
                    />

                    <div className="absolute bottom-0 left-0 p-2 w-full text-start bg-gray-800 bg-opacity-50 text-white text-sm">
                      {cat.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p>No category found</p>
          )}
          {/* <div className="pt-5 px-10 pb-20">categories</div> */}
        </div>
        {/* )} */}
      </div>
    </div>
  );
};

export default GeneralSearch;
