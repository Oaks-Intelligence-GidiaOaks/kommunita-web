import { useState,  } from "react";
import { showAlert } from "../../static/alert";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserProfiileQuery } from "../../service/user.service";
import avatar4 from "../../assets/images/sidebar/avatar4.svg";
import { usePostCommentMutation } from "../../service/post.service";
import PropTypes from "prop-types";
import { useGetFeedsQuery } from "../../service/feeds.service";
import { toggleComment } from "../../redux/slices/comment.slice";

// eslint-disable-next-line no-unused-vars
const Comment = ({ id, onComment, reply, placeholder }) => {
  const { data: profile } = useGetUserProfiileQuery();
  const { refetch } = useGetFeedsQuery();
  const [content, setContent] = useState("");
  const [posting, setPosting] = useState(false);
  const [comments, setComments] = useState([]);
  const [postComment] = usePostCommentMutation();
  const name = useSelector((state) => state.user?.user?.display_name);
  const dispatch = useDispatch()


  const handleComment = async () => {
    if (!content) return;
    dispatch(toggleComment())
    setPosting(!posting)
    const newComment = {
      id: Date.now(),
      content,
      reply,
      isPending: true,
    };

    setComments((prevComments) => [newComment, ...prevComments]);
    setContent("");

    try {
      const commentData = { content, id, reply };
      await postComment(commentData).unwrap();

      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === newComment.id
            ? { ...comment, isPending: false }
            : comment
        )
      );
    setPosting(false)
        refetch()
      showAlert("Great!", "Comment added successfully", "success");
    } catch (error) {
      console.error("Error submitting comment:", error);
      showAlert("Error", error.message, "error");

      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== newComment.id)
      );
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-2 mt-3">
        <div className="w-full">
        {posting && comments.map((comment) => (
          <div key={comment.id} className="border rounded p-2 mt-2">
            <p>{comment.content}</p>
            {comment.isPending && <small>Posting...</small>}
          </div>
        ))}
      </div>

      <div className="w-full flex items-center gap-2">
        <div className="border-white overflow-hidden w-6 h-6 rounded-full">
          <img
            src={profile?.data?.photo_url || avatar4}
            width={40}
            height={40}
            alt="user-thumbnail"
            className="w-6 h-6 rounded-full"
          />
        </div>
        <div className="w-full rounded-md flex items-center bg-white pr-2 h-[36px] border-2">
          <input
            className="w-full outline-none focus:ring-0 p-2 border-none bg-transparent text-sm"
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`${placeholder} as ${name}`}
          />
          <button
            className="cursor-pointer bord"
            onClick={handleComment}
            disabled={!content}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              className="w-5 h-5"
              style={{ stroke: content ? "blue" : "#fff" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    
    </div>
  );
};

Comment.propTypes = {
  id: PropTypes.string.isRequired,
  onComment: PropTypes.func.isRequired,
  reply: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default Comment;
