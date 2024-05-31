import React from "react";

const GaleryBox = ({ media }) => {
  return (
    <div className="w-[300px] h-[284px] rounded object-cover">
      {/* <img
        className="object-cover w-[300px] h-[284px]"
        src={img}
        // src="https://images.pexels.com/photos/19175643/pexels-photo-19175643/free-photo-of-woman-in-coat-standing-by-wall-in-tunnel.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        // width={300}
        // height={284}
        alt="personal medi a post"
      /> */}
      {media.mimetype.startsWith("image") ? (
        <img
          src={media.downloadUrl}
          className="object-cover w-[285px] h-[284px] rounded-lg"
          alt="post image"
        />
      ) : (
        <div className="flex items-center justify-center w-[285px] h-[284px] border-[1px] border-black rounded-lg bg-white">
          <div className="flex items-center justify-center rounded-full h-[50px] w-[50px] bg-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
              />
            </svg>
          </div>
        </div>
        // <video
        //   className="object-cover w-[300px] h-[284px]"
        //   controls
        //   width="100%"
        // >
        //   <source src={media.downlaodUrl} type="video/mp4" />
        //   Sorry, your browser doesn't support embedded videos.
        // </video>
      )}
    </div>
  );
};

export default GaleryBox;
