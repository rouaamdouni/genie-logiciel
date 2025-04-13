import { Either } from "../../../utils/either"
import {
  EntityNotInPath,
  PathNotEnrolled,
  PathNotFound,
  QuizNotFound,
  QuizNotStarted,
  SubQuizAlreadyStarted,
  SubQuizNotFound,
} from "../../../utils/types"

export type CompleteUniqueChoiceQuestionArgs = {
  pathId: string
  questionId: string
  quizId: string
  studentId: string
  studentResponse: number
}

type CompleteUniqueChoiceQuestionPayload =
  | {
      expectedResponse: number
      isValidResponse: false
      studentResponse: number
    }
  | {
      isValidResponse: true
    }

export type CompleteUniqueChoiceQuestionResult = Either<
  | EntityNotInPath
  | PathNotEnrolled
  | PathNotFound
  | QuizNotFound
  | QuizNotStarted
  | SubQuizAlreadyStarted
  | SubQuizNotFound,
  CompleteUniqueChoiceQuestionPayload
>

export interface ICompleteUniqueChoiceQuestionUseCase {
  execute(
    args: CompleteUniqueChoiceQuestionArgs,
  ): Promise<CompleteUniqueChoiceQuestionResult>
}
