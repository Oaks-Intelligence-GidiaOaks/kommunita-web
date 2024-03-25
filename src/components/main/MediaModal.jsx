import PropTypes from "prop-types";
import post_action from "../../assets/images/main/post-action.svg";
import verified from "../../assets/images/main/verified.svg";
import fav from "../../assets/images/main/fav.svg";
import message from "../../assets/images/main/message.svg";
import retweet from "../../assets/images/main/retweet.svg";
import wishlist from "../../assets/images/main/wishlist.svg";

function MediaModal({
  fullname,
  username,
  verifiedUser,
  postTime,
  content,
  imageSrc,
  avatar,
  videoSrc, // addded by joseph
}) {
  return (
    <div className="pt-4 post-wrapper max-h-[550px] w-full max-w-[491px]">
      <div className="post-card p-4">
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
        {imageSrc && imageSrc.includes("jpeg" || "png" || "jpg") && (
          <div className="img-post flex w-full h-[500px]">
            <img
              src={imageSrc}
              className="w-full object-contain"
              alt="post image"
            />
          </div>
        )}

        {/* START - added by joseph */}
        {videoSrc && videoSrc.includes("mp4") && (
          <div className="img-post flex w-full pb-5">
            <video className="rounded-xl" autoPlay muted loop>
              <source src={videoSrc} type="video/mp4" />
            </video>
          </div>
        )}
        {/* END - added by joseph */}

        <div className="post-buttons flex gap-3 justify-end">
          <button className="flex gap-1 items-center">
            <img src={fav} alt="" />
            12k
          </button>
          <button className="flex gap-1 items-center">
            <img src={message} alt="" />
            12k
          </button>
          <button className="flex gap-1 items-center">
            <img src={retweet} alt="" />
            12k
          </button>
          <button className="flex gap-1 items-center">
            <img src={wishlist} alt="" />
            234
          </button>
        </div>
      </div>
    </div>
  );
}

MediaModal.propTypes = {
  fullname: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  verifiedUser: PropTypes.bool.isRequired,
  postTime: PropTypes.string.isRequired,
  content: PropTypes.string,
  imageSrc: PropTypes.string,
  videoSrc: PropTypes.string, // addded by joseph
  avatar: PropTypes.string.isRequired,
};

export default MediaModal;
