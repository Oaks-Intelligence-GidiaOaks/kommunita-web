import React from "react";
import MainLayout from "../../components/main/MainLayout";

const LiveHome = () => {
  return (
    <div>
      <MainLayout showNav={false}>
        <div className="font-semibold text-3xl flex items-center justify-center h-[100%]">
          COMING SOON
        </div>
      </MainLayout>
    </div>
  );
};

export default LiveHome;
