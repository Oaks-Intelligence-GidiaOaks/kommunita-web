import React from "react";
import noimage from "../../assets/images/sidebar/avatar4.svg";
import { BeatLoader } from "react-spinners";

const FollowCard = ({ follow, isFollowing, submitting, onClick }) => {
  return (
    <div className="flex flex-col justify-between overflow-y-auto">
      <div className="flex justify-between overflow-y-auto items-center gap-3 mb-3 bg-white/50 p-2">
        <div className="flex gap-4">
          <img
            src={follow?.profile_image || noimage}
            className="w-[50.782px] h-[50.726px]"
            alt="avatar"
          />
          <div className="flex flex-col">
            <p className="font-semibold">{follow?.display_name || "Display Name"}</p>
            <p className="text-sm">@{follow?.username || "Username"}</p>
          </div>
        </div>

        <button
          onClick={onClick}
          className={`${
            isFollowing ? "border-2 border-primary-bright-green text-primary-bright-green" : "bg-primary--bright-green text-white"
          } p-2 rounded-lg w-[100px] text-center font-semibold px-5`}
        >
          {submitting ? (
            <BeatLoader color="#ffffff" loading={true} />
          ) : (
            isFollowing ? "Unfollow" : "Follow"
          )}
        </button>
      </div>
    </div>
  );
};

export default FollowCard;
