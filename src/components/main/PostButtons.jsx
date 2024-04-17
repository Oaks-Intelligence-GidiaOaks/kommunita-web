import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import fav from "../../assets/images/main/fav.svg";
import message from "../../assets/images/main/message.svg";
import retweet from "../../assets/images/main/retweet.svg";
import reply from "../../assets/images/reply.png";
import wishlist from "../../assets/images/main/wishlist.svg";
import axios from "axios";
import { showAlert } from "../../static/alert";
import { useSelector } from "react-redux";
import { useGetFeedsQuery } from "../../service/feeds.service";
function PostButtons({
  id,
  comment,
  reaction,
  repost,
  share,
  reply,
  onComment,
}) {
  const { data, refetch } = useGetFeedsQuery();
  const [ref, inView] = useInView();
  const token = useSelector((state) => state.user?.token);
  const likes = reaction.like.length + reaction.love.length;
  const handleLike = async () => {
    const apiUrl = import.meta.env.VITE_REACT_APP_BASE_URL;
    const url = `${apiUrl}/user/reaction/post`;
    const body = { post_id: id, reaction_type: "like" };
    try {
      // Send form data to the server
      const response = await axios.post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
          // Set the authorization header with the token
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      console.log("Post liked successfully:", response.data);
      // Clear selected items and textarea content after submission

      if (response.data.success == true) {
        refetch();
        // showAlert("Great!", "Comment added successfully", "success");
      }
    } catch (error) {
      console.error("Error Liking:", error);
      showAlert("Error", error, "error");
    }
  };
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
        <img src={fav} alt="" />
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
      >
        <img src={retweet} alt="" />
        {repost}
      </motion.button>
      <motion.button
        className="flex gap-1 items-center"
        whileHover={{ scale: 1.1 }}
      >
        <img src={wishlist} alt="" />0
      </motion.button>
    </motion.div>
  );
}

export default PostButtons;
