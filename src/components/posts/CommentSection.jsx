import React from 'react'
import CommentButtons from '../main/CommentButtons';
import { useState } from "react";
import { GoDotFill } from "react-icons/go";
import "./style.css";
import Comment from '../main/Comment';
import ReplyComment from '../profile/comments/ReplyComment';
import getTimeAgoString from '../../utils/getTimeAgoString';
import { profile_placeholder } from '../../assets/images';
import fav from "../../assets/images/main/fav.svg";
import reply from "../../assets/images/reply.png";


const CommentSection = ({comment, }) => {
    let bordercolor = "";
    if (comment?.user_id?.department) {
      bordercolor = comment.user_id?.department[0]?.badge?.color;
    }
    const [addReply, setAddReply] = useState(false);
    // console.log(comment);
    const onReply = () => {
      setAddReply(!addReply);
    };
  return (
    <div>
          <div className="relative mt-5 text-primary-dark-gray ">
      {/* <Comment id={comment._id} onComment={onReply} /> */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2 justify-center items-center">
          <div
            className="w-[50px] h-[40px] rounded-full border-4"
            style={{
              borderColor: bordercolor,
              // borderColor: comment.user_id?.department[0]?.badge?.color || "",
            }}
          >
            <img
              src={comment?.user_id?.photo_url || profile_placeholder}
              className="rounded-full w-full h-full object-cover"
              alt="user-thumbnail"
            />
          </div>
          <div className="flex flex-col w-full">
            <div className="flex gap-1 justify-start text-sm items-center">
              <h2 className="comment-name">{comment?.user_id?.display_name}</h2>
              <h2>
                <GoDotFill />
              </h2>
              <h4 className="text-[9px]">
                {getTimeAgoString(comment?.createdAt)}
              </h4>
            </div>
            <p className="mt-1 comment">{comment?.content}</p>
            {/* <div className="flex w-full justify-between"> */}

            {/* </div> */}
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 cursor-pointer hover:bg-gray-400 rounded-full"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
          />
        </svg>

        {comment?.replies?.length > 0 && (
          <div className="absolute top-11 left-[2%]">
            <svg
              width="23"
              height="21"
              viewBox="0 0 23 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.28906 0.675354V12.2966C1.28906 16.6919 4.85219 20.255 9.24754 20.255H22.2761"
                stroke="#0E0E0E"
                strokeOpacity="0.6"
                strokeWidth="0.795847"
                strokeDasharray="1.59 1.59"
              />
            </svg>
          </div>
        )}
      </div>
      <div className="self-end">
      <div
      className="post-buttons flex gap-3 justify-end z-50"
    >
      <button
        className="flex gap-1 items-center"
        onClick={onReply}
      >
        <img className="w-[20px]" src={reply} alt="" />
        {comment?.length}
      </button>

      <button
        className="flex gap-1 items-center"
      >
        <img src={fav} alt="" />
        {/* {likes} */}
      </button>
    </div>
        {/* <CommentButtons comment={comment?.replies} onComment={onReply} /> */}
      </div>

      {addReply && (
        <div className="ml-11 mt-0">
          <Comment
            reply={true}
            id={comment?._id}
            onComment={onReply}
            placeholder={"Reply"}
          />
        </div>
      )}
      {comment?.replies?.length > 0 &&
        comment.replies.map((rp, id) => (
          <div key={id} className="ml-11 -mt-4">
            <ReplyComment reply={rp} />
          </div>
        ))}
    </div>
    </div>
  )
}

export default CommentSection