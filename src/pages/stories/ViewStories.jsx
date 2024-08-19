import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RxDotsHorizontal } from "react-icons/rx";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import Stories from "react-insta-stories";
import { useGetStoriesFeedQuery } from "../../service/stories.service";
import { profile_placeholder } from "../../assets/images";
import getTimeAgoString from "../../utils/getTimeAgoString";

const ViewStories = () => {
  const { data } = useGetStoriesFeedQuery();
  const stories = data?.data || [];
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const navigate = useNavigate();

  console.log(stories[activeStoryIndex])

  if(stories?.length === 0){
    navigate('/')
  }

  const handleNextUser = () => {
    if (activeStoryIndex < stories.length - 1) {
      setActiveStoryIndex((prevIndex) => prevIndex + 1);
      setCurrentStoryIndex(0); // Reset the story index
    } else {
      navigate("/"); 
    }
  };

  const handlePrevUser = () => {
    if (activeStoryIndex > 0) {
      setActiveStoryIndex(activeStoryIndex - 1);
      setCurrentStoryIndex(0);
    }
  };

  const currentUserStories = stories[activeStoryIndex]?.stories || [];
  const currentStory = currentUserStories[currentStoryIndex] || {};

  console.log(currentUserStories.map(story => story?.media_url?.media_url));

  return (
    <div className="text-white slider-container relative">
      {stories.length > 0 && (
        <div className="stories-container flex justify-center items-center h-screen">
          <div
            className="w-[25rem] flex flex-col bg-black text-white rounded-lg p-4 relative"
            key={stories[activeStoryIndex]._id}
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <div className="rounded-full border-4 border-white w-[3rem] h-[3rem] overflow-hidden">
                  <img
                    src={
                      stories[activeStoryIndex]?.photo_url || profile_placeholder
                    }
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-white">
                    {stories[activeStoryIndex]?.display_name}
                  </h4>
                  <p className="text-gray-400 text-sm">
                    @{stories[activeStoryIndex]?.username}{" "}
                    ·{" "}
                    {/* stories[activeStoryIndex].display_name.replace(/\s+/g, "") */}
                    <span className="ml-1">
                      {getTimeAgoString(currentStory?.createdAt)}
                    </span>
                  </p>
                </div>
              </div>
              <RxDotsHorizontal className="text-white text-2xl" />
            </div>

            <div className="relative">
              <div className="mx-auto w-full h-[25rem] rounded-lg overflow-hidden">
                <Stories
                 key={activeStoryIndex}
                  stories={currentUserStories?.map((story) => ({
                    url: story.media_url.media_url,
                    type:
                      story?.media_url?.media_type === "jpeg" ||
                      story?.media_url?.media_type === "png"
                        ? "image"
                        : "video",
                    duration:
                      story?.media_url?.media_type === "jpeg" ||
                      story?.media_url?.media_type === "png"
                        ? 5000
                        : 30, // durations in seconds
                  }))}
                  defaultInterval={5000}
                  width="100%"
                  height="100%"
                  onStoryStart={(_s, st) => setCurrentStoryIndex(st)}
                  onAllStoriesEnd={handleNextUser}
                  preloadCount={5}
                />
              </div>
            </div>

            <p className="text-center mt-4">{currentStory?.caption || ""}</p>

            <div className="mt-4">
              <input
                type="text"
                placeholder="Reply to this story"
                className="w-full py-2 px-4 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-white"
              />
            </div>

            {/* Navigation Arrows */}
            {activeStoryIndex > 0 && (
              <div
                className="absolute left-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={handlePrevUser}
              >
                <AiOutlineArrowLeft className="text-3xl text-white" />
              </div>
            )}
            {activeStoryIndex < stories?.length - 1 && (
              <div
                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={handleNextUser}
              >
                <AiOutlineArrowRight className="text-3xl text-white" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewStories;
