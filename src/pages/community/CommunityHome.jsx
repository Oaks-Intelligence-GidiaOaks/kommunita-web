import React, { useEffect } from "react";
import { useGetFeedsQuery } from "../../service/feeds.service";
import NewPost2 from "../../components/posts/NewPost2";
import RepostNew from "../../components/posts/RepostNew";
import CommunityLayout from "../../components/main/CommunityLayout";
import CommunityHeader from "../../components/community/CommunityHeader";

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
    <CommunityLayout>
      {/* {data?.data.map((post) => {
        if (post.type === "post") {
          return <NewPost2 key={post?._id} post={post} />;
        } else if (post.action_type === "Repost") {
          return <RepostNew key={post?._id} post={post} />;
        } else {
          return null;
        }
      })} */}

      <CommunityHeader />
    </CommunityLayout>
  );
};

export default CommunityHome;
