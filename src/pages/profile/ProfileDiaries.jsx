import React, { useEffect, useState } from "react";
// import MediaContainer from "./../../components/profile/MediaContainer";
// import DiaryContainer from "./../../components/profile/DiaryContainer";
import Layout from "./Layout";
import { Link } from "react-router-dom";
// import postImage from "../../assets/images/main/post-image.svg";
import avatar1 from "../../assets/images/sidebar/avatar1.svg";
import avatar2 from "../../assets/images/sidebar/avatar2.svg";
// import avatar4 from "../../assets/images/sidebar/avatar4.svg";
import Posts from "../../components/main/Posts";
import { useGetDiaryQuery } from "../../service/diary.service";
import getTimeAgoString from "./../../utils/getTimeAgoString";
import { ShimmerSocialPost } from "react-shimmer-effects";

const ProfileDiaries = () => {
  const { data } = useGetDiaryQuery();
  // const { data } = useGetPostQuery();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sideDiary, setSideDiary] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setPost(data);
      setLoading(false);
      setSideDiary(data?.data?.filter((fd) => fd.comment.length == 0));
    }, 3000);
  }, [data]);

  // const post = data;
  console.log(data?.data);
  return (
    <Layout>
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
                repost={post.repost}
                share={post.share}
                reaction={post.reaction}
                avatar={post.user_id.photo_url || avatar2} // You need to provide the avatar source
              />
            ))}
          </div>
          <div className="hidden md:block w-full col-span-4">
            <p className="mb-3">Trending Diary Posts</p>
            {sideDiary && (
              <Posts
                fullname={sideDiary[0].user_id.display_name}
                username={sideDiary[0].user_id.username}
                verifiedUser={false} // You need to adjust this based on your data
                postTime={getTimeAgoString(sideDiary[0].createdAt)} // Assuming createdAt is the post time
                // postTime={moment(sideDiary[0].createdAt).fromNow()} // Assuming createdAt is the post time
                content={sideDiary[0].content}
                media_urls={sideDiary[0].media_urls}
                post_id={sideDiary[0]._id}
                comment={sideDiary[0].comment}
                repost={sideDiary[0].repost}
                share={sideDiary[0].share}
                reaction={sideDiary[0].reaction}
                avatar={avatar1} // You need to provide the avatar source
              />
            )}

            <Link className="text-primary-dark-green font-semibold" href="/">
              See more
            </Link>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ProfileDiaries;
