import { Spinner } from "flowbite-react";
import { useGetExplorePostImagesQuery } from "../../service/explore.service";
import React from "react";
import NewPost2 from "../../components/posts/NewPost2";

const Explore_Images = () => {
  const { data: imagesData, isLoading: imagesLoading } = useGetExplorePostImagesQuery();
  console.log(imagesData);
  return (
    <div
      className={``}
    >
      {imagesLoading ? (
        <div className="flex items-center justify-center mt-10">
          <Spinner />
        </div>
      ) : (
        imagesData?.data.map((post) => {
          return <NewPost2 key={post?._id} post={post} />;
        })
      )}
    </div>
  );
};

export default Explore_Images;
