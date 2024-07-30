import Tweet from '../../components/main/Tweet'
import MainLayout from '../../components/main/MainLayout'
import React from 'react'
import { useGetFeedsQuery } from '../../service/feeds.service';
import { Spinner } from "flowbite-react";
import getTimeAgoString from '../../utils/getTimeAgoString';
import avatar4 from "../../assets/images/sidebar/avatar4.svg";



const CommunityHome = () => {
  const { data, isLoading, refetch } = useGetFeedsQuery();
  const posts = data?.data || [];
  return (
    <MainLayout>

{/* {isLoading ? (
        <div className="flex justify-center pt-10">
          <Spinner />
        </div>
      ) : posts.length === 0 ? (
        <div className="flex items-center flex-col mt-10 justify-center h-auto">
          <img src={search} alt="Search icon" />
          <h2 className="font-bold text-4xl mt-5 mb-5">NO POST</h2>
          <p>Follow other users to begin to see posts</p>
          <Link to="/follow">
            <p className="text-primary-bright-green mt-2 font-semibold">
              Click here to follow suggested users
            </p>
          </Link>
        </div>
      ) : (
        [...posts]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((post, index) =>
            post.shared_by ? (
              <Tweet
                key={index}
                fullname={
                  post?.post_id?.user_id.display_name ||
                  post?.diary_id?.user_id.display_name
                }
                username={
                  post?.post_id?.user_id.username ||
                  post?.diary_id?.user_id.username
                }
                verifiedUser={false} // Adjust based on your data
                postTime={getTimeAgoString(post?.createdAt || post?.createdAt)}
                content={post?.post_id?.content || post?.diary_id?.content}
                media_urls={
                  post?.post_id?.media_urls || post?.diary_id?.media_urls
                }
                post_id={post?.post_id?._id || post?.diary_id?._id}
                comment={post?.post_id?.comment || post?.diary_id?.comment}
                repost={post?.post_id?.repost || post?.diary_id?.repost}
                share={post?.post_id?.share || post?.diary_id?.share}
                reaction={post?.post_id?.reaction || post?.diary_id?.reaction}
                avatar={
                  post?.post_id?.user_id.photo_url ||
                  post?.diary_id?.user_id.photo_url ||
                  avatar4
                }
                badgeColor={
                  post?.post_id?.user_id?.department[0]?.badge?.color ||
                  post?.diary_id?.user_id?.department[0]?.badge?.color
                }
                department={
                  post?.post_id?.user_id?.department[0]?.badge?.department ||
                  post?.diary_id?.user_id?.department[0]?.badge?.department
                }
                userId={
                  post?.post_id?.user_id?._id || post?.diary_id?.user_id?._id
                }
                type={post?.post_id?.type || post?.diary_id?.type}
                // user_id={post?.post_id?.user_id?._id}
              />
            ) : post.user_id ? (
              <Tweet
                key={index}
                fullname={post.user_id.display_name}
                username={post.user_id.username}
                verifiedUser={false} // Adjust based on your data
                postTime={getTimeAgoString(post.createdAt)}
                content={post.content}
                media_urls={post.media_urls}
                post_id={post._id}
                comment={post.comment}
                repost={post.repost}
                share={post.share}
                reaction={post.reaction}
                avatar={post.user_id.photo_url || avatar4}
                badgeColor={post.user_id?.department[0]?.badge?.color}
                department={post.user_id?.department[0]?.badge?.department}
                userId={post.user_id?._id}
                type={post?.type}
                // user_id={post.user_id?._id}
              />
            ) : (
              <div className="mt-4" key={index}>
                {post.options ? (
                  <PollDisplay
                    expired={post.expired}
                    question={post.question}
                    fullname={post.created_by.display_name}
                    username={post.created_by.username}
                    pollId={post._id}
                    votes={post.votes}
                    result={post.result}
                    onRefresh={refetch}
                    totalVotes={post.totalVotes}
                    postTime={getTimeAgoString(post.createdAt)}
                  />
                ) : (
                  ""
                )}
              </div>
            )
          )
      )} */}
<div className="mt-1 min-h-screen px-5 pt-5 bg-white">
<h1>Coming Soon...</h1>
</div>
    </MainLayout>
  )
}

export default CommunityHome
