import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import post_action from "../../assets/images/main/post-action.svg";
import verified from "../../assets/images/main/verified.svg";
import PostButtons from "./PostButtons";
import Modals from "../modals/Modal";
import MainComment from "../profile/comments/MainComment";
import Comment from "./Comment";
import { ShimmerSocialPost } from "react-shimmer-effects";
import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Glider from "react-glider";
import "glider-js/glider.min.css";
import avatar4 from "../../assets/images/sidebar/avatar4.svg";

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
  const [allComment, setAllComment] = useState([]);
  const [addComment, setAddComment] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    setAllComment(comment);
  }, [addComment, comment]);

  const onComment = () => {
    setAddComment(!addComment);
  };

  const [modalOpenPost, setModalOpenPost] = useState(false);
  const [postData, setPostData] = useState(null);

  const handleSeeMore = () => {
    setPostData({
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
    });
    setModalOpenPost(true);
  };

  useEffect(() => {
    console.log("Post Data:", postData);
  }, [postData]);

  return (
    <>
      <div
        className="pt-4 post-wrapper w-full mb-10"
        // ref={ref}
        // initial={{ opacity: 0 }}
        // animate={inView ? { opacity: 1 } : { opacity: 0 }}
        // transition={{ duration: 0.5 }}
      >
        {content ? (
          <div className="post-card p-5">
            <div className="flex items-center justify-between">
              <div className="flex gap-3 items-center">
                <div className="rounded-full border-red-100 border">
                  <img
                    src={avatar || avatar4}
                    className="w-[40px] h-[40px]"
                    alt=""
                  />
                </div>
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
            <div className="post-content text-justify flex flex-row flex-wrap pt-3 pb-2">
              {content && <p>{content}</p>}
            </div>
            <div className="rounded-md mt-2 mb-4 w-full">
              <Glider
                draggable
                // hasArrows
                hasDots
                slidesToShow={1}
                slidesToScroll={1}
              >
                {media_urls.map((media, index) => (
                  <div
                    key={index}
                    className={` w-full flex items-center justify-center rounded-sm`}
                  >
                    {media.media_type.startsWith("image") ||
                    media.media_type.startsWith("svg") ||
                    media.media_type.startsWith("jp") ||
                    media.media_type.startsWith("webp") ||
                    media.media_type.startsWith("png") ? (
                      <LazyLoadImage
                        className="object-cover w-full h-[300px]"
                        alt="post image"
                        effect="blur"
                        src={media.media_url}
                      />
                    ) : (
                      <video
                        className="h-[350px] object-cover"
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

            <PostButtons
              id={post_id}
              comment={comment.length}
              repost={repost.length}
              share={share.length}
              reaction={reaction}
              onComment={onComment}
            />
            {allComment.length > 0 &&
              allComment
                .slice(-2)
                .map((cm, id) => <MainComment key={id} comment={cm} />)}

            {addComment && <Comment id={post_id} onComment={onComment} />}
            <hr className="mt-5" />
            <div className="flex justify-center items-center py-4">
              <button
                className="text-sm view-likes w-auto"
                onClick={handleSeeMore}
              >
                see more
              </button>
            </div>
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
        <div className="flex items-center justify-start">
          <div className="flex gap-3 items-center">
            <div className="rounded-full border-red-100 border">
              <img src={avatar} className="w-[40px] h-[40px]" alt="" />
            </div>
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
            {media_urls.map((media, index) => (
              <div
                key={index}
                className={` w-full flex items-center justify-center`}
              >
                {media.media_type.startsWith("image") ||
                media.media_type.startsWith("svg") ||
                media.media_type.startsWith("jp") ||
                media.media_type.startsWith("webp") ||
                media.media_type.startsWith("png") ? (
                  <img
                    className="object-cover w-full h-[250px]"
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
        <PostButtons
          id={post_id}
          comment={comment.length}
          repost={repost.length}
          share={share.length}
          reaction={reaction}
          onComment={onComment}
        />
        {addComment && (
          <Comment id={post_id} onComment={onComment} placeholder={"Comment"} />
        )}
        {allComment.length > 0 &&
          allComment.map((cm, id) => <MainComment key={id} comment={cm} />)}
      </Modals>
    </>
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
  post_id: PropTypes.string.isRequired,
  comment: PropTypes.array.isRequired,
  repost: PropTypes.array.isRequired,
  share: PropTypes.array.isRequired,
  reaction: PropTypes.object.isRequired,
};

export default Post;
