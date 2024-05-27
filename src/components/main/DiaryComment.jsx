import { useState, useEffect } from "react";
import { showAlert } from "../../static/alert";
import { useSelector } from "react-redux";
import { useGetUserProfiileQuery } from "../../service/user.service";
import avatar4 from "../../assets/images/sidebar/avatar4.svg";
import { useDiaryCommentMutation } from "../../service/diary.service";
import rtkMutation from "../../utils/rtkMutation";
import PropTypes from "prop-types";
import { useGetFeedsQuery } from "../../service/feeds.service";

const DiaryComment = ({ id, onComment, reply, placeholder }) => {
  //   console.log(id, onComment, reply, placeholder);
  const { data: profile } = useGetUserProfiileQuery();
  const { data: feedsData, refetch } = useGetFeedsQuery();
  console.log("feeds data: ", feedsData);

  const [content, setContent] = useState("");

  const [diaryComment, { isSuccess, error }] = useDiaryCommentMutation();

  const handleComment = async () => {
    onComment();

    if (content) {
      try {
        const commentData = { content, id, reply };

        await rtkMutation(diaryComment, commentData);

        setContent("");
      } catch (error) {
        console.error("Error submitting comment:", error);
        showAlert("Error", error.message, "error");
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      //   console.log("success");
      refetch();
      showAlert("Great!", "Comment added successfully", "success");
    } else if (error) {
      showAlert("Oops", "An error occurred", "error");
    }
  }, [isSuccess, error, refetch]);

  const name = useSelector((state) => state.user?.user?.display_name);

  return (
    <div className="w-full flex items-center justify-center gap-2 mt-3">
      <div className="border-white overflow- rounded">
        <img
          src={profile?.data?.photo_url || avatar4}
          width={40}
          height={40}
          alt="user-thumbnail"
          className="rounded-md"
        />
      </div>
      <div className="w-full rounded-md flex items-center bg-white pr-2 h-[36px] border-2">
        <input
          className="w-full outline-none focus:ring-0  p-2 border-none bg-transparent text-sm"
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={`${placeholder} as ${name}`}
        />

        <button
          className="cursor-pointer"
          onClick={content ? handleComment : undefined}
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
  );
};

DiaryComment.propTypes = {
  id: PropTypes.string.isRequired,
  onComment: PropTypes.func.isRequired,
  reply: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default DiaryComment;
