export const QuizServices = () => {
  const token = localStorage.getItem("token");
  return (
    <div className="container my-5">
      <div className="row p-4 align-items-center border shadow-lg">
        <div className="col-lg-7 p-3">
          <h1 className="display-4 fw-bold">
            İstediğin tarz ve kategoride quiz bulamıyor musun ?
          </h1>
          <p className="lead">
            Eğer istediğin tarz ve kategoride quiz bulamazsan bize belirtmekten
            çekinme.
          </p>
          <div className="d-grid gap-2 justify-content-md-start mb-4 mb-lg-3">
            {token ? (
              <a className="btn btn-dark btn-lg text-white" href="/register">
                Mesaj Gönder
              </a>
            ) : (
              <a className="btn btn-dark btn-lg text-white" href="/register">
                Kayıt ol
              </a>
            )}
          </div>
        </div>
        <div className="col-lg-4 offset-lg-1 shadow-lg lost-image"></div>
      </div>
    </div>
  );
};
