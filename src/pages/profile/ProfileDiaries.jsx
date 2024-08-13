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
import ProfileNav from "../../components/profile/ProfileNav";
import Diary from "../../components/diary/Diary";

const ProfileDiaries = () => {
  const { data, isLoading,  } = useGetDiaryQuery();

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
      <div>
        <ProfileNav />
      </div>
      {isLoading === null ? (
        <ShimmerSocialPost type="both" />
      ) : (
        <div className="grid grid-cols-12 w-full gap-3">
          <div className="w-full col-span-12 md:col-span-8">
            {data?.data.map((post) => (
             <Diary key={post?._id} post={post} />
            ))}
          </div>
          <div className="hidden md:block w-full col-span-4">
            <p className="mb-3">Trending Diary Posts</p>
            {sideDiary && (
            <Diary key={post?._id} post={post} />
            )}

            <Link className="text-primary-dark-green font-semibold" href="/">
              {/* See more */}
            </Link>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ProfileDiaries;
