import PropTypes from "prop-types";
// import post_action from "../../assets/images/main/post-action.svg";
// import verified from "../../assets/images/main/verified.svg";
// import fav from "../../assets/images/main/fav.svg";
// import message from "../../assets/images/main/message.svg";
// import retweet from "../../assets/images/main/retweet.svg";
// import wishlist from "../../assets/images/main/wishlist.svg";

function MediaModal({ media }) {
  return (
    <div className="pt-4 post-wrapper max-h-[550px] w-full max-w-[491px]">
      <div className="post-card p-4">
        <div className="flex items-center justify-between">
          {media.mimetype.startsWith("image") ? (
            <div className="w-full">
              {" "}
              <img
                src={media.downloadUrl}
                className="object-cover"
                alt="post image"
              />
            </div>
          ) : (
            <div className="w-full pb-5">
              <video className="object-contain" autoPlay controls width="100%">
                <source src={media.downlaodUrl} type="video/mp4" />
                Sorry, your browser doesn't support embedded videos.
              </video>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

MediaModal.propTypes = {
  // fullname: PropTypes.string.isRequired,
  // username: PropTypes.string.isRequired,
  // verifiedUser: PropTypes.bool.isRequired,
  // postTime: PropTypes.string.isRequired,
  // content: PropTypes.string,
  // imageSrc: PropTypes.string,
  // videoSrc: PropTypes.string, // addded by joseph
  // avatar: PropTypes.string.isRequired,
  media: PropTypes.array.isRequired,
};

export default MediaModal;
