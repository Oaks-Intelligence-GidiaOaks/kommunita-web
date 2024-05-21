import liveText from "../../assets/images/main/live.svg";
import liveBtn from "../../assets/images/main/live-btn.svg";
import ModalImage from "react-modal-image";
import { useGetStoriesQuery } from "../../service/stories.service";
import { ShimmerThumbnail } from "react-shimmer-effects";

function Story() {
  const { data: storyData, isLoading } = useGetStoriesQuery();

  return (
    <>
      {storyData?.data &&
        storyData?.data.length >
          0(
            // <div className="stories-container overflow-x-auto whitespace-nowrap w-[491px] flex mb-2">
            <div className="stories-container overflow-x-auto whitespace-nowrap w-full flex mb-2">
              <div className="stories flex justify-start gap-2 items-center">
                {/* <div className="go-live flex flex-col justify-center items-center">
          <p className="go-live-text pb-1">Go live</p>
          <button className="w-[26.753px] h-[26.753px]">
            <img src={liveBtn} alt="liveBtn" />
          </button>
        </div> */}

                {isLoading ? (
                  <ShimmerThumbnail width={92} height={110} />
                ) : storyData && storyData.data ? (
                  storyData.data.map(
                    (story, index) =>
                      // Check if story has media_url
                      story.media_url && (
                        <div key={index} className="story-cards relative">
                          {story?.media_url?.media_type.startsWith("image") ||
                          story?.media_url?.media_type === "jpeg" ||
                          story?.media_url?.media_type === "svg" ||
                          story?.media_url?.media_type === "jpg" ||
                          story?.media_url?.media_type === "webp" ||
                          story?.media_url?.media_type === "octet-stream" ||
                          story?.media_url?.media_type === "png" ? (
                            <ModalImage
                              small={story?.media_url.media_url}
                              large={story.media_url.media_url}
                              alt="story"
                              className="w-[91.276px] h-[110px]"
                            />
                          ) : (
                            <video className="w-[91.276px] h-[110px]" controls>
                              <source
                                src={story.media_url.media_url}
                                type={story.media_url.media_type}
                              />
                              Your browser does not support the video tag.
                            </video>
                          )}
                          <div className="absolute top-1 right-0 z-20 mr-1 -mt-3">
                            <img src={liveText} alt="live" />
                          </div>
                          <p className="story-name absolute bottom-0 left-0 z-20 ml-2 mb-1">
                            {story.user_id.display_name}
                          </p>
                        </div>
                      )
                  )
                ) : (
                  // <p>No stories available</p>
                  ""
                )}
              </div>
            </div>
          )}
    </>
  );
}

export default Story;
