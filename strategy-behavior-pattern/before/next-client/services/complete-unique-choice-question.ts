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

type ValidateUniqueChoiceQuestionArgs = {
  pathId: string
  questionId: string
  quizId: string
  studentResponse: number
}

export type ValidatedUniqueChoiceQuestion =
  | {
      expectedResponse: number
      isValidResponse: false
      studentResponse: number
    }
  | { isValidResponse: true }

export type ValidateUniqueChoiceQuestionErrors =
  | EntityNotInPath
  | PathNotEnrolled
  | PathNotFound
  | QuizNotFound
  | QuizNotStarted
  | SubQuizAlreadyStarted
  | SubQuizNotFound

type ValidateUniqueChoiceQuestionResult = Either<
  ValidateUniqueChoiceQuestionErrors,
  ValidatedUniqueChoiceQuestion
>

export async function validateUniqueChoiceQuestion(
  args: ValidateUniqueChoiceQuestionArgs,
): Promise<ValidateUniqueChoiceQuestionResult> {
  const url =
    apiBaseUrl +
    `/explore/paths/${args.pathId}/quizzes/${args.quizId}/unique_choice_questions/${args.questionId}/completed`
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
    if (data.code) return Left.create<ValidateUniqueChoiceQuestionErrors>(data)
    return Right.create<ValidatedUniqueChoiceQuestion>(data)
  } catch (error) {
    throw new Error(error as string)
  }
}
