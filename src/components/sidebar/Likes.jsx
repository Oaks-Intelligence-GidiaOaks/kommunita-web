import noImage from "../../assets/images/sidebar/noImage.png";

import { useGetWhoToFollowQuery } from "../../service/whotofollow.service";
import { useState } from "react";
import { useEffect } from "react";
import { ShimmerSocialPost } from "react-shimmer-effects";
import { Link } from "react-router-dom";
import { useGetUserProfiileQuery } from "../../service/user.service";
import axios from "axios";
import { useSelector } from "react-redux";
import LikeContainer from "./LikeContainer";

function Likes() {
  const { data } = useGetWhoToFollowQuery();
  const { data: user, refetch } = useGetUserProfiileQuery();

  const [likes, setLikes] = useState(null);

  // console.log(data?.data);

  useEffect(() => {
    if (data?.data?.length && data?.data?.length > 0 && user) {
      // setLikes(data.data.slice(-5));
      setLikes(data.data);
      const nw = data?.data?.map((like) => {
        if (like.followers?.filter((f) => f == user?.data?._id).length == 0) {
          return like;
        }
      });
      setLikes(nw.filter((f) => f !== undefined).slice(-5));
      // console.log("NEW DATA", nw);
    }
  }, [data, user]);

  return (
    <div className="main-sidebar-section mt-8 pb-5 w-full">
      <div className="py-3 px-4">
        <p className="text-like mb-4">People you might like</p>

        {likes ? (
          <div className="lists mb-5 flex flex-col gap-4">
            {/* {likes?.map((like, id) => {
              if (
                like.followers.filter((f) => f == user?.data._id).length == 0
              ) {
                return <LikeContainer key={id} like={like} />;
              }
            })} */}
            {likes?.map((like, id) => (
              <LikeContainer key={id} like={like} refetch={refetch} />
            ))}
          </div>
        ) : // <div className="h-[300px] overflow-hidden">
        //   <ShimmerSocialPost type="text" />
        // </div>
        null}
        <Link to={"/follow"}>
          <div className="flex justify-center">
            <button className="view-likes">
              {likes?.length > 0 ? "View more" : "View"}
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Likes;
