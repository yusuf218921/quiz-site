import { useEffect, useState } from "react";
import { Navbar } from "../NavbarAndFooter/Navbar";
import { useNavigate } from "react-router-dom";
import QuizModel from "../../models/QuizModel";
import QuestionModel from "../../models/QuestionModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import "./QuizPage.css";

const QuizPage = () => {
  const [finish, setFinish] = useState(false);
  const [questions, setQuestions] = useState<QuestionModel[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [httpError, setHttpError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const quizId = window.location.pathname.split("/")[2];
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const fetchQuestion = async () => {
      const response = await fetch(
        `http://localhost:29722/api/Questions/getquestiondtos?quizId=${quizId}`
      );

      if (!response.ok) {
        throw new Error("bir şeyler ters gitti");
      }
      const responseJson = await response.json();
      const questions: QuestionModel[] = [];
      for (const key in responseJson) {
        questions.push({
          id: responseJson[key].questionID,
          questionText: responseJson[key].questionText,
          answerOptions: responseJson[key].options,
          time: responseJson[key].time,
        });
      }
      setQuestions(questions);
      setIsLoading(false);
      console.log(questions[currentQuestion].answerOptions[0]);
    };
    fetchQuestion().catch((error: any) => {
      setHttpError(error.message);
      setIsLoading(false);
    });
  }, []);

  const handleAnswerOptionClick = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
      setFinish(true);
    }
  };

  if (isLoading) {
    return (
      <div className="container m-5">
        <SpinnerLoading />
      </div>
    );
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  return (
    <div className="quiz-page">
      <Navbar />
      <div className="body-quiz">
        <div className="app">
          {showScore ? (
            <div className="score-section">
              Skorun {questions.length} üzerinden {score}
              <div>
                <a
                  type="button"
                  href="/"
                  className="btn btn-dark btn-lg text-white"
                >
                  Ana Sayfaya Dön
                </a>
              </div>
            </div>
          ) : (
            <>
              <div className="question-section">
                <div className="question-count">
                  <span>Soru {currentQuestion + 1}</span>/{questions.length}
                </div>
                <div className="question-text">
                  {questions[currentQuestion].questionText}
                </div>
              </div>
              <div className="answer-section">
                {questions[currentQuestion].answerOptions.map(
                  (answerOption) => (
                    <button
                      className="button-answer"
                      onClick={() =>
                        handleAnswerOptionClick(answerOption.isCorrect)
                      }
                    >
                      {answerOption.optionText}
                    </button>
                  )
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
