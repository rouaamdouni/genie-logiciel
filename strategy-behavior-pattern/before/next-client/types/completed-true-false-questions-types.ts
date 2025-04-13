import { z } from "zod"

import {
  ValidatedTrueFalseQuestion,
  ValidateTrueFalseQuestionErrors,
} from "@/services/completed_true_false_question/complete-true-false-question"
import ActionResult from "@/utils/action"

export const validateTrueFalseQuestionSchema = z.object({
  pathId: z.string(),
  questionId: z.string(),
  quizId: z.string(),
  studentResponse: z.boolean(),
})

export type ValidateTrueFalseQuestionDetails = z.infer<
  typeof validateTrueFalseQuestionSchema
>

export type ValidateTrueFalseQuestionActionResult = ActionResult<
  ValidateTrueFalseQuestionErrors,
  ValidatedTrueFalseQuestion
>
