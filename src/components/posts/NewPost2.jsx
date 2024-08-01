import React, { useEffect, useState } from "react";
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
import CustomCarousel from "../main/CustomCarousel";
import {
  useFavoritePostMutation,
  useLovePostMutation,
  usePostCommentMutation,
} from "../../service/post.service";
import { useGetUserProfiileQuery } from "../../service/user.service";
import { showAlert } from "../../static/alert";
import rtkMutation from "../../utils/rtkMutation";
import MainComment from "../profile/comments/MainComment";

const NewPost2 = ({ post, comment }) => {
  const [showComments, setShowComments] = useState(false);
  const [lovePost, { error, isSuccess }] = useLovePostMutation();
  const user = useSelector((state) => state.user.user);
  const login_user_id = useSelector((state) => state.user?.user?._id);
  const verifiedUser = false;
  const [liked, setLiked] = useState(post?.reaction?.like?.includes(user?._id));
  const [likeCount, setLikeCount] = useState(post?.reaction?.like?.length || 0);
  const likeUserIds = post?.reaction?.like?.map((user) => user._id);
  const isLikedByCurrentUser = likeUserIds?.includes(login_user_id);
  const { data: userData, refetch: refetchUser } = useGetUserProfiileQuery();
  const [favoritePost, { error: bookmarkError, isSuccess: bookMarkSuccess }] =
    useFavoritePostMutation();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  //   LIKE AND UNLIKE FUNTUIONALITY

  const handleLike = async () => {
    const previousState = liked;
    setLiked(!liked);
    setLikeCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));

    try {
      await lovePost({ post_id: post._id, reaction_type: "like" }).unwrap();
    } catch (error) {
      setLiked(previousState);
      setLikeCount((prevCount) =>
        previousState ? prevCount + 1 : prevCount - 1
      );
    }
  };

  const { data: profile } = useGetUserProfiileQuery();
  // console.log(profile, "profile");

  const [content, setContent] = useState("");

  const [postComment, { isSuccess: postSucces, error: postError }] =
    usePostCommentMutation();

  const handleComment = async () => {
    onComment();

    if (content) {
      try {
        const commentData = { content, id, reply };

        await rtkMutation(postComment, commentData);

        setContent("");
      } catch (error) {
        console.error("Error submitting comment:", error);
        showAlert("Error", error.message, "error");
      }
    }
  };

  useEffect(() => {
    if (postSucces) {
      console.log("success");
      showAlert("Great!", "Comment added successfully", "success");
    } else if (error) {
      showAlert("Oops", "An error occurred", "error");
    }
  }, [postSucces, postError]);

  const name = useSelector((state) => state.user?.user?.display_name);

  // HANDLE BOOKMARK FUNTIONALITY
  useEffect(() => {
    const postBookmarked = userData?.data?.favourites?.filter(
      (fid) => fid === post._id
    );
    setIsBookmarked(postBookmarked?.length > 0);
  }, [userData, post._id, refetchUser]);

  const handleBookmark = async () => {
    const previousState = isBookmarked;
    setIsBookmarked(!isBookmarked);
    console.log(post._id);

    try {
      await favoritePost({ post_id: post?._id, typ: "post" }).unwrap();
    } catch (error) {
      setIsBookmarked(previousState);
    }
  };

  useEffect(() => {
    if (isSuccess || bookMarkSuccess) {
      console.log("Success");
    } else if (error || bookmarkError) {
      showAlert("Oops", "An error occurred", "error");
    }
  }, [isSuccess, error, bookMarkSuccess, bookmarkError]);

  const [addComment, setAddComment] = useState(false);
  const onComment = () => {
    setAddComment(!addComment);
  };

  return (
    <div className="mx-auto bg-white border rounded-lg shadow-md p-4 my-4">
      <div className="flex items-center mb-4">
        <Link to={`/profile/${user?._id}`}>
          <div
            className={`rounded-full border-4 w-[3rem] h-[3rem]`}
            style={{ borderColor: "" }}
          >
            <img
              src={post?.user_id?.photo_url || profile_placeholder}
              alt="profile"
              className="w-full rounded-full object-cover "
            />
          </div>
        </Link>

        <div className="ml-4">
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
      </div>
      <p className="mb-4">{post?.content}</p>
      <div className="post-media rounded-md w-full py-3">
        <CustomCarousel
          media_urls={post?.media_urls}
          left={left}
          right={right}
          dotsinactive={dotsinactive}
          dotsactive={dotsactive}
        />
      </div>
      <div className="flex justify-between items-center text-gray-500 mb-2">
        <div className="flex items-center space-x-2" onClick={handleLike}>
          <FaHeart
            className={liked || isLikedByCurrentUser ? "text-red-500" : ""}
          />
          <span>{post?.reaction?.like?.length}</span>
        </div>
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={toggleComments}
        >
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
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={handleBookmark}
        >
          <CiBookmark className={isBookmarked ? "text-red-500" : ""} />
          <span>{post?.favourites?.length}</span>
        </div>
      </div>
      {/* {showComments && (
        <div className="mt-4 bg-gray-100 p-4 rounded-lg">
          Render comments here
          {post?.comment?.map((comment, index) => (
            <div key={index} className="flex items-start mb-4">
              <img
                src={comment?.user?.photo_url || profile_placeholder}
                alt="profile"
                className="w-10 h-10 rounded-full"
              />
              <div className="ml-4 flex-1">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold">
                    {comment?.user?.display_name}
                  </h4>
                  <p className="text-gray-500">{comment?.text}</p>
                </div>
                <div className="flex items-center mt-2">
                  <span>❤️</span>
                  <span className="ml-1">{comment?.reaction?.length}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )} */}

      {post?.comment?.map((comment, index) => (
        <MainComment key={index} comment={comment} />
      ))}

      <Comment id={post?._id} onComment={onComment} placeholder={"Comment"} />
    </div>
  );
};

export default NewPost2;
