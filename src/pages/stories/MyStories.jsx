import { RxDotsHorizontal } from "react-icons/rx";
import { useGetStoriesFeedQuery } from "../../service/stories.service";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { profile_placeholder } from "../../assets/images";
import Stories from "react-insta-stories";
import getTimeAgoString from "../../utils/getTimeAgoString";
import { useEffect, useState } from "react";

const MyStories = () => {
  const { data } = useGetStoriesFeedQuery();
  const [activeIndex, setActiveIndex] = useState(0);
  const stories = data?.data

  useEffect(() => {
    // Function to move to the next card
    const moveNext = () => {
      if (stories) {
        setActiveIndex((prevIndex) => (prevIndex + 1) % stories.length);
      }
    };
  
    // Timing intervals
    const initialDelay = 5000;
    const subsequentDelay = 3000;
  
    // Initial timer
    const initialTimer = setTimeout(() => {
      moveNext();
      const interval = setInterval(moveNext, subsequentDelay);
      return () => clearInterval(interval);
    }, initialDelay);
  
    // Cleanup
    return () => {
      clearTimeout(initialTimer);
    };
  }, [stories]);

  return (
    <div className="text-white slider-container">
      {data?.data && data?.data.length > 0 && (
        <div className="stories-container  whitespace-nowrap w-[350px] flex mb-2 relative">
          <div className="stories flex justify-start gap-2 items-center">
            {data?.data.map((story, index) => (
              <div
              className={`w-[20rem] flex flex-col bg-black text-white rounded-lg p-4 transition-transform duration-500 ease-in-out absolute ${
                index === activeIndex - 1
                  ? "left-[-100%]"
                  : index === activeIndex + 1
                  ? "right-[-100%]"
                  : ""
              }`}
              key={story._id}
              style={{
                opacity: Math.abs(index - activeIndex) <= 1 ? 1 : 0,
                visibility: Math.abs(index - activeIndex) <= 1 ? "visible" : "hidden",
              }}
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <div className="rounded-full border-4 border-white w-[3rem] h-[3rem] overflow-hidden">
                      <img
                        src={story?.photo_url || profile_placeholder}
                        alt="profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-white">
                        {story?.display_name}
                      </h4>
                      <p className="text-gray-400 text-sm">
                        @LarryBjaWhiz · <span className="ml-1">{getTimeAgoString(story?.createdAt)}</span>
                      </p>
                    </div>
                  </div>
                  <RxDotsHorizontal className="text-white text-2xl" />
                </div>

                <div className="relative">
                  <div className="mx-auto w-full h-[25rem] rounded-lg overflow-hidden">
                    <Stories
                      stories={story.stories.map(
                        (story) => story.media_url.media_url
                      )}
                      defaultInterval={3500}
                      width={'inherit'}
                      height={'inherit'}
                    />
                  </div>
                </div>

                <p className="text-center mt-4">{story?.stories[0]?.caption}</p>

                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Reply this story"
                    className="w-full py-2 px-4 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-white"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer">
        <AiOutlineArrowRight className="text-3xl text-white" />
      </div>
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 cursor-pointer">
        <AiOutlineArrowLeft className="text-3xl text-white" />
      </div>
    </div>
  );
};

export default MyStories;