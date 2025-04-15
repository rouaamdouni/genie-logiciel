// strategies/question-strategies.ts
import {
    trueFalseQuestionSchema,
    uniqueChoiceQuestionSchema,
    multipleChoiceQuestionSchema,
} from "@/types/question-strategy";
import { z } from "zod"
import { validateQuestion } from "@/services/question-service";

export const QuestionStrategies = {
    true_false: {
        schema: trueFalseQuestionSchema,
        validate: (args: z.infer<typeof trueFalseQuestionSchema>) =>
            validateQuestion<boolean>("true_false", args),
    },
    unique_choice: {
        schema: uniqueChoiceQuestionSchema,
        validate: (args: z.infer<typeof uniqueChoiceQuestionSchema>) =>
            validateQuestion<number>("unique_choice", args),
    },
    multiple_choice: {
        schema: multipleChoiceQuestionSchema,
        validate: (args: z.infer<typeof multipleChoiceQuestionSchema>) =>
            validateQuestion<number[]>("multiple_choice", args),
    },
};