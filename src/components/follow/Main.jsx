import "./style.css";

import search from "../../assets/images/Home/Search.png";

import { useGetWhoToFollowQuery } from "../../service/whotofollow.service";

import FollowContainer from "./FollowContainer";
import { useGetUserProfiileQuery } from "../../service/user.service";
import { useEffect, useState } from "react";

function Main() {
  const { data } = useGetWhoToFollowQuery();
  const { data: user } = useGetUserProfiileQuery();
  const [likes, setLikes] = useState(null);

  useEffect(() => {
    if (data && user) {
      // setLikes(data.data);
      const nw = data?.data?.map((like) => {
        if (like.followers.filter((f) => f == user?.data._id).length == 0) {
          return like;
        }
      });
      setLikes(nw.filter((f) => f !== undefined).slice(-5));
    }
  }, [data, user]);

  return (
    <div className="mt-5 px-3 w-full bg-white">
      {likes && likes?.length == 0 && (
        <div className="flex items-center flex-col mt-10">
          <img src={search} alt="" srcset="" />
          <h2 className="font-semibold text-3xl mt-5">
            No Suggested Followers
          </h2>
        </div>
      )}

      {likes && likes?.length != 0 && (
        <h2 className="font-semibold text-xl mb-5">Suggested followers</h2>
      )}

      {likes?.map((like, id) => (
        <FollowContainer like={like} key={id} />
      ))}

      {/* {likes?.map((like, id) => {
        if (like.followers.filter((f) => f == user?.data._id).length == 0) {
          // return <LikeContainer key={id} like={like} />;
          <FollowContainer like={like} key={id} />;
        }
      })} */}
    </div>
  );
}

export default Main;
