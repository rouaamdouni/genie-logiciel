import { z } from "zod"

import {
  ValidatedMultipleChoiceQuestion,
  ValidateMultipleChoiceQuestionErrors,
} from "@/services/completed_multiple_choice_question/complete-multiple-choice-question"
import ActionResult from "@/utils/action"

export const validateMultipleChoiceQuestionSchema = z.object({
  pathId: z.string(),
  questionId: z.string(),
  quizId: z.string(),
  studentResponse: z.array(z.coerce.number().int()),
})

export type ValidateMultipleChoiceQuestionDetails = z.infer<
  typeof validateMultipleChoiceQuestionSchema
>

export type ValidateMultipleChoiceQuestionActionResult = ActionResult<
  ValidateMultipleChoiceQuestionErrors,
  ValidatedMultipleChoiceQuestion
>
