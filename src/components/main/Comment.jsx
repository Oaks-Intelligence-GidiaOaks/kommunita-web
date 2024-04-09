import React, { useState } from "react";
import { showAlert } from "../../static/alert";
import axios from "axios";
import { useSelector } from "react-redux";

const Comment = ({ post_id }) => {
  const token = useSelector((state) => state.user?.token);
  const [content, setContent] = useState("");

  const handleComment = async () => {
    // Prepare form data
    // const formData = new FormData();

    // formData.append("content", content);
    // formData.append("post_id", post_id);
    if (content) {
      const body = { content, post_id };
      const apiUrl = import.meta.env.VITE_REACT_APP_BASE_URL;
      //   console.log(body);
      try {
        // Send form data to the server
        const response = await axios.post(`${apiUrl}/user/comment/post`, body, {
          headers: {
            "Content-Type": "multipart/form-data",
            // Set the authorization header with the token
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        });
        console.log("Post submitted successfully:", response.data);
        // Clear selected items and textarea content after submission
        setContent("");
        if (response.data.success == true) {
          showAlert("Great!", "Comment added successfully", "success");
        }
      } catch (error) {
        console.error("Error submitting comment:", error);
        showAlert("Error", error, "error");
      }
    }
  };

  return (
    <div className="w-full flex items-center gap-2 mt-2">
      <div className="border-white w-[40px] h-[38px] overflow-hidden rounded">
        <img
          src="/src/assets/images/gp-thumbnail.jpeg"
          width={40}
          height={38}
          alt="user-thumbnail"
        />
      </div>
      <div className="w-full rounded-lg flex items-center bg-gray-300">
        <input
          className="w-full outline-none  p-2 border-none bg-transparent "
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a comment"
        />
        <div className="cursor-pointer" onClick={handleComment}>
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
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>
        </div>
        {/* <textarea className="rounded-lg p-2 border-none" name=""></textarea> */}
      </div>
    </div>
  );
};

export default Comment;
