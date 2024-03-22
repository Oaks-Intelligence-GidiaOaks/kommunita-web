import React from "react";
import MediaContainer from "../../components/profile/MediaContainer";
import DiaryContainer from "../../components/profile/DiaryContainer";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import Likes from "../../components/profile/Likes";

const ProfileLikes = () => {
  return (
    <Layout>
      <div className="grid grid-cols-5 gap-2">
        <div className="col-span-3">
          <DiaryContainer comment={true} />
          <MediaContainer />
        </div>
        <div className="col-span-2">
          <Likes />
          {/* <Link className="text-primary-dark-green font-semibold" href="/">
            See more
          </Link> */}
        </div>
      </div>
    </Layout>
  );
};

export default ProfileLikes;
