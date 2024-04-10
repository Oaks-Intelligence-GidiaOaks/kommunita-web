import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import fav from "../../assets/images/main/fav.svg";
import message from "../../assets/images/main/message.svg";
import retweet from "../../assets/images/main/retweet.svg";
import wishlist from "../../assets/images/main/wishlist.svg";

function PostButtons() {
  const [ref, inView] = useInView();

  return (
    <motion.div
      ref={ref}
      className="post-buttons flex gap-3 justify-end z-50"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 100 }}
      transition={{ duration: 0.5 }}
    >
      <motion.button
        className="flex gap-1 items-center"
        whileHover={{ scale: 1.1 }}
      >
        <img src={fav} alt="" />
        12k
      </motion.button>
      <motion.button
        className="flex gap-1 items-center"
        whileHover={{ scale: 1.1 }}
      >
        <img src={message} alt="" />
        12k
      </motion.button>
      <motion.button
        className="flex gap-1 items-center"
        whileHover={{ scale: 1.1 }}
      >
        <img src={retweet} alt="" />
        12k
      </motion.button>
      <motion.button
        className="flex gap-1 items-center"
        whileHover={{ scale: 1.1 }}
      >
        <img src={wishlist} alt="" />
        234
      </motion.button>
    </motion.div>
  );
}

export default PostButtons;
