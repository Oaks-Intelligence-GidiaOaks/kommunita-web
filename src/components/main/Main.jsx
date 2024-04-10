import "../main/style.css";
import Story from "./Story";
import MakePost from "./MakePost";
import Posts from "./Posts";
// import postImage from "../../assets/images/main/post-image.svg";
import avatar1 from "../../assets/images/sidebar/avatar1.svg";
// import avatar2 from "../../assets/images/sidebar/avatar2.svg";
// import avatar4 from "../../assets/images/sidebar/avatar4.svg";
import { useGetFeedsQuery } from "../../service/feeds.service";
// import moment from "moment";
import getTimeAgoString from "./../../utils/getTimeAgoString";
import { useGetDiaryQuery } from "../../service/diary.service";

function Main() {
  const { data } = useGetFeedsQuery();
  const { data: diary } = useGetDiaryQuery();
  const post = data;
  console.log("DIARIES: ", post.data);

  return (
    <div className="mt-3 px-3 main-wrapper w-full pb-10">
      <Story />
      <MakePost />
      {post?.data.map((post, index) => (
        <Posts
          key={index}
          fullname={post.user_id.display_name}
          username={post.user_id.username}
          verifiedUser={false} // You need to adjust this based on your data
          postTime={getTimeAgoString(post.createdAt)} // Assuming createdAt is the post time
          // postTime={moment(post.createdAt).fromNow()} // Assuming createdAt is the post time
          content={post.content}
          media_urls={post.media_urls}
          post_id={post._id}
          comment={post.comment}
          repost={post.repost}
          share={post.share}
          reaction={post.reaction}
          avatar={avatar1} // You need to provide the avatar source
        />
      ))}
    </div>
  );
}

export default Main;
