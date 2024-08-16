import { Outlet } from "react-router-dom";
import StoriesLayout from "../../components/stories/StoriesLayout";
import React from "react";

const StoriesHome = () => {
  return (
    <StoriesLayout>
      <Outlet />
    </StoriesLayout>
  );
};

export default StoriesHome;
