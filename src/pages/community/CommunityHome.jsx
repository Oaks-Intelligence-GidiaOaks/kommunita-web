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


  return (
    <CommunityLayout>
      <CommunityHeader />


      
    </CommunityLayout>
  );
};

export default CommunityHome;
