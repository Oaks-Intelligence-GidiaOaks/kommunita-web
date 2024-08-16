import React, { useEffect, useRef, useState } from "react";
import { FaHeart, FaCommentAlt, FaShare, FaRetweet } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import Comment from "../main/Comment";
import {
  dotsactive,
  dotsinactive,
  left,
  profile_placeholder,
  right,
  verified,
} from "../../assets/images";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import getTimeAgoString from "../../utils/getTimeAgoString";
import CustomCarousel from "../main/CustomCarousel";
import {
  useFavoritePostsMutation,
  useLovePostMutation,
  useRepostPostMutation,
} from "../../service/post.service";
import { useGetUserProfiileQuery } from "../../service/user.service";
import { showAlert } from "../../static/alert";
import rtkMutation from "../../utils/rtkMutation";
import MainComment from "../profile/comments/MainComment";
import {
  useDeleteFeedMutation,
  useGetFeedsQuery,
} from "../../service/feeds.service";
import { RxDotsHorizontal } from "react-icons/rx";
import Modals from "../modals/Modal";
import EditMyPost from "../main/EditMyPost";
import EditMyDiary from "../main/EditMyDiary";
import { useBookMarkDiariesMutation, useDeleteDiaryMutation, useLoveDiaryMutation } from "../../service/diary.service";
import DropdownMenu from "../ui/DropdownMenu";
import { GoShareAndroid } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import DiaryComment from "../main/DiaryComment";
import EditDiary2 from "./EditDiary2";

const Diary = ({ post }) => {
  const [showComments, setShowComments] = useState(false);
  const [
    deleteFeeds,
    {
      isLoading: isLoadingDeleteFeeds,
      isSuccess: isSuccessDeleteFeed,
      isError: isErrorFeedError,
    },
  ] = useDeleteFeedMutation();
  const [selectedFeedId, setSelectedFeedId] = useState(null);
  const [deleteDiary] = useDeleteDiaryMutation();
  const [loveDiary] = useLoveDiaryMutation();
  const [repostPost] = useRepostPostMutation();
  const { isSuccess: feedsSuccess, refetch: refetchFeeds } = useGetFeedsQuery();
  const user = useSelector((state) => state.user.user);
  const login_user_id = useSelector(
    (state) => state.post?.user_id?.post?.user_id?._id
  );
  const verifiedUser = false;
  const [liked, setLiked] = useState(
    post?.reaction?.like?.includes(post?.user_id?._id)
  );
  const [likeCount, setLikeCount] = useState(post?.reaction?.like?.length || 0);
  const likeUserIds = post?.reaction?.like?.map((user) => user._id);
  const isLikedByCurrentUser = likeUserIds?.includes(login_user_id);
  const { data: userData, refetch: refetchUser } = useGetUserProfiileQuery();
  const [bookMarkDiaries] = useBookMarkDiariesMutation();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(
    post?.favourites?.length || 0
  );
  const [repostCount, setRepostCount] = useState(post?.repost?.length || 0);
  const [isRepost, setIsRepost] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [shareThought, setShareThought] = useState(false);
  const [thought, setThought] = useState("");
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const toggleComments = () => {
    setShowComments(!showComments);
    setAddComment(!addComment);
    onComment();
  };

  const handleShowEditModal = () => {
    setShowEditModal((prev)=>!prev);
    setShowPopup(false);
  };

  // LIKE AND UNLIKE FUNCTIONALITY
  const handleLike = async () => {
    const previousState = liked || isLikedByCurrentUser;
    const previousCount = likeCount;

    // Optimistically update the UI
    setLiked(!liked);
    setLikeCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));

    try {
      await loveDiary({ diary_id: post._id, reaction_type: "like" }).unwrap();
    } catch (error) {
      // Revert the state if the request fails
      setLiked(previousState);
      setLikeCount(previousCount);
      showAlert("Error", error.message, "error");
    }
  };

  useEffect(() => {
    if (userData?.data?.favourites) {
      const postBookmarked = userData.data.favourites.some(
        (fid) => fid === post?._id
      );
      setIsBookmarked(postBookmarked);
    }
  }, [userData, post?._id]);

  const handleBookmark = async () => {
    const previousState = isBookmarked || isLikedByCurrentUser;
    const previousCount = bookmarkCount;

    // Optimistically update the UI
    setIsBookmarked(!isBookmarked);
    setBookmarkCount((prevCount) =>
      isBookmarked ? prevCount - 1 : prevCount + 1
    );

    try {
      await bookMarkDiaries({ diary_id: post._id }).unwrap();
    } catch (error) {
      setIsBookmarked(previousState);
      setBookmarkCount(previousCount);
      showAlert("Error", error.message, "error");
    }
  };

  const [addComment, setAddComment] = useState(false);
  const onComment = () => {
    setAddComment(!addComment);
  };

  const repostUserIds = post?.repost?.map((user) => user._id);
  console.log(repostUserIds)
  const isRepostedByCurrentUser = repostUserIds?.includes(user._id);
  console.log(isRepostedByCurrentUser)

  const handleRespost = async () => {
    const repostUserIds = post?.repost?.map((user) => user._id);
    console.log(repostUserIds)
    const isRepostedByCurrentUser = repostUserIds?.includes(user._id);
    console.log(isRepostedByCurrentUser)

    if (isRepostedByCurrentUser) {
      showAlert("Notice", "You have already shared this post.", "info");
      return;
    }

    const previousState = isRepost;
    const previousCount = repostCount;

    setIsRepost(!isRepost);
    setRepostCount((prevCount) => (isRepost ? prevCount - 1 : prevCount + 1));

    const postData = { post_id: post._id };
    console.log(postData);
    try {
      await rtkMutation(repostPost, postData);
      showAlert("Great", "You reposted this post");
    } catch (error) {
      setIsRepost(previousState);
      setRepostCount(previousCount);
      console.error("Error reposting post:", error);
      showAlert("Oops", "An error occurred while reposting the post", "error");
    }
  };

  const handleRespostWithThought = async () => {
    const repostUserIds = post?.repost?.map((user) => user._id);
    console.log(repostUserIds)
    const isRepostedByCurrentUser = repostUserIds?.includes(user._id);
    console.log(isRepostedByCurrentUser)
    if (isRepostedByCurrentUser) {
      showAlert("Notice", "You have already shared this post.", "info");
      return;
    }

    const previousState = isRepost;
    const previousCount = repostCount;

    setIsRepost(!isRepost);
    setRepostCount((prevCount) => (isRepost ? prevCount - 1 : prevCount + 1));

    const postData = { post_id: post._id, message: thought };
    console.log(postData);
    try {
      await rtkMutation(repostPost, postData);
      showAlert("Great", "You reposted this post");
      setShareThought(false);
    } catch (error) {
      setIsRepost(previousState);
      setRepostCount(previousCount);
      console.error("Error reposting post:", error);
      showAlert("Oops", "An error occurred while reposting the post", "error");
    }
  };

  useEffect(() => {
    if (feedsSuccess) {
      refetchFeeds();
    }
  }, [feedsSuccess]);

  const handlePostActionClick = () => {
    setShowPopup(!showPopup);
  };

  const [visibleComments, setVisibleComments] = useState(2);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("post/")) {
      setVisibleComments(100);
    }
  }, [location]);

  const handleDeleteFeed = async (feed_id) => {
    setSelectedFeedId(feed_id);
    await deleteFeeds(feed_id);
    refetchFeeds();
    setShowPopup(false);
  };

  const [isRepostOpen, setIsRepostOpen] = useState(false);
  const repostRef = useRef(null);

  console.log(post?.pages);

  const navigatePage = (direction) => {
    if (direction === "next" && currentPageIndex < post?.pages.length - 1) {
      setCurrentPageIndex((prevIndex) => prevIndex + 1);
    } else if (direction === "prev" && currentPageIndex > 0) {
      setCurrentPageIndex((prevIndex) => prevIndex - 1);
    }
  };

  const EditorData = ({ htmlContent }) => {
    return (
      <div className="mb-4" dangerouslySetInnerHTML={{ __html: htmlContent }} />
    );
  };

  return (
    <div className="mx-auto bg-white border rounded-lg shadow-md p-4 my-4">
      <div className="flex items-center mb-4 relative">
        <Link to={`/profile/${post?.user_id?._id}`}>
          <div className={`rounded-full border-4 w-[3rem] h-[3rem]`}>
            <img
              src={post?.user_id?.photo_url || profile_placeholder}
              alt="profile"
              className="w-[3rem] h-[3rem] rounded-full object-cover"
            />
          </div>
        </Link>
        <div className=" flex justify-between w-full items-center">
          <div className="">
            <div className="flex gap-2 items-center">
              <Link to={`/profile/${post?.user_id?._id}`}>
                <h4 className="font-semibold post-name">
                  {post?.user_id?.display_name}
                </h4>
                {verifiedUser && (
                  <span>
                    <img src={verified} alt="" className="pb-1" />
                  </span>
                )}
              </Link>
            </div>
            <p className="text-gray-500">
              @{post?.user_id?.username} ·{" "}
              <span className="post-time ml-2 font-bold">
                {getTimeAgoString(post?.createdAt)}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-4">
            {post?.pages.length > 0 && (
              <div className="flex items-center gap-4">
                <button
                  className={`inline-block border rounded-full bg-[#D9D9D999] p-1 cursor-pointer ${
                    currentPageIndex === 0 && "invisible"
                  }`}
                  onClick={() => navigatePage("prev")}
                  disabled={currentPageIndex === 0}
                >
                  <MdKeyboardArrowLeft size={20} />
                </button>
                <button
                  className={`inline-block border rounded-full bg-[#D9D9D999] p-1 cursor-pointer ${
                    currentPageIndex === post.pages.length - 1 && "invisible"
                  }`}
                  onClick={() => navigatePage("next")}
                  disabled={currentPageIndex === post.pages.length - 1}
                >
                  <MdKeyboardArrowRight size={20} />
                </button>
              </div>
            )}

            {post?.user_id?._id === user._id ? (
              <RxDotsHorizontal
                className="ml-auto"
                onClick={handlePostActionClick}
              />
            ) : null}
          </div>
        </div>

        {showPopup && (
          <div className="absolute -right-4 top-[30px] z-50 popup rounded-md bg-[#ffffff] p-2">
            <div className="  w-[110px] h-[69px] bg-[#ffffff] rounded-[10px] p-2 flex items-center justify-center flex-col gap-2">
              {/* EDIT POST */}

              <button
                onClick={() => handleShowEditModal(true)}
                className={`flex w-[89px] h-[26px] px-[19px] py-[6px] bg-[#EFF4FF] text-[10px] text-[#838383] justify-center items-center border rounded-md hover:text-black`}
              >
                {"Edit Diary"}
              </button>

              <button
                onClick={() => handleDeleteFeed(post?._id)}
                disabled={isLoadingDeleteFeeds && selectedFeedId === post?._id}
                className="flex w-[89px] h-[26px] px-[15px] py-[6px] bg-[#EFF4FF] text-[10px] text-[#E71D36] justify-center items-center border rounded-md hover:text-white hover:bg-red-600"
              >
                {isLoadingDeleteFeeds && selectedFeedId === post?._id
                  ? "Deleting..."
                  : "Delete Post"}
              </button>
            </div>{" "}
          </div>
        )}
        {isSuccessDeleteFeed &&
          showAlert("Great", "Feed deleted successfully!")}
        {isErrorFeedError &&
          showAlert("Ooops", "Failed to delete the feed. Please try again.")}
      </div>
      <Link to={`/diary/${post?._id}`}>
      <EditorData htmlContent={post?.pages[currentPageIndex].content} />
        {/* <p className="mb-4">{post?.pages[0].content}</p> */}
        <div className="post-media rounded-md w-full py-3">
          <CustomCarousel
            media_urls={post?.pages[currentPageIndex].media_urls}
            left={left}
            right={right}
            dotsinactive={dotsinactive}
            dotsactive={dotsactive}
          />
        </div>
      </Link>
      <div className="flex justify-between items-center text-gray-500 mb-2">
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={handleLike}
        >
          <FaHeart
            className={liked || isLikedByCurrentUser ? "text-red-500" : ""}
          />
          <span>{likeCount}</span>
        </div>
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={toggleComments}
        >
          <FaCommentAlt />
          <span>{post?.comment?.length}</span>
        </div>
        <div
          className="flex items-center space-x-2"
          onClick={() => setIsRepostOpen(!isRepostOpen)}
        >
          <div className="">
            <DropdownMenu
              aria_label={"repost"}
              dropdownRef={repostRef}
              onClick={() => {
                setIsRepostOpen(!isRepostOpen);
              }}
              display_value={
                <>
                  <FaRetweet
                    className={`${
                      isRepostedByCurrentUser
                        ? "text-[#3D7100] font-bold text-2xl"
                        : ""
                    }`}
                  />
                </>
              }
              isDropdownOpen={isRepostOpen}
              listItem={
                <div className="px-2 py-1 w-full">
                  <ul className="py-3">
                    <li
                      className="flex  gap-1 items-center pb-5 cursor-pointer text-sm"
                      onClick={handleRespost}
                    >
                      <GoShareAndroid />
                      <span>Share Post</span>
                    </li>
                    <li
                      className="flex  gap-1 items-center cursor-pointer text-sm"
                      onClick={() => setShareThought(!shareThought)}
                    >
                      <CiEdit />
                      <span>Share your own thoughts</span>
                    </li>
                  </ul>
                </div>
              }
            />
          </div>

          <span>{repostCount}</span>
        </div>
        <div className="flex items-center space-x-2">
          <FaShare />
          <span>{post?.share?.length}</span>
        </div>
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={handleBookmark}
        >
          <CiBookmark className={isBookmarked ? "text-red-500" : ""} />
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
                location.pathname.includes("diary/") ? "hidden" : "flex"
              } flex justify-end text-xs italic pt-1 text-primary-dark-gray font-medium`}
              to={`diary/${post?._id}`}
            >
              Read more comments
            </Link>
          )}

          {addComment && (
            <DiaryComment
              id={post?._id}
              onComment={() => setAddComment(false)}
              placeholder={"Comment"}
              reply={false}
            />
          )}
        </>
      )}


      {showEditModal &&  (
        <EditDiary2 openDiaryModal={showEditModal} existingDiary={post} onClick={handleShowEditModal} />
      )}

      {shareThought && (
        <Modals
          title={"Repost this post"}
          openModal={shareThought}
          modalSize="2xl"
          onClose={() => setShareThought(false)}
        >
          <div className="w-full  mx-auto">
            <div className="rounded-md w-full py-3">
              <textarea
                name=""
                id=""
                className="w-full rounded-md min-h-[10rem]"
                value={thought}
                onChange={(e) => setThought(e.target.value)}
              ></textarea>
            </div>
            <button
              className={`bg-[#3D7100] w-full py-2 rounded-md text-white font-semibold text-[1.2rem] ${
                thought.length < 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={thought.length < 1}
              onClick={handleRespostWithThought}
            >
              Post
            </button>
          </div>
        </Modals>
      )}
    </div>
  );
};

export default Diary;