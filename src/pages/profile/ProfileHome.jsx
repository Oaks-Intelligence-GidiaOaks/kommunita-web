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
import Diary from "../../components/diary/Diary";
import { Spinner } from "flowbite-react";

const ProfileHome = () => {
  const { data, isLoading } = useGetPostQuery();
  // console.log(data);
  const { data: diaryData, isLoading: diariesLoading } = useGetDiaryQuery();
  const { data: mediaData, isLoading: mediaLoading } = useGetMediaQuery();
  const { data: likedData, isLoading: likesLoading } = useGetLikedPostQuery();

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
 
        setSideDiary(dt);
      }
    });

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
        className={`${activeTab === "profile" ? "" : "hidden"} `}
        id="profile"
        role="tabpanel"
        aria-labelledby="profile-tab"
      >
       { isLoading ? (
          <div className="mt-3 justify-center flex">
              <Spinner />
        </div>
       ) :  post == null ? (
          <div className="mt-3 justify-center flex">
            {/* <ShimmerSocialPost type="both" /> */}
            No Post Available
          </div>
        ) : (
          <div className="grid grid-cols-12 w-full gap-3">
            <div className="w-full col-span-12 md:col-span-8 overflow-y-auto h-[55vh] custom-scrollbar">
          
          {
                
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
            <div className="hidden md:block col-span-4 overflow-y-auto h-[55vh] custom-scrollbar">
              <p className="mb-1 mt-2">Trending Diary Posts</p>

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
     

              <div className="overflow-y-auto  custom-scrollbar">
                <Link
                  className="text-primary-dark-green font-semibold "
                  href="/"
                >
                  {/* See more */}
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
        { diariesLoading ? (<div className="mt-3">
            <div>No diary available yet or resource is loading</div>
           <Spinner />
          </div>) : diary == null ? (
          <div className="mt-3">
            <div>No diary available yet or resource is loading</div>
          </div>
        ) : (
          <div className="grid grid-cols-12 w-full gap-3 ">
            <div className="w-full col-span-12 md:col-span-8 overflow-y-auto h-[55vh] custom-scrollbar">
              {diary?.map((post, index) => {
                let badgeColor = "";
                let dept = "";
                if (post.user_id?.department) {
                  badgeColor = post.user_id?.department[0]?.badge?.color;
                  dept = post.user_id?.department[0]?.badge?.department;
                }

                return (
                  post.user_id && (
                    <Diary key={post?._id} post={post} />
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
                {/* See more */}
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
              { mediaLoading ? (
                <div className="mt-3">
                <div>No media available yet or resource is loading</div>
                  <Spinner />
              </div>
              ) : !medias ? (
                <div className="flex flex-wrap flex-row gap-4">No media available yet</div>
              ) : (
                // <ShimmerSocialPost type="both" />
                <div className=" w-full flex justify-between items-center flex-wrap overflow-y-auto h-[55vh] custom-scrollbar">
                  {medias?.map((dt, id) => (
                    <div
                      key={id}
                      className="cursor-pointer mb-4 overflow-y-auto h-[55vh] custom-scrollbar"
                      // onClick={() => showModal(dt)}
                    >
                      <GaleryBox media={dt} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Likes Section */}
      <div
        className={`${activeTab === "likes" ? "" : "hidden"} `}
        id="likes"
        role="tabpanel"
        aria-labelledby="likes-tab"
      >
        <div>
          <div className="grid grid-cols-12 w-full gap-3">
            <div className="w-full col-span-12 md:col-span-8 overflow-y-auto h-[55vh] custom-scrollbar">
              { likesLoading ? (
                <div className="mt-3">
                <div>You haven't liked any post or diary yet or resource is loading</div>
             <Spinner />
              </div>
              ) : liked == null ? (
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
            <div className="w-full hidden md:block -mt-5 col-span-4 overflow-y-auto h-[55vh] custom-scrollbar">
              <Likes />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfileHome;
