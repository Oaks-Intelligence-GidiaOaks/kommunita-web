import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import post_action from "../../assets/images/main/post-action.svg";
import verified from "../../assets/images/main/verified.svg";
import PostButtons from "./PostButtons";

function Post({
  fullname,
  username,
  verifiedUser,
  postTime,
  content,
  imageSrc,
  avatar,
  videoSrc,
}) {
  const { ref, inView } = useInView({
    // triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <motion.div
      className="pt-4 post-wrapper w-full"
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div className="post-card p-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-3 items-center">
            <img src={avatar} alt="" />
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

        <div className="post-content text-justify flex flex-row flex-wrap pt-3 pb-3">
          {content && <p>{content}</p>}
        </div>
        {imageSrc && (
          <div className="img-post flex w-full pb-5">
            <img
              src={imageSrc}
              className="w-full h-full object-cover"
              alt="post image"
            />
          </div>
        )}

        {videoSrc && (
          <div className="img-post flex w-full pb-5">
            <iframe
              className="w-full h-[250px] object-cover"
              frameborder="0"
              src={videoSrc}
              allow="autoplay; encrypted-media"
              allowfullscreen
              title={content}
            />{" "}
          </div>
        )}

        <PostButtons />
      </motion.div>
    </motion.div>
  );
}

Post.propTypes = {
  fullname: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  verifiedUser: PropTypes.bool.isRequired,
  postTime: PropTypes.string.isRequired,
  content: PropTypes.string,
  imageSrc: PropTypes.string,
  videoSrc: PropTypes.string,
  avatar: PropTypes.string.isRequired,
};

export default Post;
