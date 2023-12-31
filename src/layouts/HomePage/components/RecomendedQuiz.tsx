import { RecomendedQuizModel } from "../../../models/RecomendedQuizModel";

const RecomendedQuiz: React.FC<{ quiz: RecomendedQuizModel }> = (props) => {
  return (
    <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
      <div className="text-center">
        <img src={props.quiz.quizImgUrl} width="250" height="233" />

        <h6 className="mt-2">{props.quiz.quizName}</h6>
        <a type="button" className="btn btn-dark text-white" href="#">
          Başla
        </a>
      </div>
    </div>
  );
};

export default RecomendedQuiz;
