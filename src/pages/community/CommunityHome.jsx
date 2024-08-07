import React, { useEffect } from "react";
import { useGetFeedsQuery } from "../../service/feeds.service";
import CommunityLayout from "../../components/main/CommunityLayout";
import CommunityHeader from "../../components/community/CommunityHeader";
import { Outlet } from "react-router-dom";
import { AdsSection } from "../../components/ads";

const CommunityHome = () => {
  const { data, isLoading, refetch } = useGetFeedsQuery();
  console.log(data?.data);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <CommunityLayout>
      <CommunityHeader />
      <div className="flex justify-between items-center">
        <div className="w-2/3">
          <Outlet />
        </div>
        <div className="w-1/3">
          <AdsSection />
        </div>
      </div>
    </CommunityLayout>
  );
};

export default CommunityHome;
