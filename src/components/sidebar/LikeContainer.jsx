import React, { useEffect, useState } from "react";
import rtkMutation from "../../utils/rtkMutation";
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "../../service/whotofollow.service";
// import noimage from "../../assets/images/sidebar/noImage.png";
import noimage from "../../assets/images/sidebar/avatar4.svg";
import { useGetUserProfiileQuery } from "../../service/user.service";
import { BeatLoader } from "react-spinners";
import { showAlert } from "../../static/alert";
import actions from "../../assets/images/sidebar/action.svg";
import actionPlus from "../../assets/images/sidebar/action-plus.svg";

const LikeContainer = (like) => {
  const [following, setFollowing] = useState(false);

  const [followUser, { error, isSuccess }] = useFollowUserMutation();
  const [unfollowUser, { error: err, isSuccess: scc }] =
    useUnfollowUserMutation();
  //   console.log(like.like.followers);
  const { data: user } = useGetUserProfiileQuery();

  const handleFollow = async (id) => {
    console.log("Follow ID: ", id);
    // setSubmitId(id);
    // setSubmitting(true);
    const postData = {
      user_to_follow_id: id,
    };
    try {
      await rtkMutation(followUser, postData);
      setFollowing((prevIsLoved) => !prevIsLoved);
    } catch (error) {
      console.error("Error liking post:", error);
      showAlert("Oops", "An error occurred while following this user", error);
    } finally {
      //   setSubmitId("");
      //   setSubmitting(false);
      //   refetch();
    }
  };

  const handleUnFollow = async (id) => {
    console.log(id);
    // setSubmitId(id);
    // setSubmitting(true);
    const postData = {
      user_to_unfollow_id: id,
    };
    try {
      await rtkMutation(unfollowUser, postData);
      setFollowing((prevIsLoved) => !prevIsLoved);
    } catch (error) {
      console.error("Error liking post:", error);
      showAlert("Oops", "An error occurred while unfollowing this user", error);
    } finally {
      //   setSubmitId("");
      //   setSubmitting(false);
      //   refetch();
    }
  };

  useEffect(() => {
    setFollowing(
      like.like?.followers?.filter((f) => f == user?.data._id).length == 1
        ? true
        : false
    );
    if (isSuccess) {
      console.log("success");
    } else if (error) {
      // showAlert("Oops", error.data.message || "An error occurred", "error");
      showAlert("Oops", "An error occurred", "error");
    }
  }, [isSuccess, error]);

  useEffect(() => {
    setFollowing(
      like.like?.followers?.filter((f) => f == user?.data._id).length == 1
        ? true
        : false
    );
  }, [handleFollow, handleUnFollow]);

  return (
    <>
      {/* <div className="flex justify-between items-center gap-3 mb-3">
        <div className="flex gap-4">
          <img
            src={like.like.photo_url || noimage}
            className="w-[50.782px] h-[50.726px]"
            alt="avatar"
          />
          <div className="flex flex-col">
            <p className="font-semibold">{like.like.display_name}</p>
            <p className="text-sm">@{like.like.username}</p>
          </div>
        </div>

        {following ? (
          <button
            onClick={() => handleUnFollow(like.like._id)}
            className="p-2 border-2 border-primary-bright-green text-primary-bright-green rounded-lg w-[100px] text-center font-semibold px-5"
          >
            {submitting ? (
              <BeatLoader color="#ffffff" loading={true} />
            ) : (
              "Following"
            )}
          </button>
        ) : (
          <button
            onClick={() => handleFollow(like.like._id)}
            className="p-2 bg-primary--bright-green text-white rounded-lg w-[100px] text-center font-semibold px-5"
          >
            {submitting ? (
              <BeatLoader color="#ffffff" loading={true} />
            ) : (
              "Follow"
            )}
          </button>
        )}
      </div> */}
      <div className="flex justify-between items-center gap-3">
        <div className="flex gap-4">
          <img
            src={like.like.photo_url || noimage}
            className="w-[33.782px] h-[32.726px]"
            alt="avatar"
          />
          <div className="flex flex-col">
            <p className="names">{like.like.display_name}</p>
            <p className="usernames">@{like.like.username}</p>
          </div>
        </div>

        {!following ? (
          <button onClick={() => handleFollow(like.like._id)}>
            <img src={actions} alt="" />
          </button>
        ) : (
          <button onClick={() => handleUnFollow(like.like._id)}>
            <img src={actionPlus} alt="" />
          </button>
        )}
      </div>
    </>
  );
};

export default LikeContainer;
