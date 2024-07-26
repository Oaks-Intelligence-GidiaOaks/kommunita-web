import React from "react";
import "../main/style.css";
import Story from "../main/Story";
import Posts from "../main/Posts";
import postImage from "../../assets/images/main/post-image.svg";
import avatar1 from "../../assets/images/sidebar/avatar1.svg";
import avatar2 from "../../assets/images/sidebar/avatar2.svg";
import avatar4 from "../../assets/images/sidebar/avatar4.svg";
import { useGetDiaryQuery } from "../../service/diary.service";
import getTimeAgoString from "./../../utils/getTimeAgoString";
import search from "../../assets/images/Home/Search.png";
import { Spinner } from "flowbite-react";

function DiaryMain() {
  const { data, isLoading } = useGetDiaryQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center mt-10">
        <Spinner />
      </div>
    );
  }

  const posts = data?.data || [];

  if (!posts.length) {
    return (
      <div className="flex items-center flex-col mt-10">
        <img src={search} alt="" />
        <h2 className="font-semibold text-3xl mt-5 ml-5">No Diaries feeds</h2>
      </div>
    );
  }

  return (
    <div className="mt-3 px-3 main-wrapper w-full pb-10">
      <Story />

      {[...posts]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map((post, index) => {
          const badgeColor = post.user_id?.department?.[0]?.badge?.color || "";
          const department =
            post.user_id?.department?.[0]?.badge?.department || "";

          return (
            <Posts
              key={index}
              fullname={post.user_id?.display_name}
              username={post.user_id?.username}
              verifiedUser={false} // You need to adjust this based on your data
              postTime={getTimeAgoString(post.createdAt)} // Assuming createdAt is the post time
              content={post.content}
              media_urls={post.media_urls}
              post_id={post._id}
              comment={post.comment}
              repost={post.repost}
              share={post.share}
              reaction={post.reaction}
              avatar={post?.user_id?.photo_url || avatar1}
              badgeColor={badgeColor}
              department={department}
              type={post?.type}
            />
          );
        })}
    </div>
  );
}

export default DiaryMain;
