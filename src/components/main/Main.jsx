import { useLazyGetFeedsQuery } from "../../service/feeds.service";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "../main/style.css";
import MakePost from "./MakePost";
import search from "../../assets/images/Home/Search.png";
import { Link } from "react-router-dom";
import { Spinner } from "flowbite-react";
import StoryList from "../stories/StoryList";
import NewPost2 from "../posts/NewPost2";
import NewPollssss from "../newPolls/NewPollssss";
import Repost2 from "../posts/Repost2";
import Diary from "../diary/Diary";
import { CiCircleChevUp } from "react-icons/ci";

function Main() {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [posts, setPosts] = useState([]);
  const pageSize = 10;
  const isInitialLoad = useRef(true);

  // Using useLazyGetFeedsQuery for manual triggering
  const [triggerGetFeeds, { data: postdata, isLoading, isFetching, refetch }] =
    useLazyGetFeedsQuery();

  const features = useSelector(
    (state) => state?.user?.user?.organization_features
  );

  const scrollToTop = () => {
    const scrollableDiv = document.getElementById("scrollableDiv");
    if (scrollableDiv) {
      scrollableDiv.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    // Fetch data when the component loads or when the page changes
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }

    triggerGetFeeds({ page, page_size: pageSize });
  }, [page, triggerGetFeeds]);

  useEffect(() => {
    if (postdata) {
      const newPosts = postdata.data.data;

      // Avoid duplicate posts by checking existing IDs
      const uniquePosts = newPosts.filter(
        (post) => !posts.some((existingPost) => existingPost._id === post._id)
      );

      setPosts((prevPosts) => [...prevPosts, ...uniquePosts]);

      // If fewer items than page size were returned, no more data is left
      if (newPosts.length < pageSize) {
        setHasMore(false);
      }
    }
  }, [postdata]);

  const fetchNew = () => {
    if (!isFetching && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <>
      <div
        className="pt-4 main-wrapper w-full pb-10 h-[90vh] overflow-auto relative"
        id="scrollableDiv"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none"
        }}
      >
        <InfiniteScroll
          dataLength={posts.length}
          next={fetchNew}
          hasMore={hasMore}
          scrollableTarget="scrollableDiv"
        >
          {features.includes("Story") && <StoryList />}
          {features.includes("Post") && <MakePost />}

          {isLoading && page === 1 ? (
            <div className="flex justify-center pt-10">
              <Spinner />
            </div>
          ) : posts.length === 0 && page === 1 ? (
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
            posts?.map((post) => {
              if (post.type === "post") {
                return <NewPost2 key={post?._id} post={post} />;
              } else if (post.action_type === "Repost") {
                return <Repost2 key={post?._id} post={post} />;
              } else if (post.type === "poll") {
                return (
                  <NewPollssss
                    key={post?._id}
                    poll={post}
                    onRefresh={refetch}
                  />
                );
              } else if (post.type === "diary") {
                return <Diary key={post?._id} post={post} />;
              } else {
                return null;
              }
            })
          )}
        </InfiniteScroll>

        {isFetching && page > 1 ? (
          <div className="flex justify-center py-3">
            <Spinner />
          </div>
        ) : null}

        {page > 1 && (
          <div className="flex justify-end">
            <CiCircleChevUp
              size={30}
              className="text-green-500 rounded-full hover:bg-green-500 hover:text-white fixed bottom-3 z-50 cursor-pointer"
              onClick={scrollToTop}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default Main;
