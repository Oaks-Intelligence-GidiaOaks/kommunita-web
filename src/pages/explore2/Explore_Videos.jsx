import { Spinner } from "flowbite-react";
import { useGetExplorePostVideosQuery } from "../../service/explore.service";
import search from "../../assets/images/Home/Search.png";

const Explore_Videos = () => {
  const { data: videosData, isLoading: videosLoading } =
    useGetExplorePostVideosQuery();
  return (
    <div className={``}>
      {videosLoading ? (
        <div className="flex items-center justify-center mt-10">
          <Spinner />
        </div>
      ) : videosData?.success === false ? (
        <div className="flex items-center flex-col mt-10">
          <img src={search} alt="" />
          <h2 className="font-semibold text-3xl mt-5 ml-5">
            No Data to display
          </h2>
        </div>
      ) : (
        videosData?.data.map((post) => {
          return <NewPost2 key={post?._id} post={post} />;
        })
      )}
    </div>
  );
};

export default Explore_Videos;
