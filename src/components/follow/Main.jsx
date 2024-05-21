import "./style.css";

// import search from "../../assets/images/Home/Search.png";

import { useGetWhoToFollowQuery } from "../../service/whotofollow.service";

import FollowContainer from "./FollowContainer";

function Main() {
  const { data } = useGetWhoToFollowQuery();
  // const { data: user } = useGetUserProfiileQuery();
  // const { refetch } = useGetFeedsQuery();
  const post = data;
  // console.log(post?.data);
  // console.log(user?.data?._id);
  // const [following, setFollowing] = useState(false);

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
        <div key={id}>
          <FollowContainer like={like} />
        </div>
      ))}
    </div>
  );
}

export default Main;
