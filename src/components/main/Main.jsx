import "../main/style.css";
import Story from "./Story";
import MakePost from "./MakePost";
import Posts from "./Posts";
import avatar1 from "../../assets/images/sidebar/avatar1.svg";
import { useGetFeedsQuery } from "../../service/feeds.service";
import getTimeAgoString from "./../../utils/getTimeAgoString";
import PollDisplay from "../polls/PollDisplay";

function Main() {
  const { data } = useGetFeedsQuery();
  const { refetch } = useGetFeedsQuery();
  const posts = data?.data || []; // Ensure data is an array
  console.log(posts);

  return (
    <div className="mt-3 px-3 main-wrapper w-full pb-10">
      <Story />
      <MakePost />

      {[...posts]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort posts by latest first
        .map((post, index) =>
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

export default Main;
