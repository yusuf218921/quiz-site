import { useEffect, useState } from "react";
import RecomendedQuiz from "./RecomendedQuiz";
import { RecomendedQuizModel } from "../../../models/RecomendedQuizModel";
import { error } from "console";

const Carousel = () => {
  const [quiz, setQuiz] = useState<RecomendedQuizModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  /*
  useEffect(() => {
    const fetchQuizzes =async () => {
      const response = await fetch("")
    }
    fetchBooks().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message)
    })
  }, [])

  */

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
              <RecomendedQuiz />
              <RecomendedQuiz />
              <RecomendedQuiz />
            </div>
          </div>
          <div className="carousel-item">
            <div className="row d-flex justify-content-center align-items-center">
              <RecomendedQuiz />
              <RecomendedQuiz />
              <RecomendedQuiz />
            </div>
          </div>
          <div className="carousel-item">
            <div className="row d-flex justify-content-center align-items-center">
              <RecomendedQuiz />
              <RecomendedQuiz />
              <RecomendedQuiz />
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
          <RecomendedQuiz />
          <RecomendedQuiz />
          <RecomendedQuiz />
        </div>
      </div>
    </div>
  );
};

export default Carousel;
