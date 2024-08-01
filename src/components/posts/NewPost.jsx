import React from "react";
import MainComment from "../profile/comments/MainComment";
import EditMyPost from "../main/EditMyPost";
import PostButtons from "../main/PostButtons";
import CustomCarousel from "../main/CustomCarousel";

const NewPost = () => {
  const user = useSelector((state) => state.user.user);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <div className="pt-3 w-full">
        
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
            }}
          />

          {sortedComments.slice(0, visibleComments).map((comment, id) => (
            <MainComment key={id} comment={comment} />
          ))}

          {addComment && (
              <Comment
                id={post_id}
                onComment={onComment}
                placeholder={"Comment"}
              />
            )}

          {sortedComments.length > visibleComments && (
            <button className="text-sm" onClick={loadMoreComments}>
              Load more comments
            </button>
          )}
        </div>
      </div>

      {showEditModal && (
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
      )}

{isModalOpen && (
        <div className="fixed z-40 inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg p-6 max-w-lg w-full">
          <h2 className="text-xl font-semibold mb-4">
            Retweet post by:______ @{username}
          </h2>
          {/* <textarea
       className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
       placeholder="Add a comment"
       value={quote}
       onChange={(e) => setQuote(e.target.value)}
     ></textarea> */}
          <div className="flex justify-end mt-4">
            <button
              onClick={()=>setIsModalOpen(false)}
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
};

export default NewPost;
