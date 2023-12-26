import { useEffect, useState } from "react";

const AddQuestion = () => {
  const token = localStorage.getItem("token");
  const [httpError, setHttpError] = useState(null);
  const [quizData, setQuizData] = useState<QuizData[]>([]);
  const [questionText, setQuestionText] = useState("");
  const [quizId, setQuizId] = useState(-1);
  const [time, setTime] = useState(-1);
  const [status, setStatus] = useState(false);

  interface QuizData {
    quizId: number;
    quizName: string;
  }
  useEffect(() => {
    const fetchQuiz = async () => {
      const quizData: QuizData[] = [];
      const response = await fetch(
        "http://localhost:29722/api/Quizzes/getallquiz"
      );

      if (!response.ok) {
        throw new Error("Bir Şeyler Ters Gitti");
      }

      const responseJson = await response.json();

      for (const key in responseJson) {
        quizData.push({
          quizId: responseJson[key].quizID,
          quizName: responseJson[key].quizName,
        });
      }

      setQuizData(quizData);
      console.log(quizData);
    };
    fetchQuiz().catch((error: any) => {
      setHttpError(error.message);
    });
  }, []);

  const fetchQuestion = async () => {
    const questionData = {
      quizId: quizId,
      text: questionText,
      time: time,
      status: status,
    };

    console.log(JSON.stringify(questionData));

    const response = await fetch(
      "http://localhost:29722/api/Questions/addquestion",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(questionData),
      }
    );
    //const responseData = await response.json();
    if (response.ok) {
      const responseJson = await response.json();
      alert(responseJson.message);
      //alert(responseData);
    } else {
      alert((await response.text()).valueOf());
      //alert(responseData);
    }
  };

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

export default AddQuestion;
