import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import avatar4 from "../../assets/images/sidebar/avatar4.svg";
import verified from "../../assets/images/main/verified.svg";
import { useGetUserProfiileQuery } from "../../service/user.service";
import getTimeAgoString from "../../utils/getTimeAgoString";
import { FcLeft, FcRight } from "react-icons/fc";
import { useSubmitSurveyMutation } from "../../service/survey.service";
import { BeatLoader } from "react-spinners";
import rtkMutation from "../../utils/rtkMutation";
import { showAlert } from "../../static/alert";

const SurveyDisplay = ({ data }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const { data: user } = useGetUserProfiileQuery();
  const { questions } = data;

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const [answers, setAnswers] = useState({});

  const handleAnswer = (answer, questionId) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const [submitSurvey, { error, isSuccess, isLoading }] =
    useSubmitSurveyMutation({
      provideTag: ["Survey"],
    });

  const handleSubmit = async () => {
    // Convert answers object into an array
    const answersArray = Object.values(answers);

    // Check if there are any unanswered questions
    if (answersArray.some((answer) => !answer)) {
      showAlert("Oops", "Please answer all questions", "error");
      return;
    }

    const response = {
      survey_id: data._id,
      answers: answersArray,
    };

    await rtkMutation(submitSurvey, response);

    // Reset answers to an empty object after submission
    setAnswers({});
  };

  useEffect(() => {
    if (isSuccess) {
      showAlert("", "Survey completed Successfully!", "success");
    } else if (error) {
      showAlert("Oops", error.data.message || "An error occurred", "error");
    }
  }, [isSuccess, error]);

  // Determine if submit button should be disabled
  const isSubmitDisabled =
    questions.some((question) => !answers[question._id]) ||
    Object.keys(answers).length !== questions.length;

  const showPreviousButton = questions.length > 1 && currentStep > 0;

  return (
    <>
      <div className="flex items-center justify-center rounded-lg mb-5">
        <div className="bg-white rounded-lg w-full p-10">
          <div className="flex items-center justify-between mb-11">
            <div className="flex gap-3 items-center">
              <div className="rounded-full border-red-100 border">
                <img src={avatar4} className="w-[40px] h-[40px]" alt="" />
              </div>
              <div>
                <div className="flex gap-2">
                  <p className="post-name pb-1">{user?.data?.display_name}</p>{" "}
                  {user?.data?.isEmailVerified && (
                    <span>
                      <img src={verified} alt="" className="pb-1" />
                    </span>
                  )}
                </div>
                <p className="username">
                  @{user?.data?.username}{" "}
                  <span className="post-time ml-2 font-bold">
                    {getTimeAgoString(data?.createdAt)}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Survey Steps */}
          <h2 className="font-semibold text-md mb-5">
            {currentStep + 1}: {questions[currentStep]?.question_text}
          </h2>

          {/* Render current step question */}
          {questions[currentStep] && (
            <div className="mb-5">
              {/* Render question based on answer type */}
              {renderQuestion(
                questions[currentStep],
                handleAnswer,
                currentStep
              )}
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex justify-between">
            {showPreviousButton && (
              <button
                onClick={handlePreviousStep}
                className="bg-gray-200 rounded-lg p-2 text-gray-600 text-sm flex items-center gap-2"
              >
                <FcLeft />
                Previous
              </button>
            )}
            {currentStep < questions.length - 1 ? (
              <button
                onClick={handleNextStep}
                className="bg-gray-200 rounded-md p-2 text-gray-600 text-sm flex items-center gap-2"
              >
                Next
                <FcRight />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className={`bg-[#34b53a] rounded-md p-2 text-white text-sm `}
                // disabled={isSubmitDisabled}
              >
                {isLoading ? (
                  <BeatLoader color="#ffffff" loading={true} />
                ) : (
                  "Submit"
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// Function to render input fields based on answer type
// Function to render input fields based on answer type
const renderQuestion = (question, handleAnswer, index) => {
  switch (question.answer_type) {
    case "single_choice":
      return (
        <>
          {question.answer_options.map((option, optionIndex) => (
            <div
              key={optionIndex}
              className="flex items-center mb-2 gap-4 flex-1 p-2 bg-gray-100 px-4 text-sm"
            >
              <input
                type="radio"
                name={`single_choice_${index}`}
                id={option}
                onChange={() =>
                  handleAnswer(
                    {
                      question_id: question._id,
                      answer_type: "single_choice",
                      selected_options: [option],
                    },
                    index
                  )
                }
              />
              <p>{option}</p>
            </div>
          ))}
        </>
      );
    case "true_or_false":
      return (
        <>
          <div className="flex items-center mb-2 gap-4 flex-1 p-2 bg-gray-100 px-4 text-sm">
            <input
              type="radio"
              name={`true_or_false_${index}`}
              id="true"
              onChange={() =>
                handleAnswer(
                  {
                    question_id: question._id,
                    answer_type: "true_or_false",
                    true_or_false: true,
                  },
                  index
                )
              }
            />
            <p>True</p>
          </div>
          <div className="flex items-center mb-2 gap-4 flex-1 p-2 bg-gray-100 px-4 text-sm">
            <input
              type="radio"
              name={`true_or_false_${index}`}
              id="false"
              onChange={() =>
                handleAnswer(
                  {
                    question_id: question._id,
                    answer_type: "true_or_false",
                    true_or_false: false,
                  },
                  index
                )
              }
            />
            <p>False</p>
          </div>
        </>
      );
    case "text":
      return (
        <div className=" mb-2 gap-4 p-2 bg-gray-100 text-sm">
          <input
            type="textarea"
            className="bg-transparent w-full focus:ring-0 focus:outline-none border-none text-sm"
            placeholder="Enter Answer here..."
            name=""
            id=""
            onChange={(e) =>
              handleAnswer(
                {
                  question_id: question._id,
                  answer_type: "text",
                  text: e.target.value,
                },
                index
              )
            }
          />
        </div>
      );
    case "time":
      return (
        <div className=" mb-2 gap-4 p-2 bg-gray-100 text-sm">
          <input
            type="time"
            className="bg-transparent w-full focus:ring-0 focus:outline-none border-none text-sm"
            placeholder="Enter Answer here..."
            name=""
            id=""
            onChange={(e) =>
              handleAnswer(
                {
                  question_id: question._id,
                  answer_type: "time",
                  time: e.target.value,
                },
                index
              )
            }
          />
        </div>
      );
    case "date":
      return (
        <div className=" mb-2 gap-4 p-2 bg-gray-100 text-sm">
          <input
            type="date"
            className="bg-transparent w-full focus:ring-0 focus:outline-none border-none text-sm"
            placeholder="Enter Answer here..."
            name=""
            id=""
            onChange={(e) =>
              handleAnswer(
                {
                  question_id: question._id,
                  answer_type: "date",
                  date: e.target.value,
                },
                index
              )
            }
          />
        </div>
      );
    case "multiple_choice":
      return (
        <>
          {question.answer_options.map((option, optionIndex) => (
            <div
              key={optionIndex}
              className="flex items-center mb-2 gap-4 flex-1 p-2 bg-gray-100 px-4 text-sm"
            >
              <input
                type="checkbox"
                name={option}
                id={option}
                onChange={() =>
                  handleAnswer(
                    {
                      question_id: question._id,
                      answer_type: "multiple_choice",
                      selected_options: [option],
                    },
                    index
                  )
                }
              />
              <p>{option}</p>
            </div>
          ))}
        </>
      );
    default:
      return null;
  }
};

SurveyDisplay.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    description: PropTypes.string,
    createdAt: PropTypes.string,
    questions: PropTypes.arrayOf(
      PropTypes.shape({
        question_text: PropTypes.string.isRequired,
        answer_type: PropTypes.string.isRequired,
        answer_options: PropTypes.arrayOf(PropTypes.string),
      })
    ),
  }),
};

SurveyDisplay.defaultProps = {
  data: {
    description: "Enter Survey Description",
    createdAt: "",
    questions: [],
  },
};

export default SurveyDisplay;
