import { useInView } from "react-intersection-observer";
import fav from "../../assets/images/main/fav.svg";
import reply from "../../assets/images/reply.png";

function CommentButtons({ comment, onComment, likes, onLike }) {
  const [ref, inView] = useInView();
  return (
    <div className="post-buttons flex gap-3 justify-end z-50">
      <button className="flex gap-1 items-center" onClick={onComment}>
        <img className="w-[20px]" src={reply} alt="" />
        {comment?.length}
      </button>
      <button onClick={onLike} className="flex gap-1 items-center">
        {/* <img src={fav} alt="" /> */}
        {/* {likes?.length} */}
      </button>
    </div>
  );
}

export default CommentButtons;
