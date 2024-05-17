import "../main/style.css";
import Story from "./Story";
import MakePost from "./MakePost";
import Posts from "./Posts";
import search from "../../assets/images/Home/Search.png";
import avatar1 from "../../assets/images/sidebar/avatar1.svg";
import { useGetFeedsQuery } from "../../service/feeds.service";
import getTimeAgoString from "./../../utils/getTimeAgoString";
import PollDisplay from "../polls/PollDisplay";
import SurveyDisplay from "./../polls/SurveyDisplay";
import { Link } from "react-router-dom";
import { Spinner } from "flowbite-react";

function Main() {
  const { data, isLoading, refetch } = useGetFeedsQuery();
  const posts = data?.data || [];

  return (
    <div className="mt-3 px-3 main-wrapper w-full pb-10">
      <Story />
      <MakePost />

      {isLoading ? (
        <div className="flex justify-center pt-10">
          <Spinner />
        </div>
      ) : posts.length === 0 ? (
        <div className="flex items-center flex-col mt-10 w-[491px] h-auto">
          <img src={search} alt="Search icon" />
          <h2 className="font-bold text-4xl mt-5 mb-5">NO POST</h2>
          <p>Follow other users to begin to see posts</p>
          <Link to="/follow">
            <p className="text-primary-bright-green mt-2 font-semibold">
              Click here to follow suggested users
            </p>
          </Link>
        </div>
      ) : (
        [...posts]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((post, index) =>
            post.user_id ? (
              <Posts
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
                avatar={post.user_id.photo_url || avatar1} // Provide the avatar source
                badgeColor={post.user_id?.department?.badge?.color}
              />
            ) : (
              <div className="mt-4" key={index}>
                {post.options ? (
                  <PollDisplay
                    expired={post.expired}
                    question={post.question}
                    fullname={post.created_by.display_name}
                    username={post.created_by.username}
                    pollId={post._id}
                    votes={post.votes}
                    result={post.result}
                    onRefresh={refetch}
                    totalVotes={post.totalVotes}
                    postTime={getTimeAgoString(post.createdAt)}
                  />
                ) : (
                  ""
                )}
              </div>
            )
          )
      )}
    </div>
  );
}

export default Main;
