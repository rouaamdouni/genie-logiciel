import { Either } from "../../../utils/either"
import { QuizNotFound, SuccessMessage } from "../../../utils/types"

export type CreateChoiceQuestionArgs = {
  correctAnswerFeedback: string
  correctOptions: Array<number>
  defaultLanguage: string
  difficulty: number
  estimatedTime: number
  headline: string
  hints: Array<{
    details: string
    requiredScore: number
  }>
  metaTags: Array<string>
  options: Array<string>
  quizId: string
  score?: number
  wrongAnswerFeedback: string
}

export type CreateChoiceQuestionResult = Either<QuizNotFound, SuccessMessage>

export interface ICreateChoiceQuestionUseCase {
  execute(args: CreateChoiceQuestionArgs): Promise<CreateChoiceQuestionResult>
}
