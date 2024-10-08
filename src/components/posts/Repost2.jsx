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
import { showAlert } from "../../static/alert";
import { useFavoritePostsMutation, useFavoriteRepostsMutation, useLoveRepostMutation } from "../../service/post.service";
import CommentOnRepost from "../main/CommentOnRepost";

const Repost2 = ({ post }) => {
  const [showComments, setShowComments] = useState(false);
  const navigate = useNavigate();
  const login_user_id = useSelector((state) => state.user?.user?._id);
  const user = useSelector((state) => state.user.user);
  const likeUserIds = post?.reaction?.like?.map((user) => user._id);
  const isLikedByCurrentUser = likeUserIds?.includes(user._id);
  const [likeCount, setLikeCount] = useState(post?.reaction?.like?.length || 0);
  const [liked, setLiked] = useState(
    post?.reaction?.like?.includes(post?.user_id?._id)
  );
  const [favoriteReposts] = useFavoriteRepostsMutation();
  const [ loveRepost] = useLoveRepostMutation();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(
    post?.favourites?.length || 0
  );






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

  const repostUserIds = post?.post_id?.repost?.map((users) => users?._id);
  // console.log(repostUserIds)
  const isRepostedByCurrentUser = repostUserIds?.includes(user?._id);
  // console.log(isRepostedByCurrentUser)


  const handleLike = async () => {
    const previousState = liked || isLikedByCurrentUser;
    const previousCount = likeCount;

    // Optimistically update the UI
    setLiked(!liked);
    setLikeCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));

    try {
      await loveRepost({ repost_id: post._id, reaction_type: "like" }).unwrap();
    } catch (error) {
      // Revert the state if the request fails
      setLiked(previousState);
      setLikeCount(previousCount);
      showAlert("Error", error.message, "error");
    }
  };


  const handleBookmark = async () => {
    const previousState = isBookmarked || isLikedByCurrentUser;
    const previousCount = bookmarkCount;

    // Optimistically update the UI
    setIsBookmarked(!isBookmarked);
    setBookmarkCount((prevCount) =>
      isBookmarked ? prevCount - 1 : prevCount + 1
    );

    try {
      await favoriteReposts({ repost_id: post._id }).unwrap();
    } catch (error) {
      setIsBookmarked(previousState);
      setBookmarkCount(previousCount);
      showAlert("Error", error.message, "error");
    }
  };

  // console.log(post);
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
        {post?.message ? (
          <p className="py-2 pl-4">{post?.message}</p>
        ) : isRepostedByCurrentUser ? (
          <span className="italic">You reposted this</span>
        ) : !isRepostedByCurrentUser ? (
          <span className="">@{post?.shared_by?.username} reposted this</span>
        ): null }
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
          <Link to={`/post${post?.post_id}`} className="z-0">
            <p className="mb-4">
              {post?.post_id?.content || "Something went wrong"}
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
        </div>
      </Link>
      <div className="flex justify-between items-center text-gray-500 mb-2 pl-6 pr-2 pt-2">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={handleLike}>
          <FaHeart className={liked || isLikedByCurrentUser ? "text-[#E71D36]" : ""} />
          <span>{likeCount}</span>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer" onClick={toggleComments}>
          <FaCommentAlt />
          <span>{post?.comment?.length}</span>
        </div>
        {/* <div className="flex items-center space-x-2">
          <FaRetweet />
          <span>{post?.repost?.length}</span>
        </div> */}
        {/* <div className="flex items-center space-x-2">
          <FaShare />
          <span>{post?.share?.length}</span>
        </div> */}
        <div className="flex items-center space-x-2 cursor-pointer"  onClick={handleBookmark}>
          <CiBookmark className={isBookmarked ? "text-[#E71D36] font-[900] text-lg" : ""} />
          <span>{bookmarkCount}</span>
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
          <div className="pl-4 pb-2">
          {addComment && (
            <CommentOnRepost
              id={post?._id}
              onComment={() => setAddComment(false)}
              placeholder={"Comment"}
            />
          )}
          </div>
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
