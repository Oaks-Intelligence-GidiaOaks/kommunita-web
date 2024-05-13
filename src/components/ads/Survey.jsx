import PropTypes from "prop-types";
import Glider from "react-glider";
import Modals from "../modals/Modal";
import { useState } from "react";
import SurveyDisplay from "../polls/SurveyDisplay";

const Survey = ({ feeds }) => {
  const [openModal, setOpenModal] = useState(false);
  const [surveyData, setSurveyData] = useState({});
  const closeModal = () => {
    setOpenModal(false);
  };

  const openSurvey = (row) => {
    setOpenModal(true);
    setSurveyData(row);
    console.log(row);
  };

  return (
    <>
      {feeds && feeds.length > 0 && (
        <div className="category-section mt-4 mb-5">
          <div className="p-4">
            <div className="flex justify-start">
              <p className="category">Surveys</p>
            </div>

            <div className="flex justify-center flex-col gap-3 pt-4 pb-5">
              <Glider
                draggable
                // hasArrows
                hasDots
                slidesToShow={1}
                slidesToScroll={1}
              >
                {feeds.map((row, index) => (
                  <div key={index} className="border shadow-lg rounded-md">
                    <div className="p-3 flex items-start justify-start flex-col gap-3">
                      <p className="text-sm font-semibold">
                        Topic: {row.topic}
                      </p>
                      <p className="text-sm text-gray-400 flex flex-wrap">
                        Description: {row.description}
                      </p>
                      <button
                        className="text-sm border rounded-md p-2"
                        onClick={() => openSurvey(row)}
                      >
                        Take Survey
                      </button>
                    </div>
                  </div>
                ))}
              </Glider>
            </div>
          </div>
        </div>
      )}

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

Survey.propTypes = {
  feeds: PropTypes.arrayOf(PropTypes.object),
};

export default Survey;
