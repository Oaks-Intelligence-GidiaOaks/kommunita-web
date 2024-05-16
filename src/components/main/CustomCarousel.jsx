import { useState } from "react";

const CustomCarousel = ({
  media_urls,
  left,
  right,
  dotsinactive,
  dotsactive,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? media_urls.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === media_urls.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="post-media rounded-md w-full">
      {media_urls.map((media, index) => (
        <div
          key={index}
          className={`items-center justify-center rounded-sm relative flex-row ${
            currentIndex === index ? "flex" : "hidden"
          }`}
        >
          {["jpeg", "svg+xml", "jpg", "webp", "png", "octet-stream"].includes(
            media.media_type
          ) ? (
            <img
              className="w-full h-[194.35px] object-cover"
              alt="post media"
              src={media.media_url}
            />
          ) : media.media_type === "mp4" ? (
            <video className="h-[194.35px] w-full object-cover" controls>
              <source src={media.media_url} type="video/mp4" />
              Sorry, your browser doesn't support embedded videos.
            </video>
          ) : null}

          {media_urls.length > 1 && (
            <div className="carousel-buttons absolute bottom-10 bg-transparent z-50">
              <div className="flex justify-center items-center gap-5">
                <button aria-label="Previous" onClick={handlePrevious}>
                  <img src={left} alt="Previous" />
                </button>
                {media_urls.map((_, dotIndex) => (
                  <button
                    key={dotIndex}
                    aria-label={
                      currentIndex === dotIndex ? "Active Dot" : "Inactive Dot"
                    }
                    onClick={() => setCurrentIndex(dotIndex)}
                  >
                    <img
                      src={
                        currentIndex === dotIndex ? dotsactive : dotsinactive
                      }
                      alt={
                        currentIndex === dotIndex
                          ? "Active Dot"
                          : "Inactive Dot"
                      }
                    />
                  </button>
                ))}
                <button aria-label="Next" onClick={handleNext}>
                  <img src={right} alt="Next" />
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CustomCarousel;
