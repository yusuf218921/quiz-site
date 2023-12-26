import { useEffect, useState } from "react";

const AddOption = () => {
  const token = localStorage.getItem("token");
  const [optionText, setOptionText] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [questionData, setQuestionData] = useState<QuestionData[]>([]);
  const [questionId, setQuestionId] = useState(-1);
  const [httpError, setHttpError] = useState(null);

  interface QuestionData {
    questionId: number;
    questionText: string;
  }

  useEffect(() => {
    const fetchQuestion = async () => {
      const questionData: QuestionData[] = [];
      const response = await fetch(
        "http://localhost:29722/api/Questions/getallquestions"
      );

      if (!response.ok) {
        throw new Error("Bir Şeyler Ters Gitti");
      }

      const responseJson = await response.json();

      for (const key in responseJson) {
        questionData.push({
          questionId: responseJson[key].questionID,
          questionText: responseJson[key].text,
        });
      }

      console.log(questionData);
      setQuestionData(questionData);
    };
    fetchQuestion().catch((error: any) => {
      setHttpError(error.message);
    });
  }, []);

  const fetchOption = async () => {
    const optionData = {
      questionId: questionId,
      optionText: optionText,
      isCorrect: isCorrect,
    };

    console.log(optionData);
    const response = await fetch(
      "http://localhost:29722/api/Options/addoption",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(optionData),
      }
    );

    if (response.ok) {
      const responseData = await response.json();
      alert(responseData.message);
    } else {
      alert((await response.text()).valueOf());
    }
  };
  return (
    <form>
      <h3 className="mt-5">Quiz Option Ekleme</h3>
      <div className="mb-3">
        <label htmlFor="optionText" className="form-label">
          Option Text
        </label>
        <input
          onChange={(o) => setOptionText(o.target.value)}
          type="text"
          className="form-control"
          id="optionText"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="select" className="form-label">
          Quiz Question
        </label>
        <select
          id="select"
          className="form-select"
          onChange={(o) => {
            console.log(o.target.value);
            setQuestionId(parseInt(o.target.value));
          }}
        >
          <option value={0}>Seçiniz</option>
          {questionData.map((c) => (
            <option value={c.questionId}>{c.questionText}</option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="isCorrect" className="form-label">
          isCorrect
        </label>
        <select
          name="isCorrect"
          id="isCorrect"
          className="form-select"
          onChange={(o) => {
            if (o.target.value === "True") {
              console.log("True");
              setIsCorrect(true);
            } else {
              setIsCorrect(false);
            }
          }}
        >
          <option>True</option>
          <option>False</option>
        </select>
      </div>
      <button onClick={fetchOption} type="button" className="btn btn-primary">
        Ekle
      </button>
    </form>
  );
};

export default AddOption;
