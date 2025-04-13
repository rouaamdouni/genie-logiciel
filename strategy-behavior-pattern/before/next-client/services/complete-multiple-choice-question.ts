import { headers } from "next/headers"

import { apiBaseUrl } from "@/utils/constants"
import Either, { Left, Right } from "@/utils/either"
import {
  EntityNotInPath,
  PathNotEnrolled,
  PathNotFound,
  QuizNotFound,
  QuizNotStarted,
  SubQuizAlreadyStarted,
  SubQuizNotFound,
} from "@/utils/types"

type ValidateMultipleChoiceQuestionArgs = {
  pathId: string
  questionId: string
  quizId: string
  studentResponse: Array<number>
}

export type ValidatedMultipleChoiceQuestion =
  | {
      expectedResponse: Array<number>
      isValidResponse: false
      studentResponse: Array<number>
    }
  | { isValidResponse: true }

export type ValidateMultipleChoiceQuestionErrors =
  | EntityNotInPath
  | PathNotEnrolled
  | PathNotFound
  | QuizNotFound
  | QuizNotStarted
  | SubQuizAlreadyStarted
  | SubQuizNotFound

type ValidateMultipleChoiceQuestionResult = Either<
  ValidateMultipleChoiceQuestionErrors,
  ValidatedMultipleChoiceQuestion
>

export async function validateMultipleChoiceQuestion(
  args: ValidateMultipleChoiceQuestionArgs,
): Promise<ValidateMultipleChoiceQuestionResult> {
  const url =
    apiBaseUrl +
    `/explore/paths/${args.pathId}/quizzes/${args.quizId}/multiple_choice_questions/${args.questionId}/completed`
  const authHeader = headers().get("Authorization") ?? ""

  try {
    const response = await fetch(url, {
      body: JSON.stringify(args),
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
      },
      method: "POST",
    })

    const data = await response.json()
    if (data.code)
      return Left.create<ValidateMultipleChoiceQuestionErrors>(data)
    return Right.create<ValidatedMultipleChoiceQuestion>(data)
  } catch (error) {
    throw new Error(error as string)
  }
}
