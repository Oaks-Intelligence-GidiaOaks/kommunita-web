import React from "react";
import MediaContainer from "../../components/profile/MediaContainer";
import DiaryContainer from "../../components/profile/DiaryContainer";
import { Link } from "react-router-dom";
import Layout from "./Layout";
// import Likes from "../../components/profile/Likes";
import Likes from "./../../components/sidebar/Likes";
import Posts from "../../components/main/Posts";
// import postImage from "../../assets/images/main/post-image.svg";
import avatar1 from "../../assets/images/sidebar/avatar1.svg";
import { useGetLikedPostQuery } from "../../service/likedPost.service";
import getTimeAgoString from "./../../utils/getTimeAgoString";

const ProfileLikes = () => {
  const { data } = useGetLikedPostQuery();
  const post = data;
  return (
    <Layout>
      {/* <div className="flex w-full gap-3"> */}
      <div className="grid grid-cols-12 w-full gap-3">
        <div className="w-full col-span-12 md:col-span-8">
          {post?.data.map((post, index) => (
            <Posts
              key={index}
              fullname={post.user_id.display_name}
              username={post.user_id.username}
              verifiedUser={false} // You need to adjust this based on your data
              postTime={getTimeAgoString(post.createdAt)} // Assuming createdAt is the post time
              // postTime={moment(post.createdAt).fromNow()} // Assuming createdAt is the post time
              content={post.content}
              media_urls={post.media_urls}
              post_id={post._id}
              comment={post.comment}
              repost={post.repost}
              share={post.share}
              reaction={post.reaction}
              avatar={post.user_id.photo_url || avatar1} // You need to provide the avatar source
            />
          ))}
          {/* <DiaryContainer comment={true} />
          <MediaContainer /> */}
        </div>
        <div className="w-full hidden md:block col-span-4">
          <Likes />
        </div>
      </div>
    </Layout>
  );
};

export default ProfileLikes;
