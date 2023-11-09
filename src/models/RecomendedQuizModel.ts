export class RecomendedQuizModel {
  constructor(
    public id: number,
    public quizName: string,
    public quizImgUrl: string
  ) {}
}

export class RecomendedQuiz {
  constructor(public id: number, public quizId: number) {}
}
