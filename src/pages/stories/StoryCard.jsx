/* eslint-disable react/prop-types */
import { RxDotsHorizontal } from "react-icons/rx";
import { placeholder_logo, profile_placeholder } from "../../assets/images";

const StoryCard = () => {
  return (
    <div className="w-[25rem] flex flex-col bg-black text-white rounded-lg p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div className="rounded-full border-4 animate-pulse bg-gradient-to-r from-gray-200 to-gray-300 bg-opacity-0 border-white w-[3rem] h-[3rem] overflow-hidden">
            <img
              src={profile_placeholder}
              alt="profile"
              className="w-full h-full object-cover animate-pulse bg-gradient-to-r from-gray-200 to-gray-300 bg-opacity-0"
            />
          </div>
          <div className="ml-4">
            <h4 className="font-semibold text-white animate-pulse bg-gradient-to-r from-gray-200 to-gray-300 text-opacity-0 rounded-full">Parsley Montana</h4>
            <p className="text-gray-400 text-sm animate-pulse bg-gradient-to-r from-gray-200 to-gray-300 text-opacity-0 rounded-full mt-1">
              @LarryBjaWhiz · <span className="ml-1">5h</span>
            </p>
          </div>
        </div>
        <RxDotsHorizontal className="text-white text-2xl" />
      </div>

      {/* Main Content */}
      <div className="relative">
        {/* Left Arrow */}
        {/* <div className="absolute left-0 top-1/2 transform -translate-y-1/2 cursor-pointer">
          <AiOutlineArrowLeft className="text-3xl text-white" />
        </div> */}
        {/* Story Image */}
        <div className="mx-auto w-[25rem] rounded-lg overflow-hidden">
          <img src={placeholder_logo} alt="story" className="w-full h-[30rem] animate-pulse bg-gradient-to-r from-gray-200 to-gray-300 text-opacity-0" />
        </div>
        {/* Right Arrow */}
        {/* <div className="absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer">
          <AiOutlineArrowRight className="text-3xl text-white" />
        </div> */}
      </div>

      {/* Caption */}
      <p className="text-center mt-4 animate-pulse bg-gradient-to-r from-gray-200 to-gray-300 text-opacity-0 rounded-full h-2"></p>

      {/* Reply Input */}
      <div className="mt-4">
        <input
          type="text"
          placeholder="Reply this story"
          className="w-full py-2 px-4 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-white"
        />
      </div>
    </div>
  );
};

export default StoryCard;
