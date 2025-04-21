import { CompletedSubQuiz } from "./completed-sub-quiz.domain"
import { CompletedSubQuizDTO } from "./completed-sub-quiz.dto"

export type GetCompletedSubQuizArgs = {
  pathId: string
  questionId: string
  quizId: string
  studentId: string
}

export interface ICompletedSubQuizRepo {
  get(args: GetCompletedSubQuizArgs): Promise<CompletedSubQuiz | null>
  list(args: ListCompletedSubQuizzesArgs): Promise<Array<CompletedSubQuizDTO>>
  save(args: CompletedSubQuiz): Promise<void>
}

export type ListCompletedSubQuizzesArgs = {
  pathId: string
  quizId: string
  studentId: string
}
