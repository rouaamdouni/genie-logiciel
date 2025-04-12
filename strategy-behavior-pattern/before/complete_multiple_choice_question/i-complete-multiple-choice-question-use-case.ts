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

export type CompleteMultipleChoiceQuestionArgs = {
  pathId: string
  questionId: string
  quizId: string
  studentId: string
  studentResponse: Array<number>
}

type CompleteMultipleChoiceQuestionPayload =
  | {
      expectedResponse: Array<number>
      isValidResponse: false
      studentResponse: Array<number>
    }
  | {
      isValidResponse: true
    }

export type CompleteMultipleChoiceQuestionResult = Either<
  | EntityNotInPath
  | PathNotEnrolled
  | PathNotFound
  | QuizNotFound
  | QuizNotStarted
  | SubQuizAlreadyStarted
  | SubQuizNotFound,
  CompleteMultipleChoiceQuestionPayload
>

export interface ICompleteMultipleChoiceQuestionUseCase {
  execute(
    args: CompleteMultipleChoiceQuestionArgs,
  ): Promise<CompleteMultipleChoiceQuestionResult>
}
