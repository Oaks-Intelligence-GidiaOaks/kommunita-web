import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import post_action from "../../assets/images/main/post-action.svg";
import verified from "../../assets/images/main/verified.svg";
import PostButtons from "./PostButtons";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import MainComment from "../profile/comments/MainComment";
import Comment from "./Comment";
import { ShimmerSocialPost } from "react-shimmer-effects";
import { useEffect, useState } from "react";

function Post({
  fullname,
  username,
  verifiedUser,
  postTime,
  content,
  media_urls,
  avatar,
  post_id,
  comment,
  repost,
  share,
  reaction,
}) {
  const settings = {
    className: "center",
    dots: true,
    arrows: true,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    adaptiveHeight: true,
  };

  const [allComment, setAllComment] = useState([]);
  const [addComment, setAddComment] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    setAllComment(comment);
  }, [addComment]);

  const onComment = () => {
    setAddComment(!addComment);
  };

  return (
    <motion.div
      className="pt-4 post-wrapper w-full mb-10"
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {content ? (
        <motion.div className="post-card p-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-3 items-center">
              <img src={avatar} className="w-[40px] h-[40px]" alt="" />
              <div>
                <div className="flex gap-2">
                  <p className="post-name pb-1">{fullname}</p>{" "}
                  {verifiedUser && (
                    <span>
                      <img src={verified} alt="" className="pb-1" />
                    </span>
                  )}
                </div>
                <p className="username">
                  @{username}{" "}
                  <span className="post-time ml-2 font-bold">{postTime}</span>
                </p>
              </div>
            </div>
            <button>
              <img src={post_action} alt="" />
            </button>
          </div>

          <div className="rounded-md mt-2 mb-4">
            <Slider {...settings}>
              {media_urls.map((media, index) => (
                <div
                  key={index}
                  className={` w-full p-2 flex items-center justify-center`}
                >
                  {media.media_type.startsWith("image") ||
                  media.media_type.startsWith("svg") ||
                  media.media_type.startsWith("jp") ||
                  media.media_type.startsWith("webp") ||
                  media.media_type.startsWith("png") ? (
                    <img
                      src={media.media_url}
                      className="object-cover w-full h-[350px] lg:h-[400px]"
                      alt="post image"
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
            </Slider>
          </div>
          <div className="post-content text-justify flex flex-row flex-wrap pt-3 pb-2">
            {content && <p>{content}</p>}
          </div>

          <PostButtons
            id={post_id}
            comment={comment.length}
            repost={repost.length}
            share={share.length}
            reaction={reaction}
            onComment={onComment}
          />
          {allComment.length > 0 &&
            allComment.map((cm, id) => <MainComment key={id} comment={cm} />)}
          {addComment && <Comment id={post_id} onComment={onComment} />}
        </motion.div>
      ) : (
        <ShimmerSocialPost type="both" />
      )}
    </motion.div>
  );
}

Post.propTypes = {
  fullname: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  verifiedUser: PropTypes.bool.isRequired,
  postTime: PropTypes.string.isRequired,
  content: PropTypes.string,
  media_urls: PropTypes.arrayOf(
    PropTypes.shape({
      media_type: PropTypes.string.isRequired,
      media_url: PropTypes.string.isRequired,
    })
  ).isRequired,
  avatar: PropTypes.string.isRequired,
};

export default Post;
