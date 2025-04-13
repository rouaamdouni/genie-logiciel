"use server"

import { revalidateTag } from "next/cache"

import {
  ValidateUniqueChoiceQuestionActionResult,
  ValidateUniqueChoiceQuestionDetails,
} from "@/features/student/path_dashboard/completed_quiz/completed_unique_choice_question/types"
import { validateUniqueChoiceQuestion } from "@/services/completed_unique_choice_question/complete-unique-choice-question"
import {
  completedUniqueChoiceQuestionKey,
  enrolledPathKey,
} from "@/utils/cache-keys"

export default async function validateUniqueChoiceQuestionAction(
  args: ValidateUniqueChoiceQuestionDetails,
): Promise<ValidateUniqueChoiceQuestionActionResult> {
  const validationResponse = await validateUniqueChoiceQuestion(args)
  if (validationResponse.isLeft())
    return { errors: validationResponse.error, ok: false }

  revalidateTag(enrolledPathKey({ pathId: args.pathId }))

  revalidateTag(
    completedUniqueChoiceQuestionKey({
      pathId: args.pathId,
      questionId: args.questionId,
      quizId: args.quizId,
    }),
  )

  return {
    message: "Unique choice question validated successfully",
    ok: true,
    payload: validationResponse.value,
  }
}
