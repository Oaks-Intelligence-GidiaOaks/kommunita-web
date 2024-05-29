import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import post_action from "../../assets/images/main/post-action.svg";
import verified from "../../assets/images/main/verified.svg";
import Modals from "../modals/Modal";
import MainComment from "../profile/comments/MainComment";
// import Comment from "./Comment";
import { ShimmerSocialPost } from "react-shimmer-effects";
import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Glider from "react-glider";
import "glider-js/glider.min.css";
import avatar4 from "../../assets/images/sidebar/avatar4.svg";
import left from "../../assets/carousel/left.svg";
import right from "../../assets/carousel/right.svg";
import dotsactive from "../../assets/carousel/dotsactive.svg";
import dotsinactive from "../../assets/carousel/dotsinactive.svg";
// import CustomCarousel from "./CustomCarousel";
import "../main/style.css";
import PostButtons from "./../main/PostButtons";
import Comment from "./../main/Comment";
import CustomCarousel from "./../main/CustomCarousel";
import { useGetOtherUserProfileMutation } from "../../service/user.service";
import { showAlert } from "../../static/alert";
import { Link } from "react-router-dom";

function SearchPost({
  post,
  fullname,
  username,
  verifiedUser,
  postTime,
  content,
  media_urls,
  avatar,
  post_id,
  repost,
  share,
  reaction,
}) {
  const [getOtherUserProfile, { isSuccess, isError }] =
    useGetOtherUserProfileMutation();
  const [profile, setProfile] = useState(null);
  // const [allComment, setAllComment] = useState([]);
  // const [addComment, setAddComment] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    GetOtherUser();
  }, []);

  const GetOtherUser = async () => {
    try {
      const res = await getOtherUserProfile(post.user_id);
      setProfile(res.data.data);
      // console.log(res.data.data);
    } catch (error) {
      console.error("Error fetching user: ", error);
      showAlert("Oops", "An error occurred while getting user", "error");
    }
  };

  // useEffect(() => {
  //   setAllComment(comment);
  // }, [addComment, comment]);

  // const onComment = () => {
  //   setAddComment(!addComment);
  // };

  const [modalOpenPost, setModalOpenPost] = useState(false);
  const [postData, setPostData] = useState(null);

  const handleSeeMore = () => {
    setPostData({
      post,
      fullname,
      username,
      verifiedUser,
      postTime,
      content,
      media_urls,
      avatar,
      post_id,
      repost,
      share,
      reaction,
    });
    setModalOpenPost(true);
  };

  // const [visibleComments, setVisibleComments] = useState(5);

  // Sort comments by latest first
  // const sortedComments = [...allComment].sort(
  //   (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  // );

  // const loadMoreComments = () => {
  //   setVisibleComments((prevVisibleComments) => prevVisibleComments + 5);
  // };

  return (
    <div className="w-full">
      <div className="pt-3 w-full">
        {content ? (
          <div className="post-card p-5 h-auto">
            <div className="flex items-center justify-between">
              <div className="flex gap-3 items-center">
                <Link to={`/profile/${post.user_id}`}>
                  <div
                    className={`rounded-full border-4 w-[40px] h-[40px]`}
                    style={{ borderColor: "" }}
                  >
                    <img
                      src={profile?.photo_url || avatar}
                      className="rounded-full w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                </Link>
                <div>
                  <div className="flex gap-2 items-center">
                    <Link to={`/profile/${post.user_id}`}>
                      <p className="post-name">{profile?.display_name}</p>{" "}
                      {profile?.verifiedUser && (
                        <span>
                          <img
                            src={profile?.verified}
                            alt=""
                            className="pb-1"
                          />
                        </span>
                      )}
                    </Link>
                    <span className="post-time ml-2 font-bold">{postTime}</span>
                  </div>
                  <p className="username flex gap-1 items-center">
                    <div className="flex flex-col">@{profile?.username}</div>
                  </p>
                </div>
              </div>
              <button>
                <img src={post_action} alt="" />
              </button>
            </div>
            <div className="post-content pt-3 pb-2 w-[431.99px] h-auto">
              {content && (
                <p className="text-justify flex flex-row flex-wrap">
                  {content.length > 177
                    ? content.slice(0, 177) + "..."
                    : content}
                </p>
              )}
            </div>
            {content && content.length > 177 && (
              <div className="flex justify-end items-center py-3">
                <p
                  className="text-sm cursor-pointer hover:text-blue-600 text-gray-400"
                  onClick={handleSeeMore}
                >
                  see more
                </p>
              </div>
            )}

            <div className="post-media rounded-md w-full py-3">
              <CustomCarousel
                media_urls={media_urls}
                left={left}
                right={right}
                dotsinactive={dotsinactive}
                dotsactive={dotsactive}
              />
            </div>

            {/* <PostButtons
              id={post_id}
              comment={comment.length}
              repost={repost.length}
              share={share.length}
              reaction={reaction}
              onComment={onComment}
            /> */}

            {/* {allComment.length > 0 &&
              [...allComment]
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(-1)
                .map((cm, id) => <MainComment key={id} comment={cm} />)} */}

            {/* {addComment && (
              <Comment
                id={post_id}
                onComment={onComment}
                placeholder={"Comment"}
              />
            )} */}
          </div>
        ) : (
          <ShimmerSocialPost type="both" />
        )}
      </div>

      <Modals
        openModal={modalOpenPost}
        modalSize="3xl"
        onClose={() => setModalOpenPost(false)}
      >
        <div className="flex items-center justify-start w-full">
          <div className="flex gap-3 items-center">
            <div className="rounded-full border-red-100 border">
              <img src={avatar} className="w-[40px] h-[40px]" alt="" />
            </div>
            <div>
              <div className="flex gap-2">
                <p className="post-name pb-1">{profile?.display_name}</p>{" "}
                {verifiedUser && (
                  <span>
                    <img
                      src={profile?.isEmailVerified}
                      alt=""
                      className="pb-1"
                    />
                  </span>
                )}
              </div>
              <p className="username">
                @{profile?.username}{" "}
                <span className="post-time ml-2 font-bold">{postTime}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="content flex flex-wrap justify-start text-[#838383] font-Inter text-sm pt-3 ml-2">
          {content}
        </div>
        <div className="media rounded-sm mt-3 mb-3 w-full">
          <Glider
            draggable
            // hasArrows
            hasDots
            slidesToShow={1}
            slidesToScroll={1}
          >
            {media_urls?.map((media, index) => (
              <div
                key={index}
                className={` w-full flex items-center justify-center`}
              >
                {media.media_type.startsWith("image") ||
                media.media_type === "jpeg" ||
                media.media_type === "svg" ||
                media.media_type === "jpg" ||
                media.media_type === "webp" ||
                media.media_type === "octet-stream" ||
                media.media_type === "png" ? (
                  <img
                    className="w-full aspect-video"
                    alt="post image"
                    // effect="blur"
                    src={media.media_url}
                  />
                ) : (
                  <video
                    className="h-[350px] lg:h-[400px] object-cover"
                    controls
                    width="100%"
                  >
                    <source src={media.media_url} type="video/mp4" />
                    Sorry, your browser doesn't support embedded videos.
                  </video>
                )}
              </div>
            ))}
          </Glider>
        </div>
        {/* <PostButtons
          id={post_id}
          comment={comment?.length}
          repost={repost?.length}
          share={share?.length}
          reaction={reaction}
          onComment={onComment}
        /> */}
        {/* {addComment && (
          <Comment id={post_id} onComment={onComment} placeholder={"Comment"} />
        )} */}
        {/* <div>
          {sortedComments.slice(0, visibleComments).map((comment, id) => (
            <MainComment key={id} comment={comment} />
          ))}

          {sortedComments.length > visibleComments && (
            <button className="text-sm" onClick={loadMoreComments}>
              Load more comments
            </button>
          )}
        </div> */}
      </Modals>
    </div>
  );
}

export default SearchPost;
