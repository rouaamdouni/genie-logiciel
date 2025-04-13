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

type ValidateTrueFalseQuestionArgs = {
  pathId: string
  questionId: string
  quizId: string
  studentResponse: boolean
}

export type ValidatedTrueFalseQuestion =
  | {
      expectedResponse: boolean
      isValidResponse: false
      studentResponse: boolean
    }
  | { isValidResponse: true }

export type ValidateTrueFalseQuestionErrors =
  | EntityNotInPath
  | PathNotEnrolled
  | PathNotFound
  | QuizNotFound
  | QuizNotStarted
  | SubQuizAlreadyStarted
  | SubQuizNotFound

type ValidateTrueFalseQuestionResult = Either<
  ValidateTrueFalseQuestionErrors,
  ValidatedTrueFalseQuestion
>

export async function validateTrueFalseQuestion(
  args: ValidateTrueFalseQuestionArgs,
): Promise<ValidateTrueFalseQuestionResult> {
  const url =
    apiBaseUrl +
    `/explore/paths/${args.pathId}/quizzes/${args.quizId}/true_false_questions/${args.questionId}/completed`
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
    if (data.code) return Left.create<ValidateTrueFalseQuestionErrors>(data)
    return Right.create<ValidatedTrueFalseQuestion>(data)
  } catch (error) {
    throw new Error(error as string)
  }
}
