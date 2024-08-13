import { Spinner } from "flowbite-react";
import { useGetExplorePostImagesQuery } from "../../service/explore.service";
import React from "react";
import search from "../../assets/images/Home/Search.png";
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
      ) : imagesData?.success === false ? (
        <div className="flex items-center flex-col mt-10">
          <img src={search} alt="" />
          <h2 className="font-semibold text-3xl mt-5 ml-5">
            No Data to display
          </h2>
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
