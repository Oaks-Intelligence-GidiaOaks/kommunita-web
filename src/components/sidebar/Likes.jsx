import avatar1 from "../../assets/images/sidebar/avatar1.svg";
import actions from "../../assets/images/sidebar/action.svg";
import actionPlus from "../../assets/images/sidebar/action-plus.svg";
import { useGetWhoToFollowQuery } from "../../service/whotofollow.service";
import { useState } from "react";
import { useEffect } from "react";
import { ShimmerSocialPost } from "react-shimmer-effects";

function Likes() {
  const { data } = useGetWhoToFollowQuery();
  const [likes, setLikes] = useState(null);

  useEffect(() => {
    if (data && data.data.length > 5) {
      setLikes(data.data.slice(-4));
    } else if (data && data.data.length > 0) {
      setLikes(data.data);
    }
  }, []);

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
                    src={avatar1}
                    className="w-[33.782px] h-[32.726px]"
                    alt="avatar"
                  />
                  <div className="flex flex-col">
                    <p className="names">{like.display_name}</p>
                    <p className="usernames">@{like.username}</p>
                  </div>
                </div>

                <button>
                  <img src={actions} alt="" />
                  {/* <img src={actionPlus} alt="" /> */}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-[300px] overflow-hidden">
            <ShimmerSocialPost type="text" />
          </div>
        )}

        <div className="flex justify-center">
          <button className="view-likes">View more</button>
        </div>
      </div>
    </div>
  );
}

export default Likes;
