/* eslint-disable react/prop-types */
import  { useState, useEffect, useRef } from "react";

const CustomStories = ({
  stories,
  defaultInterval = 5000,
  width = "100%",
  height = "100%",
  onStoryStart,
  onAllStoriesEnd,
  // preloadCount = 5,
  isPaused = false,
}) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(!isPaused);
  const storyRef = useRef(null);

  useEffect(() => {
    let timer;

    if (isPlaying && currentStoryIndex < stories.length) {
      const story = stories[currentStoryIndex];
      const duration = story.duration || defaultInterval;

      // Trigger the onStoryStart callback when a story begins
      onStoryStart && onStoryStart(story, currentStoryIndex);

      // Set a timeout to move to the next story
      timer = setTimeout(() => {
        // Move to the next story or end if it's the last one
        if (currentStoryIndex < stories.length - 1) {
          setCurrentStoryIndex((prevIndex) => prevIndex + 1);
        } else {
          // If it's the last story, call onAllStoriesEnd
          onAllStoriesEnd && onAllStoriesEnd();
        }
      }, duration);
    }

    // Clear the timer when the component unmounts or currentStoryIndex changes
    return () => {
      clearTimeout(timer);
    };
  }, [currentStoryIndex, isPlaying, stories, defaultInterval, onStoryStart, onAllStoriesEnd]);

  // Update the playing state when isPaused changes
  useEffect(() => {
    setIsPlaying(!isPaused);
  }, [isPaused]);

  // Toggle play/pause on story click
  const handleStoryClick = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  // Render the story content (image or video)
  const renderStory = (story) => {
    if (story.type === "image") {
      return <img src={story.url} alt="" style={{ width: "100%", height: "100%" }} />;
    } else if (story.type === "video") {
      return (
        <video
          ref={storyRef}
          src={story.url}
          style={{ width: "100%", height: "100%" }}
          autoPlay
          muted
          loop
        />
      );
    }
    return null;
  };

  return (
    <div
      style={{
        width,
        height,
        overflow: "hidden",
        position: "relative",
      }}
      onClick={handleStoryClick}
    >
      {renderStory(stories[currentStoryIndex])}
    </div>
  );
};

export default CustomStories;
