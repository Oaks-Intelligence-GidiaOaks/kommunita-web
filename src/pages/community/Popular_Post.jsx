import { useGetFeedsQuery } from "../../service/feeds.service";
import NewPost2 from "../../components/posts/NewPost2";
import React from "react";
import { Spinner } from "flowbite-react";

const Popular_Post = () => {
  const { data, isLoading, refetch } = useGetFeedsQuery();
  const posts = data?.data || [];
  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center pt-10">
          <Spinner />
        </div>
      ) : (
        data?.data.map((post) => {
          return <NewPost2 key={post?._id} post={post} />;
        })
      )}
    </div>
  );
};

export default Popular_Post;
