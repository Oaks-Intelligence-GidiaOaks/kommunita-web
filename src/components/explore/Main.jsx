import "../main/style.css";
import React from "react";
import Posts from "../main/Posts";
import postImage from "../../assets/images/main/post-image.svg";
import avatar1 from "../../assets/images/sidebar/avatar1.svg";
import avatar2 from "../../assets/images/sidebar/avatar2.svg";
import avatar4 from "../../assets/images/sidebar/avatar4.svg";
import getTimeAgoString from "./../../utils/getTimeAgoString";
import { useGetFeedsQuery } from "../../service/feeds.service";
import search from "../../assets/images/Home/Search.png";
import { Spinner } from "flowbite-react";
import { useGetExplorePostQuery } from "../../service/explore.service";

function ExploreMain({ exploreData }) {
  // const { data, isLoading } = useGetExplorePostQuery();

  const posts = exploreData?.data || [];
  // console.log(posts);

  if (!posts.length) {
    return (
      <div className="flex items-center flex-col mt-10">
        <img src={search} alt="" />
        <h2 className="font-semibold text-3xl mt-5 ml-5">No Data to display</h2>
      </div>
    );
  }

  return (
    <div className="mt-3 px-3 main-wrapper w-full pb-10">
      {[...posts]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort posts by latest first
        .map(
          (post, index) =>
            post.user_id && (
              <Posts
                key={index}
                fullname={post.user_id.display_name}
                username={post.user_id.username}
                verifiedUser={false} // Adjust this based on your data
                postTime={getTimeAgoString(post.createdAt)}
                content={post.content}
                media_urls={post.media_urls}
                post_id={post._id}
                comment={post.comment}
                repost={post.repost}
                share={post.share}
                reaction={post.reaction}
                avatar={post.user_id.photo_url || avatar1} // Provide the avatar source
              />
            )
        )}
    </div>
  );
}

export default ExploreMain;
