import { useEffect, useState } from "react";
import RecomendedQuiz from "./RecomendedQuiz";
import { RecomendedQuizModel } from "../../../models/RecomendedQuizModel";
const Carousel = () => {
  const [quiz, setQuiz] = useState<RecomendedQuizModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const response = await fetch(
        "http://localhost:29722/api/RecomendedQuizzes/getrecomendedquizzes"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const responseJson = await response.json();

      const quizzes: RecomendedQuizModel[] = [];

      for (const key in responseJson) {
        quizzes.push({
          id: responseJson[key].recomendedQuizID,
          quizName: responseJson[key].quizName,
          quizImgUrl: responseJson[key].quizImgUrl,
        });
      }

      setQuiz(quizzes);
      setIsLoading(false);
    };
    fetchQuizzes().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="container m-5">
        <p>Yükleniyor...</p>
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
    <div className="container mt-5" style={{ height: 550 }}>
      <div className="homepage-carousel-title">
        <h3>Önerilen Quizlerimiz</h3>
      </div>
      <div
        id="carouselExampleControls"
        className="carousel carousel-dark slide mt-5 
              d-none d-lg-block"
        data-bs-interval="false"
      >
        {/* Desktop */}
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="row d-flex justify-content-center align-items-center">
              {quiz.slice(0, 3).map((quiz) => (
                <RecomendedQuiz quiz={quiz} key={quiz.id} />
              ))}
            </div>
          </div>
          <div className="carousel-item">
            <div className="row d-flex justify-content-center align-items-center">
              {quiz.slice(3, 6).map((quiz) => (
                <RecomendedQuiz quiz={quiz} key={quiz.id} />
              ))}
            </div>
          </div>
          <div className="carousel-item">
            <div className="row d-flex justify-content-center align-items-center">
              {quiz.slice(6, 9).map((quiz) => (
                <RecomendedQuiz quiz={quiz} key={quiz.id} />
              ))}
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      {/* Mobile */}
      <div className="d-lg-none mt-3">
        <div className="row d-flex justify-content-center align-items-center">
          <RecomendedQuiz quiz={quiz[7]} key={quiz[7].id} />
        </div>
      </div>
    </div>
  );
};

export default Carousel;
