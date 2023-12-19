const RandomQuiz = () => {
  return (
    <div className="p-5 mb-4 bg-dark header">
      <div className="container-fluid py-5 text-white d-flex justify-content-center align-items-center">
        <div>
          <h1 className="display-5 fw-bold font-alev text-warning">
            Quizlemeye Başla
          </h1>
          <p className="col-md-8 fs-4">Hemen Quizlemek mi istiyorsun</p>
          <a
            type="button"
            className="btn btn-dark btn-lg text-white font-alev"
            href="#"
          >
            Quizle
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomQuiz;
