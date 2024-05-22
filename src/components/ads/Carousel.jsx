import { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import Modals from "../modals/Modal";
import SurveyDisplay from "../polls/SurveyDisplay";

const Carousel = ({ surveys, left, right }) => {
  const [openModal, setOpenModal] = useState(false);
  const [surveyData, setSurveyData] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const closeModal = () => {
    setOpenModal(false);
  };

  const openSurvey = (row) => {
    setOpenModal(true);
    setSurveyData(row);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? surveys.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === surveys.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
      <div className="post-media rounded-md w-full flex justify-start p-3">
        {surveys.map((row, index) => (
          <div
            key={index}
            className={`items-center justify-start rounded-sm relative flex-row w-full ${
              currentIndex === index ? "flex" : "hidden"
            }`}
          >
            <div className="carousel-buttons absolute bottom-1 bg-transparent z-50 w-full h-auto">
              <div className="flex flex-col justify-start items-start gap-3">
                <div key={index} className="flex items-start pt-3">
                  <div className="flex items-start justify-start flex-col gap-2 w-auto">
                    {/* <p className="text-sm text-[#fff] flex-wrap">
                      Topic: {row.topic}
                    </p> */}
                    <p className="text-sm text-[#fff] flex flex-wrap">
                      Description: {row.description}
                    </p>
                    <button
                      className="text-xs border rounded-md p-1 text-[#fff]"
                      onClick={() => openSurvey(row)}
                    >
                      Take Survey
                    </button>
                  </div>
                </div>
                {surveys.length > 1 && (
                  <div className="flex w-full justify-between">
                    <button aria-label="Previous" onClick={handlePrevious}>
                      <img src={left} alt="Previous" />
                    </button>
                    <button aria-label="Next" onClick={handleNext}>
                      <img src={right} alt="Next" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modals openModal={openModal} modalSize="4xl" onClose={closeModal}>
        <div className="border shadow-lg rounded-md">
          {surveyData ? (
            <SurveyDisplay data={surveyData} closeModal={closeModal} />
          ) : (
            ""
          )}
        </div>
      </Modals>
    </>
  );
};

// Add prop types validation
Carousel.propTypes = {
  surveys: PropTypes.arrayOf(
    PropTypes.shape({
      topic: PropTypes.string,
      description: PropTypes.string,
    })
  ).isRequired,
  left: PropTypes.string.isRequired,
  right: PropTypes.string.isRequired,
};

export default Carousel;
