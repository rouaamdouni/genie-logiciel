import { z } from "zod"

import {
  ValidatedUniqueChoiceQuestion,
  ValidateUniqueChoiceQuestionErrors,
} from "@/services/completed_unique_choice_question/complete-unique-choice-question"
import ActionResult from "@/utils/action"

export const validateUniqueChoiceQuestionSchema = z.object({
  pathId: z.string(),
  questionId: z.string(),
  quizId: z.string(),
  studentResponse: z.coerce.number().int(),
})

export type ValidateUniqueChoiceQuestionDetails = z.infer<
  typeof validateUniqueChoiceQuestionSchema
>

export type ValidateUniqueChoiceQuestionActionResult = ActionResult<
  ValidateUniqueChoiceQuestionErrors,
  ValidatedUniqueChoiceQuestion
>
