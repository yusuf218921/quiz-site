import React from "react";
import { SearchQuiz } from "./SearchQuiz";
import { useState, useEffect } from "react";
import QuizModel from "../../models/QuizModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import CategoryModel from "../../models/CategoryModel";
import { error } from "console";
import { Pagination } from "../Utils/Pagination";
import { Navbar } from "../NavbarAndFooter/Navbar";

const SearchQuizPage = () => {
  const [quiz, setQuiz] = useState<QuizModel[]>([]);
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [quizPerPage] = useState(5);
  const [totalAmountOfQuizzes, setTotalAmountOfQuizzes] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchUrl, setSearchUrl] = useState("");
  const [categorySelection, setCategorySelection] = useState(0);
  useEffect(() => {
    const fetchQuizzes = async () => {
      const baseUrl: string = "http://localhost:29722/api/Quizzes";

      let url: string = "";

      if (searchUrl === "") {
        url = `${baseUrl}/getallquizzeswithpage?page=${currentPage}&pageSize=${quizPerPage}`;
      } else {
        url = baseUrl + searchUrl;
      }

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
  }, [currentPage, searchUrl]);

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

  const categoryField = (categoryId: number) => {
    if (categoryId !== 0) {
      setCategorySelection(categoryId);
      setSearchUrl(
        `/getquizwithpagebycategoryid?categoryId=${categoryId}&page=${currentPage}&pageSize=${quizPerPage}`
      );
    } else {
      setCategorySelection(0);
      setSearchUrl("");
    }
  };

  const indexOfLastQuiz: number = currentPage * quizPerPage;
  const indexOfFirstQuiz: number = indexOfLastQuiz - quizPerPage;
  let lastItem =
    quizPerPage * currentPage <= totalAmountOfQuizzes
      ? quizPerPage * currentPage
      : totalAmountOfQuizzes;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  return (
    <div>
      <Navbar />
      <div>
        <div className="container">
          <div>
            <div className="row mt-5">
              <div className="col-12">
                <nav className="navbar navbar-dark bg-dark">
                  <a
                    className="navbar-brand ms-2"
                    onClick={() => categoryField(0)}
                    href="#"
                  >
                    Hepsi
                  </a>
                  {categories.map((c) => (
                    <a
                      className="navbar-brand ms-2"
                      onClick={() => categoryField(c.id)}
                      href="#"
                      key={c.id}
                    >
                      {c.categoryName}
                    </a>
                  ))}
                </nav>
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
    </div>
  );
};

export default SearchQuizPage;
