export default class QuizModel {
  constructor(
    public id: number,
    public categoryId: number,
    public quizName: string,
    public quizImgUrl: string,
    public status: boolean
  ) {}
}
