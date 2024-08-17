import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
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
import { Link } from "react-router-dom";
import getTimeAgoString from "../../utils/getTimeAgoString";
import {
  useFavoritePostsMutation,
  useGetSinglePostQuery,
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
import CustomCarousel2 from "../main/CustomCarousel2";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Spinner } from "flowbite-react";
import { useInView } from 'react-intersection-observer';

const SinglePost = () => {
  const { id } = useParams();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { data: singlepost, isLoading, } = useGetSinglePostQuery(id);
  const [
    deleteFeeds,
    {
      isLoading: isLoadingDeleteFeeds,
      isSuccess: isSuccessDeleteFeed,
      isError: isErrorFeedError,
    },
  ] = useDeleteFeedMutation();
  const [selectedFeedId, setSelectedFeedId] = useState(null);
  const navigate = useNavigate();
  const post = singlepost?.data;
  const [showComments, setShowComments] = useState(true);
  const [lovePost] = useLovePostMutation();
  const [repostPost] = useRepostPostMutation();
  const { isSuccess: feedsSuccess, refetch: refetchFeeds } = useGetFeedsQuery();
  const user = useSelector((state) => state.user.user);
  const login_user_id = useSelector((state) => state.user?.user?._id);
  const verifiedUser = false;
  const [liked, setLiked] = useState(post?.reaction?.like?.includes(user?._id));
  const [likeCount, setLikeCount] = useState(post?.reaction?.like?.length || 0);
  const likeUserIds = post?.reaction?.like?.map((user) => user._id);
  const isLikedByCurrentUser = likeUserIds?.includes(login_user_id);
  const { data: userData, refetch: refetchUser } = useGetUserProfiileQuery();
  const [favoritePost] = useFavoritePostsMutation();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(
    post?.favourites?.length || 0
  );
  const [repostCount, setRepostCount] = useState(post?.repost?.length || 0);
  const [isRepost, setIsRepost] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const toggleComments = () => {
    setShowComments(!showComments);
    setAddComment(!addComment);
    onComment();
  };

  const handleShowEditModal = () => {
    setShowEditModal(true);
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
      await lovePost({ post_id: post._id, reaction_type: "like" }).unwrap();
    } catch (error) {
      // Revert the state if the request fails
      setLiked(previousState);
      setLikeCount(previousCount);
      showAlert("Error", error.message, "error");
    }
  };

  useEffect(() => {
    if (userData?.data?.favourites) {
      const postBookmarked = userData?.data.favourites.some(
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
      await favoritePost({ post_id: post._id }).unwrap();
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

  const handleRespost = async () => {
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

  useEffect(() => {
    if (feedsSuccess) {
      refetchFeeds();
    }
  }, [feedsSuccess]);

  const handlePostActionClick = () => {
    setShowPopup(!showPopup);
  };

  console.log(id);
  console.log(post);

  const handleDeleteFeed = async (feed_id) => {
    setSelectedFeedId(feed_id);
    await deleteFeeds(feed_id);
    navigate(-1);
  };

  return (
    <div className=" pt-4 main-wrapper w-full pb-24 sm:pb-20 md:pb-10" ref={ref}>
      {/* <StoryList /> */}
      <div className="flex mt-10 justify-end">
        <button
          className="bg-white border rounded-lg shadow-md py-2 px-8"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeftLong className="inline-block" /> <span>Back</span>
        </button>
      </div>
      { inView &&
      <>
      {isLoading ? (
        <div className="flex justify-center pt-10  min-h-[70vh]">
          <Spinner />
        </div>
      ) : (
        <div className="mx-auto bg-white border rounded-lg shadow-md p-4 my-4">
          <div className="flex items-center mb-4 relative">
            <Link to={`/profile/${user?._id}`}>
              <div className={`rounded-full border-4 w-[3rem] h-[3rem]`}>
                <img
                  src={post?.user_id?.photo_url || profile_placeholder}
                  alt="profile"
                  className="w-[3rem] h-[3rem] rounded-full object-contain"
                />
              </div>
            </Link>
            <div className=" flex justify-between w-full items-center">
              <div className="">
                <div className="flex gap-2 items-center">
                  <Link to={`/profile/${user?._id}`}>
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
              {post?.user_id?._id === login_user_id ? (
                <RxDotsHorizontal
                  className="ml-auto"
                  onClick={handlePostActionClick}
                />
              ) : null}
            </div>

            {showPopup && (
              <div className="absolute -right-4 top-[30px] z-50 popup rounded-md bg-[#ffffff] p-2">
                <div className="  w-[110px] h-[69px] bg-[#ffffff] rounded-[10px] p-2 flex items-center justify-center flex-col gap-2">
                  {/* EDIT POST */}

                  <button
                    onClick={() => handleShowEditModal(true)}
                    className={`flex w-[89px] h-[26px] px-[19px] py-[6px] bg-[#EFF4FF] text-[10px] text-[#838383] justify-center items-center border rounded-md hover:text-black`}
                  >
                    {"Edit post"}
                  </button>

                  <button
                    onClick={() => handleDeleteFeed(post?._id)}
                    disabled={
                      isLoadingDeleteFeeds && selectedFeedId === post?._id
                    }
                    className="flex w-[89px] h-[26px] px-[15px] py-[6px] bg-[#EFF4FF] text-[10px] text-[#E71D36] justify-center items-center border rounded-md hover:text-white hover:bg-red-600"
                  >
                    {isLoadingDeleteFeeds && selectedFeedId === post?._id
                      ? "Deleting..."
                      : "Delete Post"}
                  </button>
                </div>{" "}
              </div>
            )}
          </div>
          {isSuccessDeleteFeed &&
            showAlert("Great", "Feed deleted successfully!")}
          {isErrorFeedError &&
            showAlert("Ooops", "Failed to delete the feed. Please try again.")}
          <p className="mb-4">{post?.content}</p>
          <div className="post-media rounded-md w-full py-3">
            <CustomCarousel2
              media_urls={post?.media_urls}
              left={left}
              right={right}
              dotsinactive={dotsinactive}
              dotsactive={dotsactive}
            />
          </div>
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
              onClick={handleRespost}
            >
              <FaRetweet />
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

          {/* {post?.comment?.map((comment, index) => (
        <MainComment key={index} comment={comment} />
      ))} */}

          {showComments && (
            <>
              {post?.comment?.map((comment, index) => (
                <MainComment key={index} comment={comment} />
              ))}
              {addComment && (
                <Comment
                  id={post?._id}
                  onComment={() => setAddComment(false)}
                  placeholder={"Comment"}
                />
              )}
            </>
          )}

          {/* {addComment && <Comment id={post?._id} onComment={onComment} placeholder={"Comment"} />} */}

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
      )}

</>}
    </div>
  );
};

export default SinglePost;
