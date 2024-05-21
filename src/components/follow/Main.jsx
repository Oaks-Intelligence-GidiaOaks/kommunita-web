import "./style.css";

import search from "../../assets/images/Home/Search.png";

import { useGetWhoToFollowQuery } from "../../service/whotofollow.service";
import avatar1 from "../../assets/images/sidebar/avatar1.svg";
import noimage from "../../assets/images/sidebar/noImage.png";
import { useSelector } from "react-redux";
import { showAlert } from "../../static/alert";
import { useGetFeedsQuery } from "../../service/feeds.service";
import axios from "axios";
import { useGetUserProfiileQuery } from "../../service/user.service";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import FollowContainer from "./FollowContainer";

function Main() {
  const { data } = useGetWhoToFollowQuery();
  const { data: user } = useGetUserProfiileQuery();
  const { refetch } = useGetFeedsQuery();
  const post = data;
  // console.log(post?.data);
  // console.log(user?.data?._id);
  // const [following, setFollowing] = useState(false);

  const token = useSelector((state) => state.user?.token);

  const handleFollo = async (followers, id) => {
    setSubmitting(true);
    setSubmitId(id);
    let data = {};
    let route = "follow";

    const fl = followers.filter((f) => f == user?.data._id);
    if (fl.length == 1) {
      data = {
        user_to_unfollow_id: id,
      };
      route = "unfollow";
      // setFollowing(false);
    }

    if (fl.length == 0) {
      data = {
        user_to_follow_id: id,
      };
      // setFollowing(true);
    }

    if (data) {
      // console.log(data);
      const apiUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

      try {
        const response = await axios.post(`${apiUrl}/user/${route}`, data, {
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        });

        console.log("Post submitted successfully:", response.data);
        // window.location.href = "/follow";
      } catch (error) {
        console.error("Error submitting post:", error);
        showAlert(
          "Oops!",
          error?.response?.data?.message || "An error occurred",
          "error"
        );
      } finally {
        refetch();
        setSubmitting(false);
        setSubmitId("");
      }
    }
  };

  // if (!data) {
  //   return (
  //     <div className="flex items-center flex-col mt-10">
  //       <img src={search} alt="" srcset="" />
  //       <h2 className="font-semibold text-3xl mt-5">No Suggested Followers</h2>
  //     </div>
  //   );
  // }

  return (
    <div className="mt-3 px-3 w-full">
      <h2 className="font-semibold text-xl mb-5">Suggested followers</h2>
      {post?.data.map((like, id) => (
        // <div key={id} className="flex justify-between items-center gap-3 mb-3">
        //   <div className="flex gap-4">
        //     <img
        //       src={like.photo_url || noimage}
        //       className="w-[50.782px] h-[50.726px]"
        //       alt="avatar"
        //     />
        //     <div className="flex flex-col">
        //       <p className="font-semibold">{like.display_name}</p>
        //       <p className="text-sm">@{like.username}</p>
        //     </div>
        //   </div>

        //   {like.followers.filter((f) => f == user?.data._id).length == 1 ? (
        //     <button
        //       onClick={() => handleFollow(like.followers, like._id)}
        //       className="p-2 border-2 border-primary-bright-green text-primary-bright-green rounded-lg w-[100px] text-center font-semibold px-5"
        //     >
        //       {submitting && submitID == like._id ? (
        //         <BeatLoader color="#ffffff" loading={true} />
        //       ) : (
        //         "Following"
        //       )}
        //     </button>
        //   ) : (
        //     <button
        //       onClick={() => handleFollow(like.followers, like._id)}
        //       className="p-2 bg-primary--bright-green text-white rounded-lg w-[100px] text-center font-semibold px-5"
        //     >
        //       {submitting && submitID == like._id ? (
        //         <BeatLoader color="#ffffff" loading={true} />
        //       ) : (
        //         "Follow"
        //       )}
        //     </button>
        //   )}
        // </div>
        <div key={id}>
          <FollowContainer like={like} />
        </div>
      ))}
    </div>
  );
}

export default Main;
