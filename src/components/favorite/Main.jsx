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

function Main() {
  const { data, isLoading, refetch } = useGetFavoritesQuery();
  // const user = useSelector((state) => state.user?.user);
  // console.log(user);
  // const {
  //   filterData,
  //   isLoading: ld,
  //   refetch: rf,
  // } = useGetFilteredFavoritesQuery();

  const posts = data?.data || [];
  console.log(data?.data);

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
            <h2 className="font-bold text-4xl mt-5 mb-5">NO BOOKMARKS YET</h2>
            {/* <p>Follow other users to begin to see posts</p> */}
            <Link to="/explore">
              <p className="text-primary-bright-green mt-2 font-semibold">
                Click here to explore post and diaries
              </p>
            </Link>
          </div>
        ) : (
          [...filterData]
            .sort((b, a) => new Date(b.createdAt) - new Date(a.createdAt))
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
                  avatar={post.user_id.photo_url || avatar4}
                  badgeColor={post.user_id?.department[0]?.badge?.color}
                  department={post.user_id?.department[0]?.badge?.department}
                  userId={post.user_id?._id}
                  type={post?.type}
                  refetchFav={refetch}
                  // user_id={post.user_id?._id}
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
    </div>
  );
}

export default Main;
