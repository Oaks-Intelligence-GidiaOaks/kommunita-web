import "./style.css";

import search from "../../assets/images/Home/Search.png";

import { useGetWhoToFollowQuery } from "../../service/whotofollow.service";
import avatar1 from "../../assets/images/sidebar/avatar1.svg";
import actions from "../../assets/images/sidebar/action.svg";

function Main() {
  const { data, refetch } = useGetWhoToFollowQuery();
  // const { data, refetch } = useGetFeedsQuery();
  const post = data;
  console.log(data?.data);

  if (!data) {
    return (
      <div className="flex items-center flex-col mt-10">
        <img src={search} alt="" srcset="" />
        <h2 className="font-semibold text-3xl mt-5 ml-5">No favorites feeds</h2>
      </div>
    );
  }

  return (
    <div className="mt-3 px-3 w-full">
      <h2 className="font-semibold text-xl mb-5">Suggested followers</h2>
      {post?.data.map((like, id) => (
        <div key={id} className="flex justify-between items-center gap-3 mb-3">
          <div className="flex gap-4">
            <img
              src={avatar1}
              className="w-[50.782px] h-[50.726px]"
              alt="avatar"
            />
            <div className="flex flex-col">
              <p className="font-semibold">{like.display_name}</p>
              <p className="text-sm">@{like.username}</p>
            </div>
          </div>

          <button className="p-2 bg-primary--bright-green text-white rounded-lg font-semibold px-5">
            Follow
          </button>
        </div>
      ))}
    </div>
  );
}

export default Main;
