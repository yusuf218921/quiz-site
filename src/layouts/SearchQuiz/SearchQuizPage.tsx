import React from "react";
import { SearchQuiz } from "./SearchQuiz";
import { useState, useEffect } from "react";
import QuizModel from "../../models/QuizModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import CategoryModel from "../../models/CategoryModel";
import { error } from "console";
import { Pagination } from "../Utils/Pagination";

const SearchQuizPage = () => {
  const [quiz, setQuiz] = useState<QuizModel[]>([]);
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [quizPerPage] = useState(5);
  const [totalAmountOfQuizzes, setTotalAmountOfQuizzes] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    const fetchQuizzes = async () => {
      const baseUrl: string =
        "http://localhost:29722/api/Quizzes/getallquizzeswithpage";

      const url: string = `${baseUrl}?page=${currentPage}&pageSize=${quizPerPage}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Bir Şeyler Ters Gitti");
      }
      const responseJson = await response.json();
      setTotalAmountOfQuizzes(9);
      setTotalPages(2);

      const quizzes: QuizModel[] = [];

      for (const key in responseJson) {
        quizzes.push({
          id: responseJson[key].quizID,
          categoryId: responseJson[key].categoryID,
          quizName: responseJson[key].quizName,
          quizImgUrl: responseJson[key].quizImgUrl,
          status: responseJson[key].status,
        });
      }

      setQuiz(quizzes);
      console.log(quiz);
      setIsLoading(false);
    };
    fetchQuizzes().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    const fetchCategory = async () => {
      const response = await fetch(
        "http://localhost:29722/api/Categories/getallcategories"
      );

      if (!response.ok) {
        throw new Error("Bir Şeyler Ters Gitti");
      }

      const responseJson = await response.json();

      const categories: CategoryModel[] = [];

      for (const key in responseJson) {
        categories.push({
          id: responseJson[key].categoryID,
          categoryName: responseJson[key].categoryName,
          status: responseJson[key].status,
        });
      }

      setCategories(categories);
      console.log(categories);
    };
    fetchCategory().catch((error: any) => {
      setHttpError(error.message);
    });
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  const indexOfLastQuiz: number = currentPage * quizPerPage;
  const indexOfFirstQuiz: number = indexOfLastQuiz - quizPerPage;
  let lastItem =
    quizPerPage * currentPage <= totalAmountOfQuizzes
      ? quizPerPage * currentPage
      : totalAmountOfQuizzes;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  return (
    <div>
      <div className="container">
        <div>
          <div className="row mt-5">
            <div className="col-6">
              <div className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-labelledby="Search"
                />
                <button className="btn btn-outline-success">Search</button>
              </div>
            </div>
            <div className="col-4">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Kategoriler
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  {categories.map((category) => (
                    <li>
                      <a className="dropdown-item" href="#" key={category.id}>
                        {category.categoryName}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <h5>Toplam Sonuç ({totalAmountOfQuizzes})</h5>
          </div>
          <p>
            {indexOfFirstQuiz + 1} ile {indexOfLastQuiz} arası
          </p>
          {quiz.map((quiz) => (
            <SearchQuiz quiz={quiz} key={quiz.id} />
          ))}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              paginate={paginate}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchQuizPage;
