import { useState } from "react";

const AddOption = () => {
  const [optionText, setOptionText] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [questionData, setQuestionData] = useState<questionData[]>([]);

  interface questionData {
    questionId: number;
    questionText: string;
  }
  return (
    <form>
      <h3 className="mt-5">Quiz Soru Ekleme</h3>
      <div className="mb-3">
        <label htmlFor="questionText" className="form-label">
          Question Text
        </label>
        <input
          onChange={(o) => setQuestionText(o.target.value)}
          type="text"
          className="form-control"
          id="questionText"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="time" className="form-label">
          Time
        </label>
        <input
          onChange={(o) => setTime(parseInt(o.target.value))}
          type="text"
          className="form-control"
          id="time"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="select" className="form-label">
          Quiz
        </label>
        <select
          id="select"
          className="form-select"
          onChange={(o) => {
            console.log(o.target.value);
            setQuizId(parseInt(o.target.value));
          }}
        >
          <option value={0}>Seçiniz</option>
          {quizData.map((c) => (
            <option value={c.quizId}>{c.quizName}</option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="status" className="form-label">
          Status
        </label>
        <select
          name="status"
          id="status"
          className="form-select"
          onChange={(o) => {
            if (o.target.value === "True") {
              setStatus(true);
            } else {
              setStatus(false);
            }
          }}
        >
          <option>True</option>
          <option>False</option>
        </select>
      </div>
      <button onClick={fetchQuestion} type="button" className="btn btn-primary">
        Ekle
      </button>
    </form>
  );
};
