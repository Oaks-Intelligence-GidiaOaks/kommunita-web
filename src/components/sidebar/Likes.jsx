import noImage from "../../assets/images/sidebar/noImage.png";
import actions from "../../assets/images/sidebar/action.svg";
import actionPlus from "../../assets/images/sidebar/action-plus.svg";
import { useGetWhoToFollowQuery } from "../../service/whotofollow.service";
import { useState } from "react";
import { useEffect } from "react";
import { ShimmerSocialPost } from "react-shimmer-effects";
import { Link } from "react-router-dom";
import { useGetUserProfiileQuery } from "../../service/user.service";
import axios from "axios";
import { useSelector } from "react-redux";

function Likes() {
  const { data } = useGetWhoToFollowQuery();
  const { data: user, refetch } = useGetUserProfiileQuery();
  const [likes, setLikes] = useState(null);
  const [followed, setFollowed] = useState(false);

  // console.log(data?.data);
  const token = useSelector((state) => state.user?.token);

  useEffect(() => {
    if (data && data.data.length > 5) {
      setLikes(data.data.slice(-4));
    } else if (data && data.data.length > 0) {
      setLikes(data.data);
    }
  }, [data]);

  const handleFollow = async (followers, id) => {
    // console.log(id);
    let data = {};
    let route = "follow";

    const fl = followers.filter((f) => f == user?.data._id);
    if (fl.length == 1) {
      data = {
        user_to_unfollow_id: id,
      };
      route = "unfollow";
    }

    if (fl.length == 0) {
      data = {
        user_to_follow_id: id,
      };
    }

    if (data) {
      // console.log(data);
      // setSubmitting(true);
      const apiUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

      try {
        const response = await axios.post(`${apiUrl}/user/${route}`, data, {
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        });

        console.log("successful:", response.data);
      } catch (error) {
        console.error("Error submitting post:", error);
        showAlert(
          "Oops!",
          error?.response?.data?.message || "An error occurred",
          "error"
        );
      } finally {
        refetch();
        // setSubmitting(false);
      }
    }
  };

  return (
    <div className="main-sidebar-section mt-8 pb-5 w-full">
      <div className="py-3 px-4">
        <p className="text-like mb-4">You might like</p>

        {likes ? (
          <div className="lists mb-5 flex flex-col gap-4">
            {likes?.map((like, id) => (
              <div key={id} className="flex justify-between items-center gap-3">
                <div className="flex gap-4">
                  <img
                    src={like.photo_url || noImage}
                    className="w-[33.782px] h-[32.726px]"
                    alt="avatar"
                  />
                  <div className="flex flex-col">
                    <p className="names">{like.display_name}</p>
                    <p className="usernames">@{like.username}</p>
                  </div>
                </div>

                {!like.followers.filter((fl) => fl == user?.data._id).length ==
                1 ? (
                  <button
                    onClick={() => handleFollow(like.followers, like._id)}
                  >
                    <img src={actions} alt="" />
                  </button>
                ) : (
                  <button
                    onClick={() => handleFollow(like.followers, like._id)}
                  >
                    <img src={actionPlus} alt="" />
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="h-[300px] overflow-hidden">
            <ShimmerSocialPost type="text" />
          </div>
        )}
        <Link to={"/follow"}>
          <div className="flex justify-center">
            <button className="view-likes">View more</button>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Likes;
