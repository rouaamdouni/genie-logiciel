import { CompletedQuiz } from "./completed-quiz.domain"

export type GetCompletedQuizArgs = {
  pathId: string
  quizId: string
  studentId: string
}

export interface ICompletedQuizRepo {
  get(args: GetCompletedQuizArgs): Promise<CompletedQuiz | null>
  save(args: CompletedQuiz): Promise<void>
}
