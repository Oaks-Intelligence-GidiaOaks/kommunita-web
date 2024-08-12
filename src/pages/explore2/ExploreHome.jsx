import React, { useEffect } from "react";
import { useGetFeedsQuery } from "../../service/feeds.service";
import ExploreLayout from "../../components/main/ExploreLayout";
import ExploreHeader from "../../components/community/ExploreHeader";
import { Outlet } from "react-router-dom";
import { AdsSection } from "../../components/ads";

const ExploreHome = () => {
  const { data, isLoading, refetch } = useGetFeedsQuery();
  console.log(data?.data);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <ExploreLayout>
      <ExploreHeader />
      <div className="flex justify-between items-start">
        <div className="w-full xl:w-2/3 overflow-y-auto h-screen custom-scrollbar ">
          <Outlet />
        </div>
        <div className="sm:hidden lg:block lg:w-1/3 overflow-y-auto h-screen custom-scrollbar rounded-md ">
          <AdsSection />
        </div>
      </div>
    </ExploreLayout>
  );
};

export default ExploreHome;
