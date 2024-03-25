import React from "react";
import MediaContainer from "../../components/profile/MediaContainer";
import DiaryContainer from "../../components/profile/DiaryContainer";
import { Link } from "react-router-dom";
import Layout from "./Layout";
// import Likes from "../../components/profile/Likes";
import Likes from "./../../components/sidebar/Likes";
import Posts from "../../components/main/Posts";
import postImage from "../../assets/images/main/post-image.svg";
import avatar1 from "../../assets/images/sidebar/avatar1.svg";
import avatar2 from "../../assets/images/sidebar/avatar2.svg";

const ProfileLikes = () => {
  return (
    <Layout>
      <div className="grid grid-cols-5 w-full gap-3">
        <div className="w-full col-span-3">
          <Posts
            avatar={avatar1}
            fullname="Larry_the_Nigerian_Whiz"
            username="Larry9jaWhiz"
            verifiedUser={true}
            postTime="5h"
            content="Lorem ipsum dolor sit amet consectetur. Habitant pellentesque elementum aliquam hendrerit netus. Vestibulum consectetur tortor at nisi sit. Mi laoreet elementum ut pellentesque interdum diam viverra sit."
          />

          <Posts
            avatar={avatar2}
            fullname="Perl Rosy"
            username="perl_skin"
            verifiedUser={true}
            postTime="10m"
            content="Check out this cool image!"
            videoSrc="https://www.youtube.com/embed/EQJsr2OvVx4"
          />
          <Posts
            avatar={avatar1}
            fullname="Perl Rosy"
            username="perl_skin"
            verifiedUser={true}
            postTime="10m"
            content="Check out this cool image!"
            imageSrc={postImage}
          />
          {/* <DiaryContainer comment={true} />
          <MediaContainer /> */}
        </div>
        <div className="w-full col-span-2">
          <Likes />
        </div>
      </div>
    </Layout>
  );
};

export default ProfileLikes;
