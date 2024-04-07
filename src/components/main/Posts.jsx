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
  media_urls,
  avatar,
}) {
  const { ref, inView } = useInView({
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

        <div className="post-content text-justify flex flex-row flex-wrap pt-3 pb-2">
          {content && <p>{content}</p>}
        </div>

        <div className="uploaded-items-container  rounded-md max-h-80 overflow-y-auto mt-2 flex flex-wrap mb-4">
          {media_urls.map((media, index) => (
            <div
              key={index}
              className={`media-item-wrapper ${
                media_urls.length === 1 ? "w-full" : "w-1/2"
              } p-2`}
            >
              {media.media_type.startsWith("image") ||
              media.media_type.startsWith("svg") ? (
                <img
                  src={media.media_url}
                  className="w-full h-auto object-cover"
                  alt="post image"
                />
              ) : (
                <video
                  src={media.media_url}
                  className="w-full h-[250px] object-cover"
                  controls
                />
              )}
            </div>
          ))}
        </div>

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
  media_urls: PropTypes.arrayOf(
    PropTypes.shape({
      media_type: PropTypes.string.isRequired,
      media_url: PropTypes.string.isRequired,
    })
  ).isRequired,
  avatar: PropTypes.string.isRequired,
};

export default Post;
