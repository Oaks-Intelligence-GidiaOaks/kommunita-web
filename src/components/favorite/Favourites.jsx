import "./style.css";
import Header from "./Header";
import Posts from "../main/Posts";
import postImage from "../../assets/images/main/post-image.svg";
import avatar1 from "../../assets/images/sidebar/avatar1.svg";
import avatar2 from "../../assets/images/sidebar/avatar2.svg";
import avatar4 from "../../assets/images/sidebar/avatar4.svg";
import search from "../../assets/images/Home/Search.png";
import { useGetFeedsQuery } from "../../service/feeds.service";
import getTimeAgoString from "./../../utils/getTimeAgoString";
import PollDisplay from "../polls/PollDisplay";
import {
  useGetFavoritesQuery,
  useGetFilteredFavoritesQuery,
} from "../../service/favorite.service";
// import SurveyDisplay from "./../polls/SurveyDisplay";
import { Spinner } from "flowbite-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NewPost2 from "../posts/NewPost2";
import Repost2 from "../posts/Repost2";
import NewPollssss from "../newPolls/NewPollssss";
import Diary from "../diary/Diary";

function Favourites() {
  const { data, isLoading, refetch } = useGetFavoritesQuery();

  const posts = data?.data || [];
  console.log(data?.data.action_type);

  const [filterString, setFilterString] = useState("");
  const [filterData, setFilterData] = useState("");

  useEffect(() => {
    if (filterString) {
      console.log(filterString);
      setFilterData(posts?.filter((dt) => filterString.includes(dt.type)));
    } else {
      // console.log("No category selected");
      setFilterData(posts);
    }
  }, [filterString, posts, data, isLoading, refetch]);

  return (
    <div className="mt-3 px-3 w-full">
      <Header setFilter={setFilterString} />
      <div className="pt-4 main-wrapper w-full pb-10">
        {isLoading ? (
          <div className="flex justify-center pt-10">
            <Spinner />
          </div>
        ) : filterData.length === 0 ? (
          <div className="flex items-center flex-col mt-10 justify-center h-auto">
            <img src={search} alt="Search icon" />
            <h2 className="font-bold text-4xl mt-5 mb-5 text-center">
              NO BOOKMARKS YET
            </h2>
            {/* <p>Follow other users to begin to see posts</p> */}
            <Link to="/explore">
              <p className="text-primary-bright-green mt-2 font-semibold text-center">
                Click here to explore post and diaries
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
    </div>
  );
}

export default Favourites;
