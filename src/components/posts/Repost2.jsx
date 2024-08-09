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
import { Link, useLocation, useNavigate } from "react-router-dom";
import getTimeAgoString from "../../utils/getTimeAgoString";
import CustomCarousel from "../main/CustomCarousel";
import { useSelector } from "react-redux";
import EditMyDiary from "../main/EditMyDiary";
import Modals from "../modals/Modal";
import EditMyPost from "../main/EditMyPost";
import Comment from "../main/Comment";
import MainComment from "../profile/comments/MainComment";

const Repost2 = ({ post }) => {
  const [showComments, setShowComments] = useState(false);
  const navigate = useNavigate();
  const login_user_id = useSelector((state) => state.user?.user?._id);

  const [showPopup, setShowPopup] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [addComment, setAddComment] = useState(false);
  const onComment = () => {
    setAddComment(!addComment);
  };

  const toggleComments = () => {
    setShowComments(!showComments);
    setAddComment(!addComment);
    onComment();
  };

  const handleShowEditModal = () => {
    setShowEditModal(true);
    setShowPopup(false);
  };

  const [visibleComments, setVisibleComments] = useState(2);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("post/")) {
      setVisibleComments(100);
    }
  }, [location]);

  console.log(post);
  return (
    <div className="mx-auto bg-white border rounded-lg shadow-md pt-4 pb- pr-2 my-4">
      <div className="flex items-center pl-4 mb-">
        {/* <Link to={`/profile/`}> */}
        <div className={`rounded-full border-4 w-[3rem] h-[3rem]`}>
          <img
            // src={profile_placeholder}
            src={post?.shared_by?.photo_url || profile_placeholder}
            alt="profile"
            className="w-[3rem] h-[3rem] rounded-full object-cover"
          />
        </div>
        {/* </Link> */}
        <div className="ml-4">
          <div className="flex gap-2 items-center">
            <Link to={`/profile/`}>
              <h4 className="font-semibold post-name">
                {post?.shared_by?.display_name || "Anonymous"}
              </h4>
            </Link>
          </div>
          <p className="text-gray-500">
            @{post?.shared_by?.username || "Anonymous"} ·{" "}
            <span className="post-time ml-2 font-bold">
              {getTimeAgoString(post?.createdAt) || "unknown"}
            </span>
          </p>
        </div>
      </div>
      <div className="pt-2 pl-4 ">
        {/* You reposted this */}
        {/* {post?.share_by?._id === login_user_id
            ? "You reposted this"
            : `@${post?.shared_by?.username} reposted this`
            } */}
        {post?.message ? (
          <p className="py-2 pl-4">{post?.message}</p>
        ) : post?.post_id?.user_id?._id === login_user_id ? (
          <span className="italic">You reposted this</span>
        ) : (
          <span className="">@{post?.shared_by?.username} reposted this</span>
        )}
      </div>
      <Link to={``}>
        <div className="ml-5 bg-[#f9f8f8] border rounded-lg shadow-md p-4 ">
          <div className="flex items-center mb-4">
            <div className={`rounded-full border-4 w-[3rem] h-[3rem]`}>
              <img
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
          <Link to={`/post${post?.post_id}`}>
            <p className="mb-4">
              {post?.post_id?.content || "This is a demo post"}
            </p>
            <div className="post-media rounded-md w-full py-3">
              <CustomCarousel
                media_urls={post?.post_id?.media_urls}
                left={left}
                right={right}
                dotsinactive={dotsinactive}
                dotsactive={dotsactive}
              />
            </div>
          </Link>
          {/* <div className="flex justify-between items-center text-gray-500 mb-2">
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
          </div> */}
        </div>
      </Link>
      <div className="flex justify-between items-center text-gray-500 mb-2 pl-6 pr-2 pt-2">
        <div className="flex items-center space-x-2 cursor-pointer">
          <FaHeart className={""} />
          <span>{"4"}</span>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer">
          <FaCommentAlt />
          <span>{post?.comment?.length}</span>
        </div>
        <div className="flex items-center space-x-2">
          <FaRetweet />
          <span>{post?.repost?.length}</span>
        </div>
        <div className="flex items-center space-x-2">
          <FaShare />
          <span>{post?.share?.length}</span>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer">
          <CiBookmark className={""} />
          <span>{"0"}</span>
        </div>
      </div>

      {showComments && (
        <>
          {post?.comment?.slice(0, visibleComments).map((comment, index) => (
            <MainComment key={index} comment={comment} />
          ))}

          {post?.comment?.length > 2 && (
            <Link
              className={`${
                location.pathname.includes("post/") ? "hidden" : "flex"
              } flex justify-end text-xs italic pt-1 text-primary-dark-gray font-medium`}
              to={`post/${post?._id}`}
            >
              Read more comments
            </Link>
          )}

          {addComment && (
            <Comment
              id={post?._id}
              onComment={() => setAddComment(false)}
              placeholder={"Comment"}
            />
          )}
        </>
      )}

      {showEditModal && post?.type == "post" ? (
        <Modals
          title={"Edit post"}
          openModal={showEditModal}
          modalSize="2xl"
          onClose={() => setShowEditModal(false)}
        >
          <div className="pt-4 post-wrapper max-h-[550px] w-full max-w-[491px] mx-auto">
            <div className="post-media rounded-md w-full py-3">
              <EditMyPost
                content={post?.content}
                medias={post?.media_urls}
                avatar={post?.user_id.photo_url || profile_placeholder}
                userId={post?.user_id}
                // badgeColor={badgeColor}
                onClose={() => setShowEditModal(false)}
                postId={post?._id}
              />
            </div>
          </div>
        </Modals>
      ) : (
        <Modals
          title={"Edit Diary"}
          openModal={showEditModal}
          modalSize="2xl"
          onClose={() => setShowEditModal(false)}
        >
          <div className="pt-4 post-wrapper max-h-[550px] w-full max-w-[491px] mx-auto">
            <div className="post-media rounded-md w-full py-3">
              <EditMyDiary
                content={post?.content}
                medias={post?.media_urls}
                avatar={post?.user_id?.photo_url || profile_placeholder}
                userId={post?.user_id}
                //  badgeColor={badgeColor}
                onClose={() => setShowEditModal(false)}
                postId={post?._id}
              />
            </div>
          </div>
        </Modals>
      )}
    </div>
  );
};

export default Repost2;
