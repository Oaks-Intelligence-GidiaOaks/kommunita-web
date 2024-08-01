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
  useRepostPostMutation,
} from "../../service/post.service";
import { useGetUserProfiileQuery } from "../../service/user.service";

const RepostNew = ({ post }) => {
  const [showComments, setShowComments] = useState(false);
  const [lovePost, { error: loveError, isSuccess: loveSuccess }] = useLovePostMutation();
  const user = useSelector((state) => state.user.user);
  const login_user_id = useSelector((state) => state.user?.user?._id);
  const verifiedUser = false;
  const [liked, setLiked] = useState(post?.reaction?.like?.includes(user?._id));
  const [likeCount, setLikeCount] = useState(post?.reaction?.like?.length || 0);
  const likeUserIds = post?.reaction?.like?.map((user) => user._id);
  const isLikedByCurrentUser = likeUserIds?.includes(login_user_id);
  const { data: userData, refetch: refetchUser } = useGetUserProfiileQuery();
  const [bookMarkPost, { error: bookmarkError, isSuccess: bookMarkSuccess }] = useFavoritePostMutation();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [repost, { error: repostError, isSuccess: repostSuccess }] = useRepostPostMutation();
  const [isReposted, setIsReposted] = useState(post?.repost?.includes(user?._id));

  const toggleComments = () => {
    setShowComments(!showComments);
  };

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

  const handleBookmark = async () => {
    const previousState = isBookmarked;
    setIsBookmarked(!isBookmarked);

    try {
      await bookMarkPost({ post_id: post._id }).unwrap();
    } catch (error) {
      setIsBookmarked(previousState);
    }
  };

  const handleRepost = async () => {
    const previousState = isReposted;
    setIsReposted(!isReposted);

    try {
      await repost({ post_id: post._id }).unwrap();
    } catch (error) {
      setIsReposted(previousState);
    }
  };

  useEffect(() => {
    const postBookmarked = userData?.data?.favourites?.filter(
      (fid) => fid === post?._id
    );
    setIsBookmarked(postBookmarked?.length > 0);
  }, [userData, post._id, refetchUser]);

  return (
    <div className="mx-auto bg-white border rounded-lg shadow-md p-4 my-4">
     
        <div className="text-gray-500 mb-2">
          {post?.user_id?._id === login_user_id
            ? "You reposted this"
            : `@${post?.shared_by?.display_name} reposted this`}
        </div>
    
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
            className={
              liked || isLikedByCurrentUser ? "text-red-500" : ""
            }
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
        <div className="flex items-center space-x-2 cursor-pointer" onClick={handleRepost}>
          <FaRetweet className={isReposted ? "text-green-500" : ""} />
          <span>{post?.repost?.length}</span>
        </div>
        <div className="flex items-center space-x-2">
          <FaShare />
          <span>{post?.share?.length}</span>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer" onClick={handleBookmark}>
          <CiBookmark className={isBookmarked ? "text-yellow-500" : ""} />
        </div>
      </div>
      {showComments && (
        <div className="mt-4 bg-gray-100 p-4 rounded-lg">
          <Comment />
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
      )}
    </div>
  );
};

export default RepostNew;
