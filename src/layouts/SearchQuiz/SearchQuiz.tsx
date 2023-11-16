import QuizModel from "../../models/QuizModel";

export const SearchQuiz: React.FC<{ quiz: QuizModel }> = (props) => {
  return (
    <div className="card mt-3 shadow p-3 mb-3 bg-body rounded">
      <div className="row g-0">
        <div className="col-md-2">
          <div className="d-none d-lg-block">
            <img
              src={props.quiz.quizImgUrl}
              width="190"
              height="196"
              alt="Quiz"
            />
          </div>
          <div
            className="d-lg-none d-flex justify-content-center 
                        align-items-center"
          >
            <img
              src={props.quiz.quizImgUrl}
              width="190"
              height="196"
              alt="Quiz"
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="card-body">
            <h5 className="card-title">{props.quiz.quizName}</h5>
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
