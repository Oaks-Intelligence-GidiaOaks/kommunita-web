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
import ProfileNav from "../../components/profile/ProfileNav";
import NewPost2 from "../../components/posts/NewPost2";

const ProfileLikes = () => {
  const { data } = useGetLikedPostQuery();
  const post = data;
  return (
    <Layout>
      {/* <div className="flex w-full gap-3"> */}
      <div className="grid grid-cols-12 w-full gap-3">
        <div className="w-full col-span-12 md:col-span-8">
          {post?.data.map((post, index) => (
            <NewPost2 key={post?._id} post={post} />
          ))}
        </div>
        <div className="w-full hidden md:block -mt-5 col-span-4">
          <Likes />
        </div>
      </div>
    </Layout>
  );
};

export default ProfileLikes;
