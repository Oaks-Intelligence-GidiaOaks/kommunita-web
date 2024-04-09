import React, { useEffect, useState } from "react";
import ProfileHero from "../../components/profile/ProfileHero";
import PostHeader from "../../components/profile/PostHeader";
import Layout from "./Layout";
import MediaContainer from "../../components/profile/MediaContainer";
import DiaryContainer from "../../components/profile/DiaryContainer";
import postImage from "../../assets/images/main/post-image.svg";
import avatar1 from "../../assets/images/sidebar/avatar1.svg";
import avatar2 from "../../assets/images/sidebar/avatar2.svg";
import avatar4 from "../../assets/images/sidebar/avatar4.svg";
import Posts from "../../components/main/Posts";
import { Link } from "react-router-dom";
import { useGetFeedsQuery } from "../../service/feeds.service";
import getTimeAgoString from "./../../utils/getTimeAgoString";
import { ShimmerSocialPost } from "react-shimmer-effects";

const ProfileHome = () => {
  const { data } = useGetFeedsQuery();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setPost(data);
      setLoading(false);
    }, 3000);
  }, [data]);

  // console.log("profile: ", post);

  return (
    <Layout>
      {/* <div className="flex w-full justify-between gap-3"> */}
      {loading && post == null ? (
        <ShimmerSocialPost type="both" />
      ) : (
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
                avatar={avatar1} // You need to provide the avatar source
              />
            ))}

            {/* <MediaContainer /> */}
          </div>
          <div className="hidden md:block col-span-4">
            <p className="mb-3">Trending Diary Posts</p>

            {/* {post?.data.map((post, index) => (
            <Posts
              key={index}
              fullname={post.user_id.display_name}
              username={post.user_id.username}
              verifiedUser={false} // You need to adjust this based on your data
              postTime={getTimeAgoString(post.createdAt)} // Assuming createdAt is the post time
              // postTime={moment(post.createdAt).fromNow()} // Assuming createdAt is the post time
              content={post.content}
              media_urls={post.media_urls}
              avatar={avatar1} // You need to provide the avatar source
            />
          ))} */}
            <Link className="text-primary-dark-green font-semibold" href="/">
              See more
            </Link>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ProfileHome;
