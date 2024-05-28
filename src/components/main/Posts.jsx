import PropTypes from "prop-types";
import { useState } from "react";
// import { useInView } from "react-intersection-observer";
import post_action from "../../assets/images/main/post-action.svg";
import verified from "../../assets/images/main/verified.svg";
import PostButtons from "./PostButtons";
import MainComment from "../profile/comments/MainComment";
import Comment from "./Comment";
import DiaryComment from "./DiaryComment";
import { ShimmerSocialPost } from "react-shimmer-effects";
// import { useEffect } from "react";
import CustomCarousel from "./CustomCarousel";
import DOMPurify from "dompurify";
import left from "../../assets/carousel/left.svg";
import right from "../../assets/carousel/right.svg";
import dotsactive from "../../assets/carousel/dotsactive.svg";
import dotsinactive from "../../assets/carousel/dotsinactive.svg";
import { useSelector } from "react-redux";
import { IoIosCloseCircle } from "react-icons/io";
import { TbHttpDelete } from "react-icons/tb";
import { useDeleteDiaryMutation } from "../../service/diary.service";
import { useDeleteFeedMutation } from "../../service/feeds.service";
import rtkMutation from "../../utils/rtkMutation";

const Diary = ({ content }) => {
  const sanitizedContent = DOMPurify.sanitize(content);
  const maxLength = 177;

  const [isContentExpanded, setIsContentExpanded] = useState(false);

  const toggleContent = () => {
    setIsContentExpanded(!isContentExpanded);
  };

  return (
    <div className="post-content pt-3 pb-2 w-full h-auto overflow-hidden">
      {sanitizedContent && (
        <div
          className="text-justify flex flex-row flex-wrap"
          dangerouslySetInnerHTML={{
            __html: isContentExpanded
              ? sanitizedContent
              : sanitizedContent.length > maxLength
              ? sanitizedContent.slice(0, maxLength) + "..."
              : sanitizedContent,
          }}
        />
      )}
      {sanitizedContent.length > maxLength && (
        <div className="flex justify-end items-center py-3">
          <p
            className="text-sm cursor-pointer hover:text-blue-600 text-gray-400"
            onClick={toggleContent}
          >
            {isContentExpanded ? "see less" : "see more"}
          </p>
        </div>
      )}
    </div>
  );
};

function Post({
  user_id,
  fullname,
  username,
  verifiedUser,
  postTime,
  content,
  media_urls,
  avatar,
  post_id,
  comment,
  repost,
  share,
  reaction,
  badgeColor,
  department,
  type,
}) {
  const [deleteFeeds] = useDeleteFeedMutation();
  const [deleteDiary] = useDeleteDiaryMutation();

  const removeFeed = async (id) => {
    // console.log(id);
    type === "diary" ? await deleteDiary(id) : await deleteFeeds(id);
    setShowPopup(false);
  };

  // const [allComment, setAllComment] = useState([]);
  const [addComment, setAddComment] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handlePostActionClick = () => {
    setShowPopup(true);
  };

  const onComment = () => {
    setAddComment(!addComment);
  };

  const [visibleComments, setVisibleComments] = useState(5);
  const sortedComments = [...comment].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const loadMoreComments = () => {
    const remainingComments = sortedComments.length - visibleComments;
    const nextCommentsToShow = Math.min(5, remainingComments);
    setVisibleComments(
      (prevVisibleComments) => prevVisibleComments + nextCommentsToShow
    );
  };

  const id = useSelector((state) => state.user?.user?._id);

  return (
    <div className="w-full">
      <div className="pt-3 w-full">
        {content ? (
          <div className="post-card p-5 h-auto">
            <div className="flex items-center justify-between">
              <div className="flex gap-3 items-center">
                <div
                  className={`rounded-full border-4 w-[40px] h-[40px]`}
                  style={{ borderColor: badgeColor }}
                >
                  <img
                    src={avatar}
                    className="rounded-full w-full h-full object-cover"
                    alt=""
                  />
                </div>
                <div>
                  <div className="flex gap-2 items-center">
                    <p className="post-name">{fullname}</p>{" "}
                    {verifiedUser && (
                      <span>
                        <img src={verified} alt="" className="pb-1" />
                      </span>
                    )}
                    <span className="post-time ml-2 font-bold">{postTime}</span>
                  </div>
                  <p className="username flex gap-1 items-center">
                    <div className="flex flex-col">
                      @{username} <p>{department || ""}</p>
                    </div>
                  </p>
                </div>
              </div>

              {user_id === id ? (
                <button onClick={handlePostActionClick}>
                  <img src={post_action} alt="" />
                </button>
              ) : null}

              {showPopup && (
                <div className="popup border rounded-md p-2">
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => setShowPopup(false)}
                      className="flex justify-end"
                    >
                      <IoIosCloseCircle />
                    </button>
                    <button
                      onClick={() => removeFeed(post_id)}
                      className="flex justify-start border p-1 rounded-md hover:text-white hover:bg-red-600"
                    >
                      <TbHttpDelete />
                    </button>
                  </div>{" "}
                </div>
              )}
            </div>

            <Diary content={content} />

            <div className="post-media rounded-md w-full py-3">
              <CustomCarousel
                media_urls={media_urls}
                left={left}
                right={right}
                dotsinactive={dotsinactive}
                dotsactive={dotsactive}
              />
            </div>

            <PostButtons
              id={post_id}
              comment={comment?.length}
              repost={repost?.length}
              share={share?.length}
              reaction={reaction || []}
              onComment={onComment}
            />

            {sortedComments.slice(0, visibleComments).map((comment, id) => (
              <MainComment key={id} comment={comment} />
            ))}

            {addComment &&
              (type === "diary" ? (
                <DiaryComment
                  id={post_id}
                  onComment={onComment}
                  placeholder={"Comment"}
                />
              ) : (
                <Comment
                  id={post_id}
                  onComment={onComment}
                  placeholder={"Comment"}
                />
              ))}

            {sortedComments.length > visibleComments && (
              <button className="text-sm" onClick={loadMoreComments}>
                Load more comments
              </button>
            )}
          </div>
        ) : (
          <ShimmerSocialPost type="both" />
        )}
      </div>
    </div>
  );
}

Post.propTypes = {
  user_id: PropTypes.string,
  fullname: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  verifiedUser: PropTypes.bool.isRequired,
  postTime: PropTypes.string.isRequired,
  content: PropTypes.string,
  media_urls: PropTypes.arrayOf(
    PropTypes.shape({
      media_type: PropTypes.string.isRequired,
      media_url: PropTypes.string.isRequired,
    })
  ).isRequired,
  avatar: PropTypes.string,
  badgeColor: PropTypes.string,
  post_id: PropTypes.string.isRequired,
  comment: PropTypes.array.isRequired,
  repost: PropTypes.array.isRequired,
  share: PropTypes.array.isRequired,
  reaction: PropTypes.object.isRequired,
  department: PropTypes.string,
  type: PropTypes.string,
};

Diary.propTypes = {
  content: PropTypes.string,
};

export default Post;
