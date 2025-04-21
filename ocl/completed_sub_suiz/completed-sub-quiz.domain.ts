import { TSubQuiz } from "../../sub_quiz_metadata/config/sub-quiz-metadata.domain"

export class CompletedSubQuiz {
  constructor(
    public readonly path: string,
    public readonly student: string,
    public readonly quiz: string,
    public readonly question: string,
    public readonly questionType: TSubQuiz,
    public readonly status: "correct" | "pending" | "skipped" | "wrong",
    public readonly takenHints: Array<number>,
    public readonly passedTime: number,
    public readonly score: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
