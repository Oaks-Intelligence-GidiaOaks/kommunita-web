import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import fav from "../../assets/images/main/fav.svg";
import favRed from "../../assets/images/main/favRed.svg";
import message from "../../assets/images/main/message.svg";
import retweet from "../../assets/images/main/retweet.svg";
import reply from "../../assets/images/reply.png";
import wishlist from "../../assets/images/main/wishlist.svg";
import axios from "axios";
import { showAlert } from "../../static/alert";
import { useSelector } from "react-redux";
import {
  useFavoritePostMutation,
  useLovePostMutation,
  useRepostPostMutation,
} from "../../service/post.service";
import rtkMutation from "../../utils/rtkMutation";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

function PostButtons({
  id,
  comment,
  reaction,
  repost,
  share,
  reply,
  refetchFav,
  onComment,
  type,
}) {
  const location = useLocation();
  const { pathname } = location;

  const [isLoved, setIsLoved] = useState(false);
  const login_user_id = useSelector((state) => state.user?.user?._id);

  const [ref, inView] = useInView();
  const likes = reaction.like.length + reaction.love.length;
  const likeUserIds = reaction.like.map((user) => user._id);

  const isLikedByCurrentUser = likeUserIds.includes(login_user_id);

  const [lovePost, { error, isSuccess }] = useLovePostMutation();

  const [bookMarkPost, { error: bookmarkError, isSuccess: bookMarkSuccess }] =
    useFavoritePostMutation();
  const [repostPost, { error: err, isSuccess: scs }] = useRepostPostMutation();

  const handleLike = async () => {
    const postData = { post_id: id, reaction_type: "like" };
    try {
      await rtkMutation(lovePost, postData);
      setIsLoved((prevIsLoved) => !prevIsLoved);
    } catch (error) {
      console.error("Error liking post:", error);
      showAlert("Oops", "An error occurred while liking the post", "error");
    }
  };
  const handleRespost = async () => {
    const postData = { post_id: id };
    try {
      await rtkMutation(repostPost, postData);
    } catch (error) {
      console.error("Error liking post:", error);
      showAlert("Oops", "An error occurred while liking the post", "error");
    }
  };

  // Bookmark
  const handleBookmark = async () => {
    const typ = type.includes("pos") ? "post" : "diary";

    const postData = type.includes("pos") ? { post_id: id } : { diary_id: id };

    const dt = { postData, typ };
    try {
      const rr = await rtkMutation(bookMarkPost, dt);
      // console.log(rr);
      if (pathname == "/bookmarks") {
        showAlert("Removed", "", "success");
        refetchFav();
      } else {
        showAlert("Bookmarked!!!", "", "success");
      }
    } catch (error) {
      console.error("Error bookmarking post:", error);
      showAlert("Oops", error.message, "error");
    }
  };

  useEffect(() => {
    if (isSuccess || bookMarkSuccess) {
      console.log("success");
    } else if (error || bookmarkError) {
      // showAlert("Oops", error.data.message || "An error occurred", "error");
      showAlert("Oops", "An error occurred", "error");
    }
  }, [isSuccess, error, bookMarkSuccess, bookmarkError]);

  return (
    <motion.div
      ref={ref}
      className="post-buttons flex gap-3 justify-end z-50"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 100 }}
      transition={{ duration: 0.5 }}
    >
      {/* <motion.button
        className="flex gap-1 items-center"
        whileHover={{ scale: 1.1 }}
      >
        <img className="w-[20px]" src={reply} alt="" />
        {comment}
      </motion.button> */}
      <motion.button
        className="flex gap-1 items-center"
        whileHover={{ scale: 1.1 }}
        onClick={handleLike}
      >
        <img src={isLoved || isLikedByCurrentUser ? favRed : fav} alt="" />{" "}
        {likes}
      </motion.button>
      <motion.button
        className="flex gap-1 items-center"
        whileHover={{ scale: 1.1 }}
        onClick={onComment}
      >
        <img src={message} alt="" />
        {comment}
      </motion.button>
      <motion.button
        className="flex gap-1 items-center"
        whileHover={{ scale: 1.1 }}
        onClick={handleRespost}
      >
        <img src={retweet} alt="" />
        {repost}
      </motion.button>
      <motion.button
        className="flex gap-1 items-center"
        whileHover={{ scale: 1.1 }}
        onClick={handleBookmark}
      >
        <img src={wishlist} alt="" />
      </motion.button>
    </motion.div>
  );
}

PostButtons.propTypes = {
  id: PropTypes.string.isRequired,
  comment: PropTypes.number.isRequired,
  reaction: PropTypes.shape({
    like: PropTypes.array.isRequired,
    love: PropTypes.array.isRequired,
  }).isRequired,
  repost: PropTypes.number.isRequired,
  share: PropTypes.number.isRequired,
  onComment: PropTypes.func.isRequired,
};

export default PostButtons;
