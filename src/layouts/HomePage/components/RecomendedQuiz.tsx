const RecomendedQuiz = () => {
  return (
    <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
      <div className="text-center">
        <img
          src={require("./../../../Images/BooksImages/book-luv2code-1000.png")}
          width="151"
          height="233"
        />
        <h6 className="mt-2">Quiz Adı</h6>
        <a type="button" className="btn btn-dark text-white" href="#">
          Başla
        </a>
      </div>
    </div>
  );
};

export default RecomendedQuiz;
