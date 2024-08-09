import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import avatar1 from "../../assets/images/sidebar/avatar1.svg";
import Posts from "../../components/main/Posts";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
// import { usegetOtherUserPostMutation } from "../../service/feeds.service";
import getTimeAgoString from "./../../utils/getTimeAgoString";
import { ShimmerSocialPost } from "react-shimmer-effects";
import {
  useGetOtherUserPostMutation,
  useGetPostQuery,
} from "../../service/post.service";
import { showAlert } from "../../static/alert";
import TrendingPost from "../../components/main/TrendingPosts";
import {
  useGetMediaQuery,
  useGetOtherMediaMutation,
} from "../../service/media.service";
import MediaModal from "../../components/main/MediaModal";
import GaleryBox from "../../components/profile/GaleryBox";
import {
  useGetLikedPostQuery,
  useGetOtherUserLikedPostMutation,
} from "../../service/likedPost.service";
import Likes from "../../components/sidebar/Likes";
import {
  useGetDiaryQuery,
  useGetOtherUserDiariesMutation,
} from "../../service/diary.service";
import Modals from "../../components/modals/Modal";
import NewPost2 from "../../components/posts/NewPost2";
import Repost2 from "../../components/posts/Repost2";
import NewPollssss from "../../components/newPolls/NewPollssss";

const ProfileHome = () => {
  const { data } = useGetPostQuery();
  // console.log(data);
  const { data: diaryData } = useGetDiaryQuery();
  const { data: mediaData } = useGetMediaQuery();
  const { data: likedData } = useGetLikedPostQuery();

  const [getOtherUserPost, { isSuccess: feedSuccess, isError: feedsError }] =
    useGetOtherUserPostMutation();

  const [getOtherUserDiaries] = useGetOtherUserDiariesMutation();

  const [
    getOtherUserLikedPost,
    { isSuccess: likedSuccess, isError: likedError },
  ] = useGetOtherUserLikedPostMutation();

  const [getOtherMedia, { isSuccess, isError }] = useGetOtherMediaMutation();

  const [post, setPost] = useState(null);
  const [liked, setLiked] = useState(null);
  const [diary, setDiary] = useState(null);

  const [sidePost, setSidePost] = useState(null);
  const [sideDiary, setSideDiary] = useState(null);

  const [medias, setMedias] = useState(null);
  const [media, setMedia] = useState(null);
  const [showMediaModal, setShowMediaModal] = useState(false);

  const { user_id: id } = useParams();

  const [activeTab, setActiveTab] = useState("profile");

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const time = new Date();
  time.setSeconds(time.getSeconds() + 60);

  const activeLink =
    "border-b-[5px] border-primary-dark-green text-primary-dark-green pb-0";

  useEffect(() => {
    if (id) {
      console.log(id, "me");
      GetOtherUser();
    } else {
      // console.log(diaryData);
      setPost(data?.data);
      setDiary(diaryData?.data);
      setMedias(mediaData?.data);
      setLiked(likedData?.data);
      // setProfile(data);
    }
    data?.data?.map((dt) => {
      // console.log("data: ", dt);
      if (dt.shared_by) {
        if (dt?.post_id?.comment.length == 0) {
          setSidePost(dt.post_id);
          // setSideDiary(dt.post_id);
        }
      } else {
        setSidePost(dt);
        // setSideDiary(dt);
      }
    });
    diaryData?.data?.map((dt) => {
      // console.log("data: ", dt);
      if (dt.shared_by) {
        if (dt.diary_id.comment.length == 0) {
          // setSidePost(dt.diary_id);
          setSideDiary(dt.diary_id);
        }
      } else {
        // setSidePost(dt);
        setSideDiary(dt);
      }
    });
    // setSidePost(data?.data?.filter((fd) => fd.comment.length == 0));
    // setSideDiary(diaryData?.data?.filter((fd) => fd.comment.length == 0));
  }, [id, data, diaryData]);

  // const posts =  || [];

  const GetOtherUser = async () => {
    try {
      const res = await getOtherUserPost(id);
      setPost(res?.data?.data);

      const diariesResult = await getOtherUserDiaries(id);
      if (diariesResult != undefined) {
        setDiary(diariesResult?.data?.data);
      }

      const mediaResult = await getOtherMedia(id);
      setMedias(mediaResult?.data?.data);

      const likedResult = await getOtherUserLikedPost(id);
      setLiked(likedResult?.data?.data);

      // console.log(res.data.data);
    } catch (error) {
      console.error("Error making search: ", error);
      // showAlert("Oops", "An error occurred while searching content", "error");
    }
  };

  // function showModal(src) {
  //   console.log("Media: ", src);
  //   setMedia(src);
  //   setShowMediaModal(true);
  // }

  // console.log("profile: ", post);
  // console.log("logs:", diaryData?.data);

  const handleChatUser = (user) => {
    // setSelectedUser(user);
    // setOpenModal(true);
    // setSearchTerm("");
    // console.log("Selected User ID:", user._id);
  };

  return (
    <Layout>
      {/* Navigation Tab Menu */}
      <div>
        <div className="border-b-[3px] border-gray-200 dark:border-gray-700">
          <ul
            className="flex flex-wrap -mb-px sm:text-xl sm:font-semibold text-gray-400 text-center justify-center gap-2 md:gap-5 lg:gap-10"
            role="tablist"
          >
            <li className="me-2" role="presentation">
              <button
                className={`inline-block p-4 rounded-t-lg  ${
                  activeTab === "profile"
                    ? "border-[#4C9C25] text-[#4C9C25] border-b-4"
                    : "text-[#8D92AC]"
                }`}
                onClick={() => handleTabClick("profile")}
                role="tab"
                aria-controls="profile"
                aria-selected={activeTab === "profile"}
              >
                Posts ({post?.length})
              </button>
            </li>
            <li className="me-2" role="presentation">
              <button
                className={`inline-block p-4 rounded-t-lg  ${
                  activeTab === "diaries"
                    ? "border-[#4C9C25] text-[#4C9C25] border-b-4"
                    : "text-[#8D92AC]"
                }`}
                onClick={() => handleTabClick("diaries")}
                role="tab"
                aria-controls="diaries"
                aria-selected={activeTab === "diaries"}
              >
                Diaries
              </button>
            </li>
            <li className="me-2" role="presentation">
              <button
                className={`inline-block p-4 rounded-t-lg ${
                  activeTab === "media"
                    ? "border-[#4C9C25] text-[#4C9C25] border-b-4"
                    : "text-[#8D92AC]"
                }`}
                onClick={() => handleTabClick("media")}
                role="tab"
                aria-controls="media"
                aria-selected={activeTab === "media"}
              >
                Photos & Videos
              </button>
            </li>
            <li className="me-2" role="presentation">
              <button
                className={`inline-block p-4 rounded-t-lg  ${
                  activeTab === "likes"
                    ? "border-[#4C9C25] text-[#4C9C25] border-b-4"
                    : "text-[#8D92AC]"
                }`}
                onClick={() => handleTabClick("likes")}
                role="tab"
                aria-controls="likes"
                aria-selected={activeTab === "likes"}
              >
                Likes
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Post Section */}
      <div
        className={`${activeTab === "profile" ? "" : "hidden"}`}
        id="profile"
        role="tabpanel"
        aria-labelledby="profile-tab"
      >
        {post == null ? (
          <div className="mt-3 justify-center flex">
            {/* <ShimmerSocialPost type="both" /> */}
            No Post Available
          </div>
        ) : (
          <div className="grid grid-cols-12 w-full gap-3">
            <div className="w-full col-span-12 md:col-span-8">
              {/* {[...post]
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort posts by latest first
                .map((post, index) => {
                  let badgeColor = "";
                  let dept = "";
                  if (post.user_id?.department) {
                    badgeColor = post.user_id?.department[0]?.badge?.color;
                    dept = post.user_id?.department[0]?.badge?.department;
                  }

                  return post.shared_by ? (
                    <Posts
                      key={index}
                      fullname={post?.post_id?.user_id.display_name}
                      username={post?.post_id?.user_id.username}
                      verifiedUser={false} // Adjust based on your data
                      postTime={getTimeAgoString(post?.post_id?.createdAt)}
                      content={post?.post_id?.content}
                      media_urls={post?.post_id?.media_urls}
                      post_id={post?.post_id?._id}
                      comment={post?.post_id?.comment}
                      repost={post?.post_id?.repost}
                      share={post?.post_id?.share}
                      reaction={post?.post_id?.reaction}
                      avatar={post?.post_id?.user_id.photo_url || avatar1}
                      badgeColor={
                        post?.post_id?.user_id?.department[0]?.badge?.color
                      }
                      department={
                        post?.post_id?.user_id?.department[0]?.badge?.department
                      }
                      userId={post?.post_id?.user_id?._id}
                      type={post?.post_id?.type}
                      // user_id={post?.post_id?.user_id?._id}
                    />
                  ) : (
                    post.user_id && (
                      <Posts
                        key={index}
                        fullname={post.user_id.display_name}
                        username={post.user_id.username}
                        verifiedUser={false} // Adjust based on your data
                        postTime={getTimeAgoString(post.createdAt)}
                        content={post.content}
                        media_urls={post.media_urls}
                        post_id={post._id}
                        comment={post.comment}
                        repost={post.repost}
                        share={post.share}
                        reaction={post.reaction}
                        avatar={post.user_id.photo_url || avatar1}
                        badgeColor={badgeColor}
                        department={dept}
                        userId={post.user_id?._id}
                        type={post?.type}
                        // user_id={post.user_id?._id}
                      />
                    )
                  );
                })} */
                
                  data?.data.map((post) => {
                    if (post.type === "post") {
                      return <NewPost2 key={post?._id} post={post} />;
                    } else if (post.action_type === "Repost") {
                      return <Repost2 key={post?._id} post={post} />
                    } else if(post.type === 'poll') {
                      return <NewPollssss key={post?._id} poll={post} onRefresh={refetch} />;
                    } else{
                      return null;
                    }
                  })
                
                
                }

                

              {/* <MediaContainer /> */}
            </div>
            <div className="hidden md:block col-span-4">
              <p className="mb-1 mt-2">Trending Diary Posts</p>

              {/* {sidePost && (
                <TrendingPost
                  fullname={sidePost[0]?.user_id.display_name}
                  username={sidePost[0]?.user_id.username}
                  verifiedUser={false} // You need to adjust this based on your data
                  postTime={getTimeAgoString(sidePost[0]?.createdAt)} // Assuming createdAt is the post time
                  // postTime={moment(sidePost[0]?.createdAt).fromNow()} // Assuming createdAt is the post time
                  content={sidePost[0]?.content}
                  media_urls={sidePost[0]?.media_urls}
                  post_id={sidePost[0]?._id}
                  comment={sidePost[0]?.comment}
                  repost={sidePost[0]?.repost}
                  share={sidePost[0]?.share}
                  reaction={sidePost[0]?.reaction}
                  avatar={sidePost[0]?.user_id.photo_url || avatar1} // You need to provide the avatar source
                />
              )} */}

              {sideDiary && (
                <Posts
                  fullname={sideDiary.user_id.display_name}
                  username={sideDiary.user_id.username}
                  verifiedUser={false} // You need to adjust this based on your data
                  postTime={getTimeAgoString(sideDiary.createdAt)} // Assuming createdAt is the post time
                  // postTime={moment(sideDiary.createdAt).fromNow()} // Assuming createdAt is the post time
                  content={sideDiary.content}
                  media_urls={sideDiary.media_urls}
                  post_id={sideDiary._id}
                  comment={sideDiary.comment}
                  repost={sideDiary.repost}
                  share={sideDiary.share}
                  reaction={sideDiary.reaction}
                  avatar={avatar1} // You need to provide the avatar source
                />
              )}
              {/* {sideDiary && (
                <Posts
                  fullname={sideDiary[0].user_id.display_name}
                  username={sideDiary[0].user_id.username}
                  verifiedUser={false} // You need to adjust this based on your data
                  postTime={getTimeAgoString(sideDiary[0].createdAt)} // Assuming createdAt is the post time
                  // postTime={moment(sideDiary[0].createdAt).fromNow()} // Assuming createdAt is the post time
                  content={sideDiary[0].content}
                  media_urls={sideDiary[0].media_urls}
                  post_id={sideDiary[0]._id}
                  comment={sideDiary[0].comment}
                  repost={sideDiary[0].repost}
                  share={sideDiary[0].share}
                  reaction={sideDiary[0].reaction}
                  avatar={avatar1} // You need to provide the avatar source
                />
              )} */}

              <div className="">
                <Link
                  className="text-primary-dark-green font-semibold "
                  href="/"
                >
                  See more
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Diaries Section */}
      <div
        className={`${activeTab === "diaries" ? "" : "hidden"}`}
        id="diaries"
        role="tabpanel"
        aria-labelledby="diaries-tab"
      >
        {diary == null ? (
          <div className="mt-3">
            <div>No diary available yet or resource is loading</div>
            {/* <ShimmerSocialPost type="both" /> */}
          </div>
        ) : (
          <div className="grid grid-cols-12 w-full gap-3">
            <div className="w-full col-span-12 md:col-span-8">
              {diary?.map((post, index) => {
                let badgeColor = "";
                let dept = "";
                if (post.user_id?.department) {
                  badgeColor = post.user_id?.department[0]?.badge?.color;
                  dept = post.user_id?.department[0]?.badge?.department;
                }

                return (
                  post.user_id && (
                    <Posts
                      key={index}
                      fullname={post.user_id.display_name}
                      username={post.user_id.username}
                      verifiedUser={false} // Adjust based on your data
                      postTime={getTimeAgoString(post.createdAt)}
                      content={post.content}
                      media_urls={post.media_urls}
                      post_id={post._id}
                      comment={post.comment}
                      repost={post.repost}
                      share={post.share}
                      reaction={post.reaction}
                      avatar={post.user_id.photo_url || avatar1}
                      badgeColor={badgeColor}
                      department={dept}
                      userId={post.user_id?._id}
                      type={post?.type}
                      // user_id={post.user_id?._id}
                    />
                  )
                );
              })}
            </div>
            <div className="hidden md:block w-full col-span-4">
              <p className="mb-1 mt-2">Trending Diary Posts</p>
              {sideDiary && (
                <Posts
                  fullname={sideDiary?.user_id.display_name}
                  username={sideDiary?.user_id.username}
                  verifiedUser={false} // You need to adjust this based on your data
                  postTime={getTimeAgoString(sideDiary?.createdAt)} // Assuming createdAt is the post time
                  // postTime={moment(sideDiary?.createdAt).fromNow()} // Assuming createdAt is the post time
                  content={sideDiary?.content}
                  media_urls={sideDiary?.media_urls}
                  post_id={sideDiary?._id}
                  comment={sideDiary?.comment}
                  repost={sideDiary?.repost}
                  share={sideDiary?.share}
                  reaction={sideDiary?.reaction}
                  avatar={avatar1} // You need to provide the avatar source
                />
              )}

              <Link className="text-primary-dark-green font-semibold" href="#">
                See more
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Media Section */}
      <div className="mt-5">
        <div
          className={`${activeTab === "media" ? "" : "hidden"}`}
          id="media"
          role="tabpanel"
          aria-labelledby="media-tab"
        >
          <div>
            <div className="flex flex-wrap flex-row gap-4">
              {!medias ? (
                <div>No media available yet or resource is loading</div>
              ) : (
                // <ShimmerSocialPost type="both" />
                <>
                  {medias?.map((dt, id) => (
                    <div
                      key={id}
                      className="cursor-pointer mb-4"
                      // onClick={() => showModal(dt)}
                    >
                      <GaleryBox media={dt} />
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Likes Section */}
      <div
        className={`${activeTab === "likes" ? "" : "hidden"}`}
        id="likes"
        role="tabpanel"
        aria-labelledby="likes-tab"
      >
        <div>
          <div className="grid grid-cols-12 w-full gap-3">
            <div className="w-full col-span-12 md:col-span-8">
              {liked == null ? (
                <div>You haven't liked any post or diary yet</div>
              ) : (
                liked?.map((post, index) => {
                  let badgeColor = "";
                  let dept = "";
                  if (post.user_id?.department) {
                    badgeColor = post.user_id?.department[0]?.badge?.color;
                    dept = post.user_id?.department[0]?.badge?.department;
                  }

                  return (
                    post?.user_id && (
                      <NewPost2 key={post?._id} post={post}
                      />
                    )
                  );
                })
              )}
            </div>
            <div className="w-full hidden md:block -mt-5 col-span-4">
              <Likes />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfileHome;
