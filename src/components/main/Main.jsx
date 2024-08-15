import "../main/style.css";
import Story from "./Story";
import MakePost from "./MakePost";
import Posts from "./Posts";
import search from "../../assets/images/Home/Search.png";
import avatar4 from "../../assets/images/sidebar/avatar4.svg";
import { useGetFeedsQuery } from "../../service/feeds.service";
import getTimeAgoString from "./../../utils/getTimeAgoString";
import PollDisplay from "../polls/PollDisplay";
import { Link } from "react-router-dom";
import { Spinner } from "flowbite-react";
import StoryList from "../stories/StoryList";
import NewPost2 from "../posts/NewPost2";
import RepostNew from "../posts/RepostNew";
import PollList from "../newPolls/PollList";
import NewPollssss from "../newPolls/NewPollssss";
import Repost2 from "../posts/Repost2";
import Diary from "../diary/Diary";
import { useSelector } from "react-redux";

function Main() {
  const { data, isLoading, refetch } = useGetFeedsQuery();
  const posts = data?.data || [];
  // console.log(posts, "posts");
  // console.log(posts?.map(item => item.action_type && item), "posts");
  const features = useSelector(
    (state) => state?.user?.user?.organization_features
  );

  return (
    <div className=" pt-4 main-wrapper w-full pb-10">
      {features.includes("Story") && <StoryList />}
      {features.includes("Post") && <MakePost />}

      {isLoading ? (
        <div className="flex justify-center pt-10">
          <Spinner />
        </div>
      ) : posts.length === 0 ? (
        <div className="flex items-center flex-col mt-10 justify-center h-auto">
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
        data?.data.map((post) => {
          if (post.type === "post") {
            return <NewPost2 key={post?._id} post={post} />;
          } else if (post.action_type === "Repost") {
            return <Repost2 key={post?._id} post={post} />;
          } else if (post.type === "poll") {
            return (
              <NewPollssss key={post?._id} poll={post} onRefresh={refetch} />
            );
          } else if (post.type === "diary") {
            return <Diary key={post?._id} post={post} />;
          } else {
            return null;
          }
        })
      )}
    </div>
  );
}

export default Main;
