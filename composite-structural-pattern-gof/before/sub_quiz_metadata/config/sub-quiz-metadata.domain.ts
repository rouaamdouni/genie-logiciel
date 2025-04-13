export enum TSubQuiz {
  choiceQuestion = "choice_questions",
}

export class SubQuizMetadata {
  constructor(
    public readonly quiz: string,
    public readonly question: string,
    public readonly questionType: TSubQuiz,
    public readonly score: number,
    public readonly difficulty: number,
    public readonly estimatedTime: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly deletedAt?: Date,
  ) {}
}
