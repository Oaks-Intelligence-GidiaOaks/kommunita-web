import React from "react";
import ProfileHero from "../../components/profile/ProfileHero";
import PostHeader from "../../components/profile/PostHeader";
import Layout from "./Layout";
import MediaContainer from "../../components/profile/MediaContainer";
import DiaryContainer from "../../components/profile/DiaryContainer";
import { Link } from "react-router-dom";

const ProfileHome = () => {
  return (
    <Layout>
      <div className="grid grid-cols-5 gap-2">
        <div className="col-span-3">
          <MediaContainer />
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

export default ProfileHome;
