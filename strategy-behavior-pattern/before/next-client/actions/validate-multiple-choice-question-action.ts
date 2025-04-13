"use server"

import { revalidateTag } from "next/cache"

import {
  ValidateMultipleChoiceQuestionActionResult,
  ValidateMultipleChoiceQuestionDetails,
} from "@/features/student/path_dashboard/completed_quiz/completed_multiple_choice_question/types"
import { validateMultipleChoiceQuestion } from "@/services/completed_multiple_choice_question/complete-multiple-choice-question"
import {
  completedMultipleChoiceQuestionKey,
  enrolledPathKey,
} from "@/utils/cache-keys"

export default async function validateMultipleChoiceQuestionAction(
  args: ValidateMultipleChoiceQuestionDetails,
): Promise<ValidateMultipleChoiceQuestionActionResult> {
  const validationResponse = await validateMultipleChoiceQuestion(args)
  if (validationResponse.isLeft())
    return { errors: validationResponse.error, ok: false }

  revalidateTag(enrolledPathKey({ pathId: args.pathId }))

  revalidateTag(
    completedMultipleChoiceQuestionKey({
      pathId: args.pathId,
      questionId: args.questionId,
      quizId: args.quizId,
    }),
  )

  return {
    message: "Multiple choice question validated successfully",
    ok: true,
    payload: validationResponse.value,
  }
}
