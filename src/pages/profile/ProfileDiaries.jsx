import React from "react";
import MediaContainer from "./../../components/profile/MediaContainer";
import DiaryContainer from "./../../components/profile/DiaryContainer";
import Layout from "./Layout";
import { Link } from "react-router-dom";

const ProfileDiaries = () => {
  return (
    <Layout>
      <div className="grid grid-cols-5 gap-2">
        <div className="col-span-3">
          <DiaryContainer comment={true} />
          <MediaContainer />
        </div>
        <div className="col-span-2">
          <p className="mb-3">Trending Diary Posts</p>
          <DiaryContainer />
          <Link className="text-primary-dark-green font-semibold" href="/">
            See more
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default ProfileDiaries;
