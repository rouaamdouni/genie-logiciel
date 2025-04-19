export class CompletedQuizDTO {
  constructor(
    public readonly pathId: string,
    public readonly studentId: string,
    public readonly quizId: string,
    public readonly completedSubQuizzes: number,
    public readonly isCompleted: boolean,
    public readonly score: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
