"use server";
import { revalidateTag } from "next/cache";
import { QuestionStrategies } from "@/strategies/question-strategies"; // Assuming this is where strategies are imported
import { QuestionType, QuestionEvaluationParams, QuestionEvaluationResult } from "@/types/question-strategy"; // Import types and schemas

// Updated validateQuestionAction function
export async function validateQuestionAction<T>(
    questionType: QuestionType,
    args: QuestionEvaluationParams<T>
): Promise<QuestionEvaluationResult<T>> {
    // Dynamically select the schema and strategy based on the question type
    const strategy = QuestionStrategies[questionType];

    if (!strategy) {
        return {
            isLeft: true,
            value: {
                code: "strategy_not_found",
                message: `Strategy not found for question type: ${questionType}`,
                status: 404,
            }
        };
    }

    // Validate input data using the strategy's schema
    const parsedArgs = strategy.schema.safeParse(args);
    if (!parsedArgs.success) {
        return {
            isLeft: true,
            value: {
                code: "validation_error",
                message: "Invalid input data",
                status: 400,
            }
        };
    }

    // Execute the strategy's validation logic
    const validationResult = await strategy.validate(parsedArgs.data);

    // Revalidate the necessary cache tags
    revalidateTag(`path-${parsedArgs.data.pathId}`);
    revalidateTag(`quiz-${parsedArgs.data.quizId}`);

    return validationResult;
}
