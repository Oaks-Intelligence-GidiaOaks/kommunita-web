// import React, { useEffect, useState } from "react";
// import { FaHeart, FaCommentAlt, FaShare, FaRetweet } from "react-icons/fa";
// import { CiBookmark } from "react-icons/ci";
// import Comment from "../main/Comment";
// import {
//   dotsactive,
//   dotsinactive,
//   left,
//   profile_placeholder,
//   right,
//   verified,
// } from "../../assets/images";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import getTimeAgoString from "../../utils/getTimeAgoString";
// import CustomCarousel from "../main/CustomCarousel";
// import {
//   useFavoritePostsMutation,
//   useLovePostMutation,
//   usePostCommentMutation,
// } from "../../service/post.service";
// import { useGetUserProfiileQuery } from "../../service/user.service";
// import { showAlert } from "../../static/alert";
// import rtkMutation from "../../utils/rtkMutation";
// import MainComment from "../profile/comments/MainComment";

// const NewPost2 = ({ post, comment }) => {
//   const [showComments, setShowComments] = useState(false);
//   const [lovePost, { error, isSuccess }] = useLovePostMutation();
//   const user = useSelector((state) => state.user.user);
//   const login_user_id = useSelector((state) => state.user?.user?._id);
//   const verifiedUser = false;
//   const [liked, setLiked] = useState(post?.reaction?.like?.includes(user?._id));
//   const [likeCount, setLikeCount] = useState(post?.reaction?.like?.length || 0);
//   const likeUserIds = post?.reaction?.like?.map((user) => user._id);
//   const isLikedByCurrentUser = likeUserIds?.includes(login_user_id);
//   const { data: userData, refetch: refetchUser } = useGetUserProfiileQuery();
//   const [favoritePost, { error: bookmarkError, isSuccess: bookMarkSuccess }] =
//     useFavoritePostsMutation();
//   const [isBookmarked, setIsBookmarked] = useState(false);

//   const toggleComments = () => {
//     setShowComments(!showComments);
//     onComment()
//   };

//   //   LIKE AND UNLIKE FUNTUIONALITY

//   const handleLike = async () => {
//     const previousState = liked;
//     setLiked(!liked);
//     setLikeCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));

//     try {
//       await lovePost({ post_id: post._id, reaction_type: "like" }).unwrap();
//     } catch (error) {
//       setLiked(previousState);
//       setLikeCount((prevCount) =>
//         previousState ? prevCount + 1 : prevCount - 1
//       );
//     }
//   };

//   const { data: profile } = useGetUserProfiileQuery();
//   // console.log(profile, "profile");

//   const [content, setContent] = useState("");

//   const [postComment, { isSuccess: postSucces, error: postError }] =
//     usePostCommentMutation();

//   const handleComment = async () => {
//     onComment();

//     if (content) {
//       try {
//         const commentData = { content, id, reply };

//         await rtkMutation(postComment, commentData);

//         setContent("");
//       } catch (error) {
//         console.error("Error submitting comment:", error);
//         showAlert("Error", error.message, "error");
//       }
//     }
//   };

//   useEffect(() => {
//     if (postSucces) {
//       console.log("success");
//       showAlert("Great!", "Comment added successfully", "success");
//     } else if (error) {
//       showAlert("Oops", "An error occurred", "error");
//     }
//   }, [postSucces, postError]);

//   const name = useSelector((state) => state.user?.user?.display_name);

//   // HANDLE BOOKMARK FUNTIONALITY
//   useEffect(() => {
//     const postBookmarked = userData?.data?.favourites?.filter(
//       (fid) => fid === post._id
//     );
//     setIsBookmarked(postBookmarked?.length > 0);
//   }, [userData, post._id, refetchUser]);

//   const handleBookmark = async () => {
//     const previousState = isBookmarked;
//     setIsBookmarked(!isBookmarked);
//     console.log(post._id);

//     try {
//       await favoritePost({ post_id: post?._id, }).unwrap();
//     } catch (error) {
//       setIsBookmarked(previousState);
//     }
//   };

//   useEffect(() => {
//     if (isSuccess || bookMarkSuccess) {
//       console.log("Success");
//     } else if (error || bookmarkError) {
//       showAlert("Oops", "An error occurred", "error");
//     }
//   }, [isSuccess, error, bookMarkSuccess, bookmarkError]);

//   const [addComment, setAddComment] = useState(false);
//   const onComment = () => {
//     setAddComment(!addComment);
//   };

//   return (
//     <div className="mx-auto bg-white border rounded-lg shadow-md p-4 my-4">
//       <div className="flex items-center mb-4">
//         <Link to={`/profile/${user?._id}`}>
//           <div
//             className={`rounded-full border-4 w-[3rem] h-[3rem]`}
//             style={{ borderColor: "" }}
//           >
//             <img
//               src={post?.user_id?.photo_url || profile_placeholder}
//               alt="profile"
//               className="w-full rounded-full object-cover "
//             />
//           </div>
//         </Link>

//         <div className="ml-4">
//           <div className="flex gap-2 items-center">
//             <Link to={`/profile/${user?._id}`}>
//               <h4 className="font-semibold post-name">
//                 {post?.user_id?.display_name}
//               </h4>
//               {verifiedUser && (
//                 <span>
//                   <img src={verified} alt="" className="pb-1" />
//                 </span>
//               )}
//             </Link>
//           </div>

//           <p className="text-gray-500">
//             @{post?.user_id?.username} ·{" "}
//             <span className="post-time ml-2 font-bold">
//               {getTimeAgoString(post?.createdAt)}
//             </span>
//           </p>
//         </div>
//       </div>
//       <p className="mb-4">{post?.content}</p>
//       <div className="post-media rounded-md w-full py-3">
//         <CustomCarousel
//           media_urls={post?.media_urls}
//           left={left}
//           right={right}
//           dotsinactive={dotsinactive}
//           dotsactive={dotsactive}
//         />
//       </div>
//       <div className="flex justify-between items-center text-gray-500 mb-2">
//         <div className="flex items-center space-x-2" onClick={handleLike}>
//           <FaHeart
//             className={liked || isLikedByCurrentUser ? "text-red-500" : ""}
//           />
//           <span>{post?.reaction?.like?.length}</span>
//         </div>
//         <div
//           className="flex items-center space-x-2 cursor-pointer"
//           onClick={toggleComments}
//         >
//           <FaCommentAlt />
//           <span>{post?.comment?.length}</span>
//         </div>
//         <div className="flex items-center space-x-2">
//           <FaRetweet />
//           <span>{post?.repost?.length}</span>
//         </div>
//         <div className="flex items-center space-x-2">
//           <FaShare />
//           <span>{post?.share?.length}</span>
//         </div>
//         <div
//           className="flex items-center space-x-2 cursor-pointer"
//           onClick={handleBookmark}
//         >
//           <CiBookmark className={isBookmarked ? "text-red-500" : ""} />
//           <span>{post?.favourites?.length}</span>
//         </div>
//       </div>

//       {post?.comment?.map((comment, index) => (
//         <MainComment key={index} comment={comment} />
//       ))}

//      {addComment && <Comment id={post?._id} onComment={onComment} placeholder={"Comment"} />}
//     </div>
//   );
// };

// export default NewPost2;


import React, { useEffect, useState } from "react";
import { FaHeart, FaCommentAlt, FaShare, FaRetweet } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import Comment from "../main/Comment";
import {
  dotsactive,
  dotsinactive,
  left,
  profile_placeholder,
  right,
  verified,
} from "../../assets/images";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import getTimeAgoString from "../../utils/getTimeAgoString";
import CustomCarousel from "../main/CustomCarousel";
import {
  useFavoritePostsMutation,
  useLovePostMutation,
  usePostCommentMutation,
  useRepostPostMutation,
} from "../../service/post.service";
import { useGetUserProfiileQuery } from "../../service/user.service";
import { showAlert } from "../../static/alert";
import rtkMutation from "../../utils/rtkMutation";
import MainComment from "../profile/comments/MainComment";
import { useGetFeedsQuery } from "../../service/feeds.service";
import { RxDotsHorizontal } from "react-icons/rx";

const NewPost2 = ({ post }) => {
  const [showComments, setShowComments] = useState(false);
  const [lovePost] = useLovePostMutation();
  const [repostPost] = useRepostPostMutation();
  const { isSuccess:feedsSuccess, refetch:refetchFeeds } = useGetFeedsQuery();
  const user = useSelector((state) => state.user.user);
  const login_user_id = useSelector((state) => state.user?.user?._id);
  const verifiedUser = false;
  const [liked, setLiked] = useState(post?.reaction?.like?.includes(user?._id));
  const [likeCount, setLikeCount] = useState(post?.reaction?.like?.length || 0);
  const likeUserIds = post?.reaction?.like?.map((user) => user._id);
  const isLikedByCurrentUser = likeUserIds?.includes(login_user_id);
  const { data: userData, refetch: refetchUser } = useGetUserProfiileQuery();
  const [favoritePost] = useFavoritePostsMutation();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(post?.favourites?.length || 0);

  const toggleComments = () => {
    setShowComments(!showComments);
    onComment();
  };

  // LIKE AND UNLIKE FUNCTIONALITY
  const handleLike = async () => {
    const previousState = liked || isLikedByCurrentUser;
    const previousCount = likeCount;

    // Optimistically update the UI
    setLiked(!liked);
    setLikeCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));

    try {
      await lovePost({ post_id: post._id, reaction_type: "like" }).unwrap();
    } catch (error) {
      // Revert the state if the request fails
      setLiked(previousState);
      setLikeCount(previousCount);
      showAlert("Error", error.message, "error");
    }
  };

  const { data: profile } = useGetUserProfiileQuery();

  const [content, setContent] = useState("");

  const [postComment] = usePostCommentMutation();

console.log(userData)

  useEffect(() => {
    if (userData?.data?.favourites) {
      const postBookmarked = userData.data.favourites.some(
        (fid) => fid === post._id
      );
      setIsBookmarked(postBookmarked);
    }
  }, [userData, post._id]);

  const handleBookmark = async () => {
    const previousState = isBookmarked || isLikedByCurrentUser;
    const previousCount = bookmarkCount;

    // Optimistically update the UI
    setIsBookmarked(!isBookmarked);
    setBookmarkCount((prevCount) => (isBookmarked ? prevCount - 1 : prevCount + 1));

    try {
      await favoritePost({ post_id: post._id }).unwrap();
    } catch (error) {
      // Revert the state if the request fails
      setIsBookmarked(previousState);
      setBookmarkCount(previousCount);
      showAlert("Error", error.message, "error");
    }
  };

  const [addComment, setAddComment] = useState(false);
  const onComment = () => {
    setAddComment(!addComment);
  };

   const handleRespost = async () => {
   
      const postData = { post_id:  post._id };
      console.log(postData);
      try {
        await rtkMutation(repostPost, postData);
        showAlert(
          "Great",
          "You reposted this post",
        );
      } catch (error) {
        console.error("Error reposting post:", error);
        showAlert(
          "Oops",
          "An error occurred while reposting the post",
          "error"
        );
      }
  };

  useEffect(()=>{
    if(feedsSuccess){
      refetchFeeds();
    }
  }, [feedsSuccess])

  return (
    <div className="mx-auto bg-white border rounded-lg shadow-md p-4 my-4">
      <div className="flex items-center mb-4">
        <Link to={`/profile/${user?._id}`}>
          <div className={`rounded-full border-4 w-[3rem] h-[3rem]`}>
            <img
              src={post?.user_id?.photo_url || profile_placeholder}
              alt="profile"
              className="w-[3rem] h-[3rem] rounded-full object-cover"
            />
          </div>
        </Link>
        <div className=" flex justify-between items-center">
          <div>
          <div className="flex gap-2 items-center">
            <Link to={`/profile/${user?._id}`}>
              <h4 className="font-semibold post-name">
                {post?.user_id?.display_name}
              </h4>
              {verifiedUser && (
                <span>
                  <img src={verified} alt="" className="pb-1" />
                </span>
              )}
            </Link>
          </div>
          <p className="text-gray-500">
            @{post?.user_id?.username} ·{" "}
     
            <span className="post-time ml-2 font-bold">
              {getTimeAgoString(post?.createdAt)}
            </span>
          </p>
          </div>
          <RxDotsHorizontal className="flex-end"/>
        </div>
      </div>
      <p className="mb-4">{post?.content}</p>
      <div className="post-media rounded-md w-full py-3">
        <CustomCarousel
          media_urls={post?.media_urls}
          left={left}
          right={right}
          dotsinactive={dotsinactive}
          dotsactive={dotsactive}
        />
      </div>
      <div className="flex justify-between items-center text-gray-500 mb-2">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={handleLike}>
          <FaHeart className={liked || isLikedByCurrentUser ? "text-red-500" : ""} />
          <span>{likeCount}</span>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer" onClick={toggleComments}>
          <FaCommentAlt />
          <span>{post?.comment?.length}</span>
        </div>
        <div className="flex items-center space-x-2" onClick={handleRespost}>
          <FaRetweet />
          <span>{post?.repost?.length}</span>
        </div>
        <div className="flex items-center space-x-2">
          <FaShare />
          <span>{post?.share?.length}</span>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer" onClick={handleBookmark}>
          <CiBookmark className={isBookmarked ? "text-red-500" : ""} />
          <span>{bookmarkCount}</span>
        </div>
      </div>
      {post?.comment?.map((comment, index) => (
        <MainComment key={index} comment={comment} />
      ))}
      {addComment && <Comment id={post?._id} onComment={onComment} placeholder={"Comment"} />}
    </div>
  );
};

export default NewPost2;


