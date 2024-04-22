import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import fav from "../../assets/images/main/fav.svg";
import message from "../../assets/images/main/message.svg";
import retweet from "../../assets/images/main/retweet.svg";
import reply from "../../assets/images/reply.png";
import wishlist from "../../assets/images/main/wishlist.svg";

function CommentButtons({ comment, onComment }) {
  const [ref, inView] = useInView();
  // console.log(comment);

  // const likes = comment.like.length + comment.love.length;
  return (
    <div
      // ref={ref}
      className="post-buttons flex gap-3 justify-end z-50"
      // initial={{ opacity: 0, x: 100 }}
      // animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 100 }}
      // transition={{ duration: 0.5 }}
    >
      <button
        className="flex gap-1 items-center"
        // whileHover={{ scale: 1.1 }}
        onClick={onComment}
      >
        <img className="w-[20px]" src={reply} alt="" />
        {comment?.length}
      </button>

      {/* <motion.button
        className="flex gap-1 items-center"
        whileHover={{ scale: 1.1 }}
      >
        <img src={retweet} alt="" />
        {repost}
      </motion.button> */}

      <button
        className="flex gap-1 items-center"
        // whileHover={{ scale: 1.1 }}
      >
        <img src={fav} alt="" />
        {/* {likes} */}
      </button>
    </div>
  );
}

export default CommentButtons;
