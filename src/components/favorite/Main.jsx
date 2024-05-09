import "./style.css";
import Header from "./Header";
import Posts from "../main/Posts";
import postImage from "../../assets/images/main/post-image.svg";
import avatar1 from "../../assets/images/sidebar/avatar1.svg";
import avatar2 from "../../assets/images/sidebar/avatar2.svg";
import avatar4 from "../../assets/images/sidebar/avatar4.svg";
import { useGetFeedsQuery } from "../../service/feeds.service";
import getTimeAgoString from "./../../utils/getTimeAgoString";
import PollDisplay from "../polls/PollDisplay";

function Main() {
  const { data, refetch } = useGetFeedsQuery();
  const post = data;
  // console.log(data?.data);

  return (
    <div className="mt-3 px-3 w-full">
      <Header />
      {post?.data.map((post, index) =>
        post.user_id ? (
          <Posts
            key={index}
            fullname={post?.user_id?.display_name}
            username={post?.user_id?.username}
            verifiedUser={false} // You need to adjust this based on your data
            postTime={getTimeAgoString(post.createdAt)}
            content={post.content}
            media_urls={post.media_urls}
            post_id={post._id}
            comment={post.comment}
            repost={post.repost}
            share={post.share}
            reaction={post.reaction}
            avatar={post.user_id.photo_url || avatar1} // You need to provide the avatar source
          />
        ) : (
          <div className="mt-4">
            <PollDisplay
              key={index}
              expired={post.expired}
              question={post?.question}
              fullname={post.created_by.display_name}
              username={post.created_by.username}
              pollId={post._id}
              votes={post.votes}
              result={post.result}
              onRefresh={refetch}
              totalVotes={post.totalVotes}
              postTime={getTimeAgoString(post.createdAt)}
            />
          </div>
        )
      )}
    </div>
  );
}
{
  /* <Posts
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
  avatar={post.user_id.photo_url || avatar1}
  // avatar={avatar1} // You need to provide the avatar source
/> */
}

export default Main;
