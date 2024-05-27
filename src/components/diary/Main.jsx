import "../main/style.css";
import Story from "../main/Story";
import Posts from "../main/Posts";
import postImage from "../../assets/images/main/post-image.svg";
import avatar1 from "../../assets/images/sidebar/avatar1.svg";
import avatar2 from "../../assets/images/sidebar/avatar2.svg";
import avatar4 from "../../assets/images/sidebar/avatar4.svg";
import { useGetDiaryQuery } from "../../service/diary.service";
import getTimeAgoString from "./../../utils/getTimeAgoString";
import search from "../../assets/images/Home/Search.png";

function DiaryMain() {
  const { data } = useGetDiaryQuery();
  const post = data;
  console.log("posts", data?.data);

  if (!data) {
    return (
      <div className="flex items-center flex-col mt-10">
        <img src={search} alt="" />
        <h2 className="font-semibold text-3xl mt-5 ml-5">No Diaries feeds</h2>
      </div>
    );
  }

  return (
    <div className="mt-3 px-3 main-wrapper w-full pb-10">
      <Story />

      {post?.data.map((post, index) => (
        <Posts
          key={index}
          fullname={post.user_id.display_name}
          username={post.user_id.username}
          verifiedUser={false} // You need to adjust this based on your data
          postTime={getTimeAgoString(post.createdAt)} // Assuming createdAt is the post time
          content={post.content}
          media_urls={post.media_urls}
          post_id={post._id}
          comment={post.comment}
          repost={post.repost}
          share={post.share}
          reaction={post.reaction}
          avatar={post.user_id.photo_url || avatar1}
          badgeColor={post.user_id?.department[0]?.badge?.color}
          department={post.user_id?.department[0]?.badge?.department}
        />
      ))}
    </div>
  );
}

export default DiaryMain;
