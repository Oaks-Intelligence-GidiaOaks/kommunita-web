import React from "react";
import noimage from "../../assets/images/sidebar/avatar4.svg";
import { Link } from "react-router-dom";

const GeneralUserCard = ({ user }) => {
  return (
    <div className="flex justify-between items-center bg-white/90 p-4 gap-3 mb-3">
      <div className="flex gap-4">
        <img
          src={user.photo_url || noimage}
          className="w-[50.782px] h-[50.726px]"
          alt="avatar"
        />
        <div className="flex flex-col">
          <p className="font-semibold">{user.display_name}</p>
          <p className="text-sm">@{user.username}</p>
        </div>
      </div>
      <div>
        <Link
          to={`/profile/${user._id}`}
          //   onClick={() => handleFollow(like.like._id)}
          className="p-2 bg-primary--bright-green text-white rounded-lg w-[100px] text-center text-sm font-semibold px-5"
        >
          View Profille
        </Link>
      </div>
    </div>
  );
};

export default GeneralUserCard;
