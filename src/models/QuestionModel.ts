export default class QuestionModel {
  constructor(
    public id: number,
    public questionText: string,
    public answerOptions: [
      {
        optionText: string;
        isCorrect: boolean;
      }
    ],
    public time: number
  ) {}
}
