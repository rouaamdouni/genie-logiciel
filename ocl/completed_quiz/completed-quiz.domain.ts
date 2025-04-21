export class CompletedQuiz {
  constructor(
    public readonly path: string,
    public readonly student: string,
    public readonly quiz: string,
    public readonly completedSubQuizzes: number,
    public readonly isCompleted: boolean,
    public readonly passedTime: number,
    public readonly score: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
