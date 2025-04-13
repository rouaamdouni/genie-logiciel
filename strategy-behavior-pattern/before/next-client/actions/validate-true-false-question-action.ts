"use server"

import { revalidateTag } from "next/cache"

import {
  ValidateTrueFalseQuestionActionResult,
  ValidateTrueFalseQuestionDetails,
} from "@/features/student/path_dashboard/completed_quiz/completed_true_false_question/types"
import { validateTrueFalseQuestion } from "@/services/completed_true_false_question/complete-true-false-question"
import {
  completedTrueFalseQuestionKey,
  enrolledPathKey,
} from "@/utils/cache-keys"

export default async function validateTrueFalseQuestionAction(
  args: ValidateTrueFalseQuestionDetails,
): Promise<ValidateTrueFalseQuestionActionResult> {
  const validationResponse = await validateTrueFalseQuestion(args)
  if (validationResponse.isLeft())
    return { errors: validationResponse.error, ok: false }

  revalidateTag(enrolledPathKey({ pathId: args.pathId }))

  revalidateTag(
    completedTrueFalseQuestionKey({
      pathId: args.pathId,
      questionId: args.questionId,
      quizId: args.quizId,
    }),
  )

  return {
    message: "True false question validated successfully",
    ok: true,
    payload: validationResponse.value,
  }
}
