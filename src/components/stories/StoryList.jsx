import { useGetStoriesFeedQuery } from "../../service/stories.service";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setNewStories } from "../../redux/slices/stories.slice";
import { useSelector } from "react-redux";

const StoryList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { data,  } = useGetStoriesFeedQuery();
  const user = useSelector((state) => state.user.user.username);

  const isLoggedInUserStory = data?.data?.findIndex((story)=>story.username === user)
  // console.log(isLoggedInUserStory)

  const handleStoryClick = (storyId) => {
    const storyIndex = data?.data?.findIndex(story => story._id === storyId);
    const newStoriesArray = data?.data?.slice(storyIndex);
    dispatch(setNewStories(newStoriesArray));
    navigate(`/stories/${storyId}`);
  };


  return (
    <div className="flex w-full space-x-4 p-4 overflow-x-auto custom-scrollbar">
      <div className="flex flex-col items-center cursor-pointer">
        <div className="w-24 h-24 rounded-full p-[2px]">
          <div
            className="w-full h-full text-3xl flex flex-col items-center justify-center rounded-full bg-white p-1"
            onClick={() => navigate("/stories/create")}
          >
            +
          </div>
        </div>
        <p className="text-sm font-semibold text-center mt-2">Post Story</p>
      </div>
      {data?.data?.map((story) => (
        <div key={story?._id} 
        className="flex flex-col items-center cursor-pointer" 
        onClick={() =>{ 
          handleStoryClick(story?._id)
         }}
        >
          <div className="w-24 h-24 rounded-full p-[2px] bg-gradient-to-r from-[#34B53A] via-[#2CC84A] to-[#A6B953CC]">
            <div className="w-full h-full rounded-full bg-white p-1">
              <img
                className="w-full h-full rounded-full"
                src={story?.stories[0]?.media_url?.media_url}
                alt={story?.stories[0]?.user_id?.display_name}
              />
            </div>
          </div>
          <p className="text-sm font-semibold text-center mt-2">
            {isLoggedInUserStory === -1 ? story?.display_name : "Your Story" }
          </p>
        </div>
      ))}
    </div>
  );
};

export default StoryList;


