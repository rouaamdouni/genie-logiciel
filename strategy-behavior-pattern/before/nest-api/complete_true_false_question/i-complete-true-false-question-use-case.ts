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

export type CompleteTrueFalseQuestionArgs = {
  pathId: string
  questionId: string
  quizId: string
  studentId: string
  studentResponse: boolean
}

type CompleteTrueFalseQuestionPayload =
  | {
      expectedResponse: boolean
      isValidResponse: false
      studentResponse: boolean
    }
  | {
      isValidResponse: true
    }

export type CompleteTrueFalseQuestionResult = Either<
  | EntityNotInPath
  | PathNotEnrolled
  | PathNotFound
  | QuizNotFound
  | QuizNotStarted
  | SubQuizAlreadyStarted
  | SubQuizNotFound,
  CompleteTrueFalseQuestionPayload
>

export interface ICompleteTrueFalseQuestionUseCase {
  execute(
    args: CompleteTrueFalseQuestionArgs,
  ): Promise<CompleteTrueFalseQuestionResult>
}
