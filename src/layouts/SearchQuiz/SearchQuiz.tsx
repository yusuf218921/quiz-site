import { useState, useEffect } from "react";
import { RecomendedQuizModel } from "../../models/RecomendedQuizModel";

export const SearchQuiz = () => {
  const [quiz, setQuiz] = useState<RecomendedQuizModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const baseUrl: string =
        "http://localhost:29722/api/Quizzes/getallquizzeswithpage";

      const url: string = `${baseUrl}?page=1&size=5`;
      const response = await fetch(
        "http://localhost:29722/api/Quizzes/getallquiz"
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

  return (
    <div className="card mt-3 shadow p-3 mb-3 bg-body rounded">
      <div className="row g-0">
        <div className="col-md-2">
          <div className="d-none d-lg-block">
            <img
              src={require("../../Images/BooksImages/book-luv2code-1000.png")}
              width="123"
              height="196"
              alt="Book"
            />
          </div>
          <div
            className="d-lg-none d-flex justify-content-center 
                        align-items-center"
          >
            <img
              src={require("../../Images/BooksImages/book-luv2code-1000.png")}
              width="123"
              height="196"
              alt="Book"
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="card-body">
            <h5 className="card-title">Quiz Adı</h5>
          </div>
        </div>
        <div className="col-md-4 d-flex justify-content-center align-items-center">
          <a className="btn btn-md main-color text-white" href="#">
            Başla
          </a>
        </div>
      </div>
    </div>
  );
};
