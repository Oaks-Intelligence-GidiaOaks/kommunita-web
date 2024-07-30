import { useState } from "react";
import PropTypes from "prop-types";

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
      {media_urls?.map((media, index) => (
        <div
          key={index}
          className={`items-center justify-center rounded-md relative flex-row ${
            currentIndex === index ? "flex" : "hidden"
          }`}
        >
          {["jpeg", "svg+xml", "jpg", "webp", "png", "octet-stream"].includes(
            media.media_type
          ) ? (
            <img
              className="w-full h-[250px] object-cover rounded-md border border-[#fff]"
              alt="post media"
              src={media.media_url}
            />
          ) : media.media_type === "mp4" ? (
            <video
              className="h-[250px] w-full object-cover rounded-md border border-[#fff]"
              controls
            >
              <source src={media.media_url} type="video/mp4" />
              Sorry, your browser does not support embedded videos.
            </video>
          ) : null}

          {media_urls.length > 1 && (
            <div className="carousel-buttons absolute bottom-10 bg-transparent z-50">
              <div className="flex justify-center items-center gap-5 bg-gray-800 bg-opacity-50 p-2 rounded-full">
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

CustomCarousel.propTypes = {
  media_urls: PropTypes.arrayOf(
    PropTypes.shape({
      media_type: PropTypes.string.isRequired,
      media_url: PropTypes.string.isRequired,
    })
  ).isRequired,
  left: PropTypes.string.isRequired,
  right: PropTypes.string.isRequired,
  dotsinactive: PropTypes.string.isRequired,
  dotsactive: PropTypes.string.isRequired,
};

export default CustomCarousel;
