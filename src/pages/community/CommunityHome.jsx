import MainLayout from "../../components/main/MainLayout";
import React, { useEffect } from "react";
import { useGetFeedsQuery } from "../../service/feeds.service";
import NewPost2 from "../../components/posts/NewPost2";
import RepostNew from "../../components/posts/RepostNew";

const CommunityHome = () => {
  const { data, isLoading, refetch } = useGetFeedsQuery();
  console.log(data?.data);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <MainLayout>
      {data?.data.map((post) => {
        if (post.type === "post") {
          return <NewPost2 key={post?._id} post={post} />;
        } else if (post.action_type === "Repost") {
          return <RepostNew key={post?._id} post={post} />;
        } else {
          return null;
        }
      })}
    </MainLayout>
  );
};

export default CommunityHome;
