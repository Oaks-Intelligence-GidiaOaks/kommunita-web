import { Spinner } from 'flowbite-react';
// import { useGetFeedsQuery } from '../../service/feeds.service';
// import React from 'react'
import { Link } from 'react-router-dom';
import search from "../../assets/images/Home/Search.png";
import NewPost2 from '../posts/NewPost2';
import Repost2 from '../posts/Repost2';
import NewPollssss from '../newPolls/NewPollssss';
import { useGetAdminPostQuery } from '../../service/post.service';


const Kommunity = () => {
    const { data, isLoading, refetch } = useGetAdminPostQuery();
    const posts = data?.data || [];
    console.log(posts)
  return (
    <div>
          {isLoading ? (
        <div className="flex justify-center pt-10">
          <Spinner />
        </div>
      ) : posts.length === 0 ? (
        <div className="flex items-center flex-col mt-10 justify-center h-auto">
          <img src={search} alt="Search icon" />
          <h2 className="font-bold text-4xl mt-5 mb-5">NO POST</h2>
          <p>No post from the admin of this community yet</p>
          <Link to="/follow">
            <p className="text-primary-bright-green mt-2 font-semibold">
              {/* Click here to follow suggested users */}
            </p>
          </Link>
        </div>
      ) : (
        data?.data.map((post) => {
          if (post.type === "post") {
            return <NewPost2 key={post?._id} post={post} />;
          } else if (post.action_type === "Repost") {
            return <Repost2 key={post?._id} post={post} />
          } else if(post.type === 'poll') {
            return <NewPollssss key={post?._id} poll={post} onRefresh={refetch} />;
          } else{
            return null;
          }
        })
          
      )}
    </div>
  )
}

export default Kommunity
