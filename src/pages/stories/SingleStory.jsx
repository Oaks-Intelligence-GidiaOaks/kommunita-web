import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RxDotsHorizontal } from "react-icons/rx";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import Stories from "react-insta-stories";
import { profile_placeholder } from "../../assets/images";
import getTimeAgoString from "../../utils/getTimeAgoString";
import { useSelector } from "react-redux";
import { BsSend } from "react-icons/bs";
import { IoMdHeartEmpty } from "react-icons/io";
import InputEmoji from "react-input-emoji";
import { useAddStoriesCommentMutation } from "../../service/stories.service";
import DropdownMenu from "../../components/ui/DropdownMenu";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoLinkOutline, IoSettingsOutline } from "react-icons/io5";
import Modals from "../../components/modals/Modal";
import CustomStories from "../../components/stories/CustomStories";

// import StorySkeleton from "./StorySkeleton";

const SingleStory = () => {
  const stories = useSelector((state) => state.stories);
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const navigate = useNavigate();
  const [isPaused, setIsPaused] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [addStoriesComment, { isLoading }] = useAddStoriesCommentMutation();
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const storyRef = useRef();
  const [storySettings, setStorySettings] = useState(false);

  const storiesRef = useRef(null);

  // const handleNextUser = () => {
  //   if (activeStoryIndex < stories.length - 1) {
  //     setActiveStoryIndex((prevIndex) => prevIndex + 1);
  //     setCurrentStoryIndex(0);
  //   } else {
  //     navigate("/");
  //   }
  // };

  const handleNextUser = () => {
    if (activeStoryIndex < stories.length - 1) {
      setActiveStoryIndex((prevIndex) => prevIndex + 1);
      setCurrentStoryIndex(0);  // Reset current story index for the next user
    } else {
      navigate("/");
    }
  };

  // const handlePrevUser = () => {
  //   if (activeStoryIndex > 0) {
  //     setActiveStoryIndex(activeStoryIndex - 1);
  //     setCurrentStoryIndex(0);
  //   }
  // };

  const handlePrevUser = () => {
    if (activeStoryIndex > 0) {
      setActiveStoryIndex(activeStoryIndex - 1);
      setCurrentStoryIndex(0);  // Reset current story index for the previous user
    }
  };

  const handleStoryStart = (story, index) => {
    setCurrentStoryIndex(index);  // Track the current story index
  };
  
  const handleAllStoriesEnd = () => {
    handleNextUser();  // Move to the next user's stories
  };

  const handleMouseEnter = () => {
    setIsPaused((prev) => !prev);
  };

  const handleMouseLeave = () => {
    setIsPaused((prev) => !prev);
  };

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

 console.log(stories)

  const currentUserStories = stories[activeStoryIndex]?.stories || [];
  const currentStory = currentUserStories[currentStoryIndex] || {};
  const timeAgo =
    currentStory?.createdAt &&
    getTimeAgoString(new Date(currentStory.createdAt));

  const handleSendComment = async () => {
    if (newMessage.trim() === "") {
      return;
    }

    try {
      const { data } = await addStoriesComment({
        story_id: stories[activeStoryIndex]._id,
        content: newMessage,
      }).unwrap();
      console.log("comment added successfully", data);
      setNewMessage("");
      setCurrentStoryIndex((prevIndex) => prevIndex + 1);
    } catch (error) {
      console.error("Error adding comment", error);
    }
  };
  useEffect(() => {
    if (storySettings) {
      setIsPaused(true);
    }
  }, [storySettings]);

  return (
    <div className="text-white slider-container relative">
      <div className="text-white slider-container relative">
        {stories.length > 0 && (
          <div className="stories-container flex justify-center items-center">
            <div
              className="w-[25rem] flex flex-col bg-black text-white rounded-lg p-4 relative z-20"
              key={stories[activeStoryIndex]?._id}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <div className="rounded-full border-4 border-white w-[3rem] h-[3rem] overflow-hidden">
                    <img
                      src={
                        stories[activeStoryIndex]?.photo_url ||
                        profile_placeholder
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
                      @{stories[activeStoryIndex]?.username} ·{" "}
                      <span className="ml-1">{timeAgo}</span>
                    </p>
                  </div>
                </div>
                <div className=" flex justify-center items-center">
                  <DropdownMenu
                    aria_label={"stories"}
                    dropdownRef={storyRef}
                    onClick={() => {
                      setIsStoryOpen(!isStoryOpen);
                    }}
                    display_value={
                      <>
                        <RxDotsHorizontal className="text-white text-2xl" />
                      </>
                    }
                    isDropdownOpen={isStoryOpen}
                    listItem={
                      <div className="py-1 px-4 text-black mx-auto try relative ">
                        <button className="flex items-center gap-3 mb-2 text-xl">
                          <RiDeleteBin5Line /> Delete
                        </button>
                        <button className="flex items-center gap-3 mb-2 text-xl">
                          <IoLinkOutline /> Copy Link
                        </button>
                        <span
                          className="flex items-center gap-3 mb-2 text-xl"
                          onClick={() => {
                            setStorySettings(true);
                            console.log("u clicked");
                          }}
                        >
                          <IoSettingsOutline /> Settings
                        </span>
                      </div>
                    }
                  />
                </div>
              </div>

              <div className="relative">
                <div className="mx-auto w-full h-[25rem] rounded-lg overflow-hidden">
                  {/* <Stories
                    ref={storiesRef}
                    key={activeStoryIndex}
                    stories={currentUserStories?.map((story) => ({
                      url: story?.media_url?.media_url,
                      type:
                        story?.media_url?.media_type === "jpeg" ||
                        story?.media_url?.media_type === "png"
                          ? "image"
                          : "video",
                      duration:
                        story?.media_url?.media_type === "jpeg" ||
                        story?.media_url?.media_type === "png"
                          ? 5000
                          : 30,
                    }))}
                    defaultInterval={5000}
                    width="100%"
                    height="100%"
                    onStoryStart={(_s, st) => setCurrentStoryIndex(st)}
                    onAllStoriesEnd={handleNextUser}
                    preloadCount={5}
                    isPaused={isPaused}
                  /> */}
 <CustomStories
  ref={storiesRef}
  stories={currentUserStories.map((story) => ({
    url: story?.media_url?.media_url,
    type:
      story?.media_url?.media_type === "jpeg" ||
      story?.media_url?.media_type === "png"
        ? "image"
        : "video",
    duration:
      story?.media_url?.media_type === "jpeg" ||
      story?.media_url?.media_type === "png"
        ? 5000
        : 30000,  // 30 seconds for videos
  }))}
  defaultInterval={5000}
  width="100%"
  height="100%"
  onStoryStart={handleStoryStart}
  onAllStoriesEnd={handleAllStoriesEnd}
  preloadCount={5}
  isPaused={isPaused}
/>

                </div>
              </div>

              <p className="text-center mt-4">{currentStory?.caption || ""}</p>

              <div className="flex w-full rounded-full border items-center ">
                <div className=" w-full">
                  <InputEmoji
                    value={newMessage}
                    onChange={handleChange}
                    placeholder="Reply to this story"
                    background="#8181A41F"
                    borderColor="#8181A41F"
                    borderRadius={0}
                    color="white"
                  />
                </div>
                <IoMdHeartEmpty size={30} />
                {newMessage ? (
                  <button
                    className="p-2 border-none text-white rounded-md"
                    disabled={isLoading || !newMessage}
                    onClick={handleSendComment}
                  >
                    {isLoading ? "Sending..." : <BsSend />}
                  </button>
                ) : null}
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
                  <AiOutlineArrowRight className="text-3xl text-red-700" />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {storySettings && (
        <Modals
          title={"Settings"}
          openModal={storySettings}
          modalSize="2xl"
          onClose={() => setStorySettings(false)}
        >
          <div className="w-full  mx-auto">
            Story Settings Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Possimus nisi velit hic ullam aliquam debitis assumenda! Eaque
            voluptas cumque quibusdam maxime architecto alias. Non cum at magni
            itaque? Sapiente ipsa ratione facere autem soluta itaque pariatur,
            iste eaque voluptates expedita, velit dignissimos
          </div>
        </Modals>
      )}
    </div>
  );
};

export default SingleStory;
