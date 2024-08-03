import React, { useEffect, useState } from "react";
import { FaHeart, FaCommentAlt, FaShare, FaRetweet } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import {
  dotsactive,
  dotsinactive,
  left,
  profile_placeholder,
  right,
  verified,
} from "../../assets/images";
import { Link } from "react-router-dom";
import getTimeAgoString from "../../utils/getTimeAgoString";
import CustomCarousel from "../main/CustomCarousel";
import { useSelector } from "react-redux";

const Repost2 = ({ post }) => {
  const login_user_id = useSelector((state) => state.user?.user?._id);
  console.log(post)
  return (
    <div className="mx-auto bg-white border rounded-lg shadow-md pt-4 pb-2 pr-2 my-4">
      <div className="py-2 pl-4 italic">
        {/* You reposted this */}
        {post?.post_id?.user_id?._id === login_user_id
            ? "You reposted this"
            : `@${post?.shared_by?.username} reposted this`
            }
      </div>
      <Link to={``}>
        <div className="ml-5 bg-[#f9f8f8] border rounded-lg shadow-md p-4 ">
          <div className="flex items-center mb-4">
            {/* <Link to={`/profile/`}> */}
              <div className={`rounded-full border-4 w-[3rem] h-[3rem]`}>
                <img
                  // src={profile_placeholder}
                  src={post?.post_id?.user_id?.photo_url || profile_placeholder}
                  alt="profile"
                  className="w-[3rem] h-[3rem] rounded-full object-cover"
                />
              </div>
            {/* </Link> */}
            <div className="ml-4">
              <div className="flex gap-2 items-center">
                <Link to={`/profile/`}>
                  <h4 className="font-semibold post-name">
                    {post?.post_id?.user_id?.display_name || "Anonymous"}
                  </h4>
                </Link>
              </div>
              <p className="text-gray-500">
                @{post?.post_id?.user_id?.username || "Anonymous"} ·{" "}
                <span className="post-time ml-2 font-bold">
                  {getTimeAgoString(post?.post_id?.createdAt) || "unknown"}
                </span>
              </p>
            </div>
          </div>
          <p className="mb-4">{post?.post_id?.content || "This is a demo post"}</p>
          <div className="post-media rounded-md w-full py-3">
            <CustomCarousel
              media_urls={post?.post_id?.media_urls}
              left={left}
              right={right}
              dotsinactive={dotsinactive}
              dotsactive={dotsactive}
            />
          </div>
          <div className="flex justify-between items-center text-gray-500 mb-2">
            <div className="flex items-center space-x-2 cursor-pointer">
              <FaHeart className={""} />
              <span>{"4"}</span>
            </div>
            <div className="flex items-center space-x-2 cursor-pointer">
              <FaCommentAlt />
              <span>{post?.post_id?.comment?.length}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaRetweet />
              <span>{post?.post_id?.repost?.length}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaShare />
              <span>{post?.post_id?.share?.length}</span>
            </div>
            <div className="flex items-center space-x-2 cursor-pointer">
              <CiBookmark className={""} />
              <span>{"0"}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Repost2;
