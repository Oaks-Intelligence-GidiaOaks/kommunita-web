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
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoIosCloseCircle } from "react-icons/io";
import { TbHttpDelete } from "react-icons/tb";
import { CiEdit } from "react-icons/ci";
import {
  useDeleteDiaryMutation,
  useRepostDiaryMutation,
} from "../../service/diary.service";
import { useDeleteFeedMutation } from "../../service/feeds.service";
import Modals from "../modals/Modal";
// import EditPost from "./EditPost";
import EditMyPost from "./EditMyPost";
import EditMyDiary from "./EditMyDiary";
// import RetweetModal from "../tweets/RetweetModal";
import rtkMutation from "../../utils/rtkMutation";
import { useRepostPostMutation } from "../../service/post.service";

const Diary = ({ content }) => {
  const sanitizedContent = DOMPurify.sanitize(content);
  const maxLength = 177;

  const [isContentExpanded, setIsContentExpanded] = useState(false);

  const toggleContent = () => {
    setIsContentExpanded(!isContentExpanded);
  };

  return (
    <div className="pt-3 pb-2 w-full h-auto overflow-hidden">
      {sanitizedContent && (
        <div
          className="post-content text-justify flex flex-row flex-wrap"
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

function Repost({
  fullname,
  username,
  verifiedUser,
  postTime,
  content,
  media_urls,
  avatar,
  post_id,
  comment,
  shared_by,
  repost,
  share,
  reaction,
  badgeColor,
  department,
  type,
  userId,
  refetchFav,
}) {
  const [deleteFeeds] = useDeleteFeedMutation();
  const [deleteDiary] = useDeleteDiaryMutation();
  const [showEditModal, setShowEditModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [repostPost, { error: err, isSuccess: scs }] = useRepostPostMutation();
  const [repostDiary, { error: errDiary, isSuccess: scsDiary }] =
    useRepostDiaryMutation();

  const user = useSelector((state) => state.user.user);
  // console.log("User: ", user);

  const removeFeed = async (id) => {
    // console.log(id);
    type === "diary" ? await deleteDiary(id) : await deleteFeeds(id);
    setShowPopup(false);
  };

  const handleShowEditModal = () => {
    // if (type == "diary") {
    //   setShowPopup(false);
    //   return;
    // }
    setShowEditModal(true);
    setShowPopup(false);
  };

  // const [allComment, setAllComment] = useState([]);
  const [addComment, setAddComment] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handlePostActionClick = () => {
    setShowPopup(!showPopup);
  };

  const onComment = () => {
    setAddComment(!addComment);
  };

  // const [visibleComments, setVisibleComments] = useState(5);
  // const sortedComments = [...comment].sort(
  //   (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  // );

  // const loadMoreComments = () => {
  //   const remainingComments = sortedComments.length - visibleComments;
  //   const nextCommentsToShow = Math.min(5, remainingComments);
  //   setVisibleComments(
  //     (prevVisibleComments) => prevVisibleComments + nextCommentsToShow
  //   );
  // };

  const handleRepost = async () => {
    if (type.includes("pos")) {
      const postData = { post_id: id };
      try {
        await rtkMutation(repostPost, postData);
      } catch (error) {
        console.error("Error reposting post:", error);
        showAlert(
          "Oops",
          "An error occurred while reposting the post",
          "error"
        );
      }
    } else {
      const diaryData = { diary_id: id };
      console.log("Diary repost");
      try {
        await rtkMutation(repostDiary, diaryData);
      } catch (error) {
        console.error("Error reposting diary:", error);
        showAlert(
          "Oops",
          "An error occurred while reposting the diary",
          "error"
        );
      }
    }
  };

  const id = useSelector((state) => state.user?.user?._id);

  return (
    <div className="w-full  rounded-lg">
      <div className="pt-3 w-full">
        {content ? (
          <div className="post-card p-5 h-auto">
            <p className="text-sm font-bold pb-2">
              Reposted by @{shared_by || ""}
            </p>
            <div className="relative flex items-center justify-between">
              <div className="flex gap-3 items-center">
                <Link to={`/profile/${userId || user._id}`}>
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
                </Link>
                <div>
                  <div className="flex gap-2 items-center">
                    <Link to={`/profile/${userId || user._id}`}>
                      <p className="post-name">{fullname}</p>{" "}
                      {verifiedUser && (
                        <span>
                          <img src={verified} alt="" className="pb-1" />
                        </span>
                      )}
                    </Link>
                    <span className="post-time ml-2 font-bold">{postTime}</span>
                  </div>
                  <div className="username flex gap-1 items-center">
                    <p className="flex flex-col">
                      @{username} <p>{department || ""}</p>
                    </p>
                  </div>
                </div>
              </div>

              {userId === id ? (
                <button onClick={handlePostActionClick}>
                  <img src={post_action} alt="" />
                </button>
              ) : null}

              {showPopup && (
                <div className="absolute -right-4 top-[30px] z-50 popup rounded-md bg-[#ffffff] p-2">
                  <div className="  w-[110px] h-[69px] bg-[#ffffff] rounded-[10px] p-2 flex items-center justify-center flex-col gap-2">
                    {/* EDIT POST */}

                    <button
                      onClick={() => handleShowEditModal(true)}
                      className={`${
                        type == "diary" ? "disabled" : ""
                      }flex w-[89px] h-[26px] px-[19px] py-[6px] bg-[#EFF4FF] text-[10px] text-[#838383] justify-center items-center border rounded-md hover:text-black`}
                    >
                      {type == "diary" ? "Edit diary" : "Edit post"}
                    </button>

                    <button
                      onClick={() => removeFeed(post_id)}
                      className="flex w-[89px] h-[26px] px-[15px] py-[6px] bg-[#EFF4FF] text-[10px] text-[#E71D36] justify-center items-center border rounded-md hover:text-white hover:bg-red-600"
                    >
                      {/* <TbHttpDelete /> */}
                      {type == "diary" ? "Delete diary" : "Delete post"}
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
              refetchFav={refetchFav}
              type={type}
              handleRespost={() => {
                setIsModalOpen(!isModalOpen);
                // console.log('Clicked')
              }}
            />

            {/* {sortedComments.slice(0, visibleComments).map((comment, id) => (
              <MainComment key={id} comment={comment} />
            ))} */}

            {/* {addComment &&
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
            )} */}
          </div>
        ) : (
          <ShimmerSocialPost type="both" />
        )}
      </div>
      {/* {showEditModal && type == "post" ? (
        <Modals
          title={"Edit post"}
          openModal={showEditModal}
          modalSize="2xl"
          onClose={() => setShowEditModal(false)}
        >
          <div className="pt-4 post-wrapper max-h-[550px] w-full max-w-[491px] mx-auto">
            <div className="post-media rounded-md w-full py-3">
              <EditMyPost
                content={content}
                medias={media_urls}
                avatar={avatar}
                userId={userId}
                badgeColor={badgeColor}
                onClose={() => setShowEditModal(false)}
                postId={post_id}
              />
            </div>
          </div>
        </Modals>
      ) : (
        <Modals
          title={"Edit Diary"}
          openModal={showEditModal}
          modalSize="2xl"
          onClose={() => setShowEditModal(false)}
        >
          <div className="pt-4 post-wrapper max-h-[550px] w-full max-w-[491px] mx-auto">
            <div className="post-media rounded-md w-full py-3">
              <EditMyDiary
                content={content}
                medias={media_urls}
                avatar={avatar}
                userId={userId}
                badgeColor={badgeColor}
                onClose={() => setShowEditModal(false)}
                postId={post_id}
              />
            </div>
          </div>
        </Modals>
      )} */}
      {isModalOpen && (
        <div className="fixed z-40 inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h2 className="text-xl font-semibold mb-4">
              Retweet post by:______ @{postBy}
            </h2>
            {/* <textarea
         className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
         placeholder="Add a comment"
         value={quote}
         onChange={(e) => setQuote(e.target.value)}
       ></textarea> */}
            <div className="flex justify-end mt-4">
              <button
                onClick={onClose}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
              >
                Discard
              </button>
              <button
                onClick={handleRepost}
                className="bg-[#3D7100] text-white px-4 py-2 rounded-lg"
              >
                Retweet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

Repost.propTypes = {
  userId: PropTypes.string,
  fullname: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  verifiedUser: PropTypes.bool.isRequired,
  postTime: PropTypes.string.isRequired,
  content: PropTypes.string,
  refetchFav: PropTypes.func,
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

export default Repost;
