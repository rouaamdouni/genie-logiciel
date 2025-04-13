"use server";

import { revalidateTag } from "next/cache";
import { QuestionStrategies } from "@/strategies/question-strategies";
import { QuestionType } from "@/types/question-strategy";

export async function validateQuestionAction(
    questionType: QuestionType,
    args: unknown
) {
    // Get the appropriate strategy
    const strategy = QuestionStrategies[questionType];

    // Validate input
    const parsedArgs = strategy.schema.safeParse(args);
    if (!parsedArgs.success) {
        return {
            ok: false,
            errors: {
                code: "validation_error",
                message: "Invalid input data",
                details: parsedArgs.error.errors,
            },
        };
    }

    // Validate question
    const validationResult = await strategy.validate(parsedArgs.data);

    // Handle revalidation
    revalidateTag(`path-${parsedArgs.data.pathId}`);
    revalidateTag(`quiz-${parsedArgs.data.quizId}`);

    return validationResult;
}