import React, { useState } from "react";
// import RetweetModal from './RetweetModal';
// import CommentSection from './CommentSection';
// import Retweet from './Retweet';
import post_action from "../../assets/images/main/post-action.svg";
import verified from "../../assets/images/main/verified.svg";
import PostButtons from "./PostButtons";
import MainComment from "../profile/comments/MainComment";
import Comment from "./Comment";
import DiaryComment from "./DiaryComment";
import { ShimmerSocialPost } from "react-shimmer-effects";
import CustomCarousel from "./CustomCarousel";
import DOMPurify from "dompurify";
import left from "../../assets/carousel/left.svg";
import right from "../../assets/carousel/right.svg";
import dotsactive from "../../assets/carousel/dotsactive.svg";
import dotsinactive from "../../assets/carousel/dotsinactive.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDeleteDiaryMutation } from "../../service/diary.service";
import { useDeleteFeedMutation } from "../../service/feeds.service";
import Modals from "../modals/Modal";
import EditMyPost from "./EditMyPost";
import EditMyDiary from "./EditMyDiary";
import Retweet from "../tweets/Retweet";
import RetweetModal from "../tweets/RetweetModal";
import CommentSection from "../tweets/CommentSection";
import Tweet2 from "../tweets/Tweet2";

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

const Tweet = ({
  content1,
  initialRetweetCount,
  initialLikeCount,
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
  userId,
  refetchFav,
}) => {
  const [retweetCount, setRetweetCount] = useState(initialRetweetCount);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [isRetweeted, setIsRetweeted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [retweets, setRetweets] = useState([]);

  const handleRetweetClick = () => {
    setIsModalOpen(true);
  };

  const handleRetweet = (quote) => {
    setRetweetCount(retweetCount + 1);
    setIsRetweeted(true);
    setIsModalOpen(false);
    setRetweets([...retweets, { content, quote }]);
  };

  const handleLikeClick = () => {
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    setIsLiked(!isLiked);
  };

  const [deleteFeeds] = useDeleteFeedMutation();
  const [deleteDiary] = useDeleteDiaryMutation();
  const [showEditModal, setShowEditModal] = useState(false);

  const user = useSelector((state) => state.user.user);

  const removeFeed = async (id) => {
    type === "diary" ? await deleteDiary(id) : await deleteFeeds(id);
    setShowPopup(false);
  };

  const handleShowEditModal = () => {
    setShowEditModal(true);
    setShowPopup(false);
  };

  const [addComment, setAddComment] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handlePostActionClick = () => {
    setShowPopup(!showPopup);
  };

  const onComment = () => {
    setAddComment(!addComment);
  };

  const [visibleComments, setVisibleComments] = useState(5);
  const sortedComments = [comment].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const loadMoreComments = () => {
    const remainingComments = sortedComments?.length - visibleComments;
    const nextCommentsToShow = Math.min(5, remainingComments);
    setVisibleComments(
      (prevVisibleComments) => prevVisibleComments + nextCommentsToShow
    );
  };

  const id = useSelector((state) => state.user?.user?._id);

  return (
    <>
          <Tweet2 content="In this age of Aquarius, no one will be about to say they did not know. Ignorance will never be an excuse. Knowledge of hidden things will be poured out freely and lavishly. Challenge yourselves to transform these knowledge you get into power. C’est fini." initialRetweetCount={7} initialLikeCount={48} />
      <div className="w-full">
        <div className="pt-3 w-full">
          {content ? (
            <div className="post-card p-5 h-auto">
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
                      <span className="post-time ml-2 font-bold">
                        {postTime}
                      </span>
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
              {/* 
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
        {showEditModal && type == "post" ? (
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
        )}
      </div>
      <div className="post-card p-5 h-auto">
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
        />
        {isModalOpen && (
          <RetweetModal
            onClose={() => setIsModalOpen(false)}
            onRetweet={handleRetweet}
          />
        )}
        {retweets.map((retweet, index) => (
          <Retweet
            key={index}
            originalContent={retweet.content1}
            quote={retweet.quote}
          />
        ))}
      </div>
    </>
  );
};

export default Tweet;
