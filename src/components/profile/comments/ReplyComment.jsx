import CommentButtons from "./../../main/CommentButtons";
import image4 from "../../../assets/images/sidebar/avatar4.svg";
import PropTypes from "prop-types";
import "./style.css";

const ReplyComment = ({ reply }) => {
  let bordercolor = "";
  if (reply?.user_id?.department) {
    bordercolor = reply.user_id?.department[0]?.badge?.color;
  }
  // console.log(bordercolor);
  return (
    <div className="relative bg-primary-light-gray bg-opacity-10 p-2 rounded-lg mt-5 text-primary-dark-gray">
      <div className="flex justify-between items-center">
        <div className="flex gap- justify-start items-start">
          <div
            style={{
              borderColor: bordercolor,
            }}
            className="flex text-[#181616] justify-center items-center w-[20px] overflow-hidden border-2 h-[20px] rounded-full"
          >
            <img
              src={reply.user_id.photo_url || image4}
              width={19}
              height={19}
              alt="user-thumbnail"
            />
          </div>

          <div className="pt-2 flex justify-start flex-col">
            <div>
              <h2 className="comment-name pl-2 -mt-[6px]">
                {reply?.user_id?.display_name}
              </h2>
            </div>
            <div>
              <p className="mt-2 pl-2 comment">{reply.content}</p>
            </div>
            {/* <div className="flex text-[7px] pt-1 gap-2 text-primary-gray">
              <p className="cursor-pointer">Like</p>
              <p className="cursor-pointer">Reply</p>
            </div> */}
          </div>
        </div>

        <div className="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
        </div>
      </div>
      <div className="self-end">
        {/* <CommentButtons comment={reply?.replies} /> */}
      </div>
    </div>
  );
};

ReplyComment.propTypes = {
  reply: PropTypes.shape({
    user_id: PropTypes.shape({
      photo_url: PropTypes.string,
      display_name: PropTypes.string.isRequired,
    }).isRequired,
    content: PropTypes.string.isRequired,
    replies: PropTypes.arrayOf(
      PropTypes.shape({
        // Define shape of each reply if needed
      })
    ),
  }).isRequired,
};

export default ReplyComment;
