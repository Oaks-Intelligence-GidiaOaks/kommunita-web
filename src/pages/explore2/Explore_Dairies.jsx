import Diary from '../../components/diary/Diary';
import { useGetExploreDiaryQuery } from '../../service/explore.service';
import { Spinner } from 'flowbite-react';
import search from "../../assets/images/Home/Search.png";
import { useSelector } from 'react-redux';


const Explore_Dairies = () => {
  const filterParams = useSelector((state)=>state.filter)
  const { data: diaries, isLoading: diariesLoading } =   useGetExploreDiaryQuery(filterParams);
// console.log(filterParams)


  return (
    <div
      className={``}
    >
      {diariesLoading ? (
        <div className="flex items-center justify-center mt-10">
          <Spinner />
        </div>
      ) : diaries?.success === false ? (
        <div className="flex items-center flex-col mt-10">
          <img src={search} alt="" />
          <h2 className="font-semibold text-3xl mt-5 ml-5">
            No Data to display
          </h2>
        </div>
      ) : (
        diaries?.data.map((post) => {
          return <Diary key={post?._id} post={post} />;
        })
      )}
    </div>
  )
}

export default Explore_Dairies
