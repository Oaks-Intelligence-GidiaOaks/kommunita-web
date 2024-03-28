import React from "react";
import ProfileHero from "../../components/profile/ProfileHero";
import PostHeader from "../../components/profile/PostHeader";
import Layout from "./Layout";
import MediaContainer from "../../components/profile/MediaContainer";
import DiaryContainer from "../../components/profile/DiaryContainer";
import postImage from "../../assets/images/main/post-image.svg";
import avatar1 from "../../assets/images/sidebar/avatar1.svg";
import avatar2 from "../../assets/images/sidebar/avatar2.svg";
import avatar4 from "../../assets/images/sidebar/avatar4.svg";
import Posts from "../../components/main/Posts";
import { Link } from "react-router-dom";

const ProfileHome = () => {
  return (
    <Layout>
      {/* <div className="flex w-full justify-between gap-3"> */}
      <div className="grid grid-cols-12 w-full gap-3">
        <div className="w-full col-span-12 lg:col-span-8">
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
            fullname="Larry_the_Nigerian_Whiz"
            username="Larry9jaWhiz"
            verifiedUser={true}
            postTime="5h"
            content="Lorem ipsum dolor sit amet consectetur. Habitant pellentesque elementum aliquam hendrerit netus. Vestibulum consectetur tortor at nisi sit. Mi laoreet elementum ut pellentesque interdum diam viverra sit."
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
          {/* <MediaContainer /> */}
        </div>
        <div className="hidden lg:block col-span-4">
          <p className="mb-3">Trending Diary Posts</p>
          {/* <DiaryContainer /> */}
          <Posts
            avatar={avatar1}
            fullname="Larry_the_Nigerian_Whiz"
            username="Larry9jaWhiz"
            verifiedUser={true}
            postTime="5h"
            content="Lorem ipsum dolor sit amet consectetur. Habitant pellentesque elementum aliquam hendrerit netus. Vestibulum consectetur tortor at nisi sit. Mi laoreet elementum ut pellentesque interdum diam viverra sit."
          />
          <Link className="text-primary-dark-green font-semibold" href="/">
            See more
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default ProfileHome;
