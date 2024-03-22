import React from "react";
import PostHeader from "./PostHeader";
import ProfileReactions from "./ProfileReactions";
import MainComment from "./comments/MainComment";

const MediaContainer = () => {
  return (
    <div className="max-w-[491px] bg-white p-8 mb-5 rounded-lg">
      <PostHeader />
      <div className="mt-5 mb-5 relative">
        <iframe
          className="w-full h-[200px]"
          src="https://www.youtube.com/embed/EQJsr2OvVx4"
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen
          title="video"
        />{" "}
      </div>
      <p className="text-sm text-primary-dark-gray">
        Lorem ipsum dolor sit amet consectetur. Habitant pellentesque elementum
        aliquam hendrerit netus. Vestibulum consectetur tortor at nisi sit. Mi
        laoreet elementum ut pellentesque interdum diam viverra sit.
      </p>
      <div className="flex items-center gap-2 justify-end mt-2">
        <ProfileReactions
          icon={
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.2826 14.3492H6.41404V11.9886L3.2666 15.1361L6.41404 18.2835V15.9229H15.8563V11.2018H14.2826M6.41404 6.48062H14.2826V8.8412L17.4301 5.69376L14.2826 2.54633V4.9069H4.84032V9.62806H6.41404V6.48062Z"
                fill="#838383"
              />
            </svg>
          }
          data={"12k"}
        />
        <ProfileReactions
          icon={
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.669 4.492H7.27335C6.73673 4.492 6.22208 4.67435 5.84263 4.99893C5.46318 5.32351 5.25001 5.76373 5.25001 6.22275V15.4534C5.24953 15.5551 5.28047 15.655 5.33969 15.7432C5.39891 15.8313 5.48431 15.9045 5.58723 15.9553C5.68976 16.0059 5.80606 16.0326 5.92446 16.0326C6.04285 16.0326 6.15915 16.0059 6.26168 15.9553L9.97115 14.1207L13.6806 15.9553C13.7834 16.0051 13.8997 16.031 14.0179 16.0303C14.136 16.031 14.2523 16.0051 14.3551 15.9553C14.458 15.9045 14.5434 15.8313 14.6026 15.7432C14.6618 15.655 14.6928 15.5551 14.6923 15.4534V6.22275C14.6923 5.76373 14.4791 5.32351 14.0997 4.99893C13.7202 4.67435 13.2056 4.492 12.669 4.492ZM13.3434 14.4553L10.3084 12.9554C10.2058 12.9047 10.0895 12.8781 9.97115 12.8781C9.85276 12.8781 9.73646 12.9047 9.63393 12.9554L6.5989 14.4553V6.22275C6.5989 6.06974 6.66996 5.923 6.79645 5.81481C6.92293 5.70662 7.09448 5.64583 7.27335 5.64583H12.669C12.8478 5.64583 13.0194 5.70662 13.1459 5.81481C13.2723 5.923 13.3434 6.06974 13.3434 6.22275V14.4553Z"
                fill="#838383"
              />
            </svg>
          }
          data={"234"}
        />
      </div>
      <MainComment />
    </div>
  );
};

export default MediaContainer;
