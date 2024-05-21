import { useState } from "react";
import Modals from "../modals/Modal";
import SurveyDisplay from "../polls/SurveyDisplay";

const Carousel = ({ surveys, left, right }) => {
  const [openModal, setOpenModal] = useState(false);
  const [surveyData, setSurveyData] = useState({});

  const closeModal = () => {
    setOpenModal(false);
  };

  const openSurvey = (row) => {
    setOpenModal(true);
    setSurveyData(row);
  };
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log(surveys);

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
            {surveys.length > 1 && (
              <div className="carousel-buttons absolute bottom-1 bg-transparent z-50 w-full">
                <div className="flex justify-between items-center gap-5">
                  <button aria-label="Previous" onClick={handlePrevious}>
                    <img src={left} alt="Previous" />
                  </button>
                  <div key={index} className="flex items-start pt-3">
                    <div className="flex items-start justify-start flex-col gap-2 w-auto">
                      {/* <p className="text-sm text-[#fff] flex-wrap">
                        Topic: {row.topic}
                      </p> */}
                      <p className="text-sm text-[#fff] flex flex-wrap">
                        Description: {row.description}
                      </p>
                      <button
                        className="text-xs border rounded-md p-2 text-[#fff]"
                        onClick={() => openSurvey(row)}
                      >
                        Take Survey
                      </button>
                    </div>
                  </div>
                  <button aria-label="Next" onClick={handleNext}>
                    <img src={right} alt="Next" />
                  </button>
                </div>
              </div>
            )}
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

export default Carousel;
