/* eslint-disable react/prop-types */
import { RxDotsHorizontal } from "react-icons/rx";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { placeholder_logo } from "../../assets/images";

const StoryCard = ({image}) => {
  return (
    <div className="w-[30rem] flex flex-col bg-black text-white rounded-lg p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div className="rounded-full border-4 border-white w-[3rem] h-[3rem] overflow-hidden">
            <img
              src={image}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="ml-4">
            <h4 className="font-semibold text-white">Parsley Montana</h4>
            <p className="text-gray-400 text-sm">
              @LarryBjaWhiz · <span className="ml-1">5h</span>
            </p>
          </div>
        </div>
        <RxDotsHorizontal className="text-white text-2xl" />
      </div>

      {/* Main Content */}
      <div className="relative">
        {/* Left Arrow */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 cursor-pointer">
          <AiOutlineArrowLeft className="text-3xl text-white" />
        </div>
        {/* Story Image */}
        <div className="mx-auto w-full rounded-lg overflow-hidden">
          <img src={placeholder_logo} alt="story" className="w-full h-auto" />
        </div>
        {/* Right Arrow */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer">
          <AiOutlineArrowRight className="text-3xl text-white" />
        </div>
      </div>

      {/* Caption */}
      <p className="text-center mt-4">Happy to be here today.</p>

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


// import Slider from "react-slick";
// import { RxDotsHorizontal } from "react-icons/rx";
// import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
// import { placeholder_logo, profile_placeholder } from "../../assets/images";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";


// const StoryCard = () => {
//   // Slider settings
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     nextArrow: <AiOutlineArrowRight className="text-3xl text-white" />,
//     prevArrow: <AiOutlineArrowLeft className="text-3xl text-white" />,
//   };

//   // Example images for the slider
//   const storyImages = [
//     { src: placeholder_logo, alt: "Image 1" },
//     { src: profile_placeholder, alt: "Image 2" },
//     { src: placeholder_logo, alt: "Image 3" },
//   ];

//   return (
//     <div className="w-[30rem] flex flex-col bg-black text-white rounded-lg p-4">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-4">
//         <div className="flex items-center">
//           <div className="rounded-full border-4 border-white w-[3rem] h-[3rem] overflow-hidden">
//             <img
//               src={profile_placeholder}
//               alt="profile"
//               className="w-full h-full object-cover"
//             />
//           </div>
//           <div className="ml-4">
//             <h4 className="font-semibold text-white">Parsley Montana</h4>
//             <p className="text-gray-400 text-sm">
//               @LarryBjaWhiz · <span className="ml-1">5h</span>
//             </p>
//           </div>
//         </div>
//         <RxDotsHorizontal className="text-white text-2xl" />
//       </div>

//       {/* Slider */}
//       <Slider {...settings}>
//         {storyImages.map((image, index) => (
//           <div key={index} className="w-full rounded-lg overflow-hidden">
//             <img src={image.src} alt={image.alt} className="w-full h-auto" />
//           </div>
//         ))}
//       </Slider>

//       {/* Caption */}
//       <p className="text-center mt-4">Happy to be here today.</p>

//       {/* Reply Input */}
//       <div className="mt-4">
//         <input
//           type="text"
//           placeholder="Reply this story"
//           className="w-full py-2 px-4 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-white"
//         />
//       </div>
//     </div>
//   );
// };

// export default StoryCard;
