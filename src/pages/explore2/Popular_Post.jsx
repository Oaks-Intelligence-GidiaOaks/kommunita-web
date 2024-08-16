import NewPost2 from "../../components/posts/NewPost2";
import { Spinner } from "flowbite-react";
import { useGetExplorePostQuery } from "../../service/explore.service";
import search from "../../assets/images/Home/Search.png";
import { useSelector } from "react-redux";


const Popular_Post = () => {
  const filterParams = useSelector((state)=>state.filter)
  const { data: postData, isLoading: postLoading } = useGetExplorePostQuery(filterParams);

  return (
    <div>
      {postLoading ? (
        <div className="flex justify-center pt-10">
          <Spinner />
        </div>
      ) : postData?.success === false ? (
        <div className="flex items-center flex-col mt-10">
          <img src={search} alt="" />
          <h2 className="font-semibold text-3xl mt-5 ml-5">
            No Data to display
          </h2>
        </div>
      ) : (
        postData?.data.map((post) => {
          return <NewPost2 key={post?._id} post={post} />;
        })
      )}
    </div>
  );
};

export default Popular_Post;
