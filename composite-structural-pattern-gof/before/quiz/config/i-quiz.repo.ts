import { Quiz } from "./quiz.domain"

export type GetQuizByIdArgs = {
  language?: string
  quizId: string
}

export interface IQuizRepo {
  getById(args: GetQuizByIdArgs): Promise<null | Quiz>
  save(args: Quiz): Promise<void>
}
