import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaTimes, FaHeart, FaRegCommentDots } from "react-icons/fa";
import { useState } from "react";
// import Stories from 'react-insta-stories';

const stories = [
  {
    username: "Parsley Montana",
    handle: "LarryDjWhiz",
    image: "https://example.com/image1.jpg",
    caption: "Happy to be here today.",
  },
  {
    username: "Edgar Poe",
    handle: "EdgarPoe",
    image: "https://example.com/image2.jpg",
    caption: "Enjoying the view.",
  },
];

const ViewStories = () => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  const handleNextStory = () => {
    setCurrentStoryIndex((currentStoryIndex + 1) % stories.length);
  };

  const handlePrevStory = () => {
    setCurrentStoryIndex(
      (currentStoryIndex - 1 + stories.length) % stories.length
    );
  };

  const handleClose = () => {};
  return (
    <div className="text-white">
      <div className="sm:hidden md:flex rounded-lg p-4 flex-1">1</div>
      <div className="sm:hidden md:flex rounded-lg p-4 flex-1">
        {stories.length > 0 && (
          <div className="relative w-96 h-[550px] bg-black shadow-lg rounded-md overflow-hidden">
            {/* Story header */}
            <div className="flex justify-between items-center p-4">
              <div>
                <h2 className="font-bold">
                  {stories[currentStoryIndex].username}
                </h2>
                <span className="text-sm text-gray-400">
                  @{stories[currentStoryIndex].handle} • 5h
                </span>
              </div>
              <button onClick={handleClose}>
                <FaTimes className="text-white" />
              </button>
            </div>

            {/* Story image */}
            <div
              className="h-96 w-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${stories[currentStoryIndex].image})`,
              }}
            >
              <div className="absolute top-0 left-0 w-full h-full flex justify-between items-center">
                <button onClick={handlePrevStory} className="p-2">
                  <IoIosArrowBack className="text-white text-2xl" />
                </button>
                <button onClick={handleNextStory} className="p-2">
                  <IoIosArrowForward className="text-white text-2xl" />
                </button>
              </div>
            </div>

            {/* Story caption */}
            <div className="p-4">
              <p>{stories[currentStoryIndex].caption}</p>
            </div>

            {/* Story actions */}
            <div className="flex justify-between items-center px-4 pb-4">
              <div className="flex space-x-4">
                <FaHeart className="text-white text-xl" />
                <FaRegCommentDots className="text-white text-xl" />
              </div>
              <button className="text-sm text-gray-400">
                Reply this story
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="sm:hidden md:flex rounded-lg p-4 flex-1">add stories</div>
    </div>
  );
};

export default ViewStories;
