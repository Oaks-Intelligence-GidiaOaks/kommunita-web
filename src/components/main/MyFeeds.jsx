/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "../main/style.css";
import MakePost from "./MakePost";
import search from "../../assets/images/Home/Search.png";
import { useGetMyFeedsQuery } from "../../service/feeds.service";
import { Link } from "react-router-dom";
import { Spinner } from "flowbite-react";
import StoryList from "../stories/StoryList";
import NewPost2 from "../posts/NewPost2";
import NewPollssss from "../newPolls/NewPollssss";
import Repost2 from "../posts/Repost2";
import Diary from "../diary/Diary";
import { useSelector } from "react-redux";

function MyFeeds() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [allPosts, setAllPosts] = useState([]); // State to store all fetched posts

  const {
    data: postdata,
    isLoading,
    refetch,
    isFetching,
  } = useGetMyFeedsQuery({
    page,
    page_size: pageSize,
  });

  const features = useSelector(
    (state) => state?.user?.user?.organization_features
  );


  console.log(postdata?.data)
  const posts = postdata?.data?.data;

  // Append new posts to the existing list of posts
  useEffect(() => {
    if (posts) {
      setAllPosts((prevPosts) => [...prevPosts, ...posts]);
    }
  }, [posts]);

  // Infinite scroll handler
  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      !isFetching
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // Attach scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetching]);

  return (
    <div className="pt-4 main-wrapper w-full pb-10">
      {features.includes("Story") && <StoryList />}
      {features.includes("Post") && <MakePost />}

      {isLoading && page === 1 ? (
        <div className="flex justify-center pt-10">
          <Spinner />
        </div>
      ) : allPosts.length === 0 && page === 1 ? (
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
        allPosts.map((post) => {
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

      {isFetching && (
        <div className="flex justify-center pt-4">
          <Spinner />
        </div>
      )}
    </div>
  );
}

export default MyFeeds;
