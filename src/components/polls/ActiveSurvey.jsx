import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSubmitSurveyMutation } from "../../service/survey.service";
import { BeatLoader } from "react-spinners";
import rtkMutation from "../../utils/rtkMutation";
import { showAlert } from "../../static/alert";
import { useGetSurveyFeedsQuery } from "../../service/survey.service";
import "./style.css";

const ActiveSurvey = ({ data }) => {
  const { data: surveyData, refetch } = useGetSurveyFeedsQuery();
  console.log(surveyData, "survey");

  const [answers, setAnswers] = useState({});
  const { questions } = data || [];

  const [currentPage, setCurrentPage] = useState(0);
  const questionsPerPage = 2;

  const [submitSurvey, { error, isSuccess, isLoading }] =
    useSubmitSurveyMutation({
      provideTag: ["Survey"]
    });

  const handleAnswer = (answer, questionId) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer
    }));
  };

  const handleSubmit = async () => {
    const answersArray = Object.entries(answers).map(
      ([questionId, answer]) => ({
        question_id: questionId,
        ...answer
      })
    );

    if (answersArray.length < questions.length) {
      showAlert("Oops", "Please answer all questions", "error");
      return;
    }

    const response = {
      survey_id: data._id,
      answers: answersArray
    };

    console.log(response);

    await rtkMutation(submitSurvey, response);

    setAnswers({});
  };

  useEffect(() => {
    if (isSuccess) {
      showAlert("", "Survey completed successfully!", "success");
      refetch();
    } else if (error) {
      showAlert("Oops", error.data.message || "An error occurred", "error");
    }
  }, [isSuccess, error, refetch]);

  const paginatedQuestions = questions?.slice(
    currentPage * questionsPerPage,
    currentPage * questionsPerPage + questionsPerPage
  );

  const handleNext = () => {
    if (currentPage < Math.ceil(questions?.length / questionsPerPage) - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const renderQuestion = (question, handleAnswer, index) => {
    const selectedAnswer = answers[question._id] || {};

    switch (question?.answer_type) {
      case "single_choice":
        return (
          <>
            {question.answer_options.map((option, optionIndex) => (
              <div
                key={optionIndex}
                className="flex items-center mb-2 gap-4 p-2 bg-gray-100 px-4 text-sm cursor-pointer hover:bg-gray-200 transition-all"
              >
                <input
                  type="radio"
                  name={`single_choice_${index}`}
                  id={option}
                  checked={selectedAnswer.selected_options?.[0] === option}
                  onChange={() =>
                    handleAnswer(
                      {
                        answer_type: "single_choice",
                        selected_options: [option]
                      },
                      question._id
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
            <div className="flex items-center mb-2 gap-4 p-2 bg-gray-100 px-4 text-sm cursor-pointer hover:bg-gray-200 transition-all">
              <input
                type="radio"
                name={`true_or_false_${index}`}
                id="true"
                checked={selectedAnswer.true_or_false === true}
                onChange={() =>
                  handleAnswer(
                    {
                      answer_type: "true_or_false",
                      true_or_false: true
                    },
                    question._id
                  )
                }
              />
              <p>True</p>
            </div>
            <div className="flex items-center mb-2 gap-4 p-2 bg-gray-100 px-4 text-sm cursor-pointer hover:bg-gray-200 transition-all">
              <input
                type="radio"
                name={`true_or_false_${index}`}
                id="false"
                checked={selectedAnswer.true_or_false === false}
                onChange={() =>
                  handleAnswer(
                    {
                      answer_type: "true_or_false",
                      true_or_false: false
                    },
                    question._id
                  )
                }
              />
              <p>False</p>
            </div>
          </>
        );
      case "text":
        return (
          <div className="mb-2 gap-4 p-2 bg-gray-100 border shadow  border-['#E0E4EC'] rounded-[8px] text-sm">
            <input
              type="textarea"
              className="bg-transparent w-full focus:ring-0 focus:outline-none border-none text-sm"
              placeholder="Enter your answer here..."
              value={selectedAnswer.text || ""}
              onChange={(e) =>
                handleAnswer(
                  {
                    answer_type: "text",
                    text: e.target.value
                  },
                  question._id
                )
              }
            />
          </div>
        );
      case "time":
        return (
          <div className="mb-2 gap-4 p-2 bg-gray-100 text-sm">
            <input
              type="time"
              className="bg-transparent w-full focus:ring-0 focus:outline-none border-none text-sm"
              value={selectedAnswer.time || ""}
              onChange={(e) =>
                handleAnswer(
                  {
                    answer_type: "time",
                    time: e.target.value
                  },
                  question._id
                )
              }
            />
          </div>
        );
      case "date":
        return (
          <div className="mb-2 gap-4 p-2 bg-gray-100 text-sm">
            <input
              type="date"
              className="bg-transparent w-full focus:ring-0 focus:outline-none border-none text-sm"
              value={selectedAnswer.date || ""}
              onChange={(e) =>
                handleAnswer(
                  {
                    answer_type: "date",
                    date: e.target.value
                  },
                  question._id
                )
              }
            />
          </div>
        );
      case "multiple_choice": {
        const selectedOptions = selectedAnswer.selected_options || [];
        return (
          <>
            {question.answer_options.map((option, optionIndex) => (
              <div
                key={optionIndex}
                className="flex items-center mb-2 gap-4 p-2 bg-gray-100 px-4 text-sm cursor-pointer hover:bg-gray-200 transition-all"
              >
                <input
                  type="checkbox"
                  name={option}
                  id={option}
                  checked={selectedOptions.includes(option)}
                  onChange={(e) => {
                    const updatedOptions = e.target.checked
                      ? [...selectedOptions, option]
                      : selectedOptions.filter((o) => o !== option);

                    handleAnswer(
                      {
                        answer_type: "multiple_choice",
                        selected_options: updatedOptions
                      },
                      question._id
                    );
                  }}
                />
                <p>{option}</p>
              </div>
            ))}
          </>
        );
      }

      default:
        return null;
    }
  };

  // if (!data) {
  //   return <p>no data</p>;
  // }

  return (
    <div className="flex items-center justify-center rounded-lg mb-5 z-50">
      <div className="bg-white rounded-lg w-full p-10">
        <h2 className="pb-10 survey-question-header">Survey Questions</h2>
        {paginatedQuestions?.map((question, index) => (
          <div key={question._id} className="mb-8 font-Inter">
            <h3 className="font-semibold text-md mb-2 survey-question-text">
              {currentPage * questionsPerPage + index + 1}.{" "}
              {question?.question_text}
            </h3>
            {renderQuestion(question, handleAnswer, index)}
          </div>
        ))}
        <div className="flex justify-between mt-8">
          {currentPage > 0 && (
            <button
              onClick={handlePrevious}
              className="bg-[#3D7100] hover:bg-[#2e5900] rounded-md p-3 text-white text-sm transition-all"
            >
              Previous
            </button>
          )}
          {currentPage < Math.ceil(questions?.length / questionsPerPage) - 1 ? (
            <button
              onClick={handleNext}
              className="bg-[#3D7100] hover:bg-[#2e5900] rounded-md p-3 text-white text-sm transition-all ml-auto"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className={`bg-[#3D7100] hover:bg-[#2e5900] rounded-md p-3 w-auto text-white text-sm transition-all ml-auto`}
              disabled={
                isLoading || Object.keys(answers).length < questions?.length
              }
            >
              {isLoading ? (
                <BeatLoader color="#ffffff" loading={isLoading} />
              ) : (
                "Submit"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

ActiveSurvey.propTypes = {
  data: PropTypes.object.isRequired
};

export default ActiveSurvey;
