import { headers } from "next/headers";
import { apiBaseUrl } from "@/utils/constants";
import { QuestionEvaluationResult } from "@/types/question-strategy";

// Define a mapping of question types to strategy types, matching your backend logic
const questionStrategyMap = {
    'true-false': 'true-false',
    'multiple-choice': 'multiple-choice',
    'unique-choice': 'unique-choice',
};

export async function validateQuestion<T>(
    questionId: string, // Using questionId as passed from the front-end
    args: {
        pathId: string;
        quizId: string;
        studentResponse: T;
        userId: string;
        maxScore: number;
    }
): Promise<QuestionEvaluationResult<T>> {
    const strategy = questionStrategyMap[questionId];

    if (!strategy) {
        throw new Error(`No strategy found for questionId: ${questionId}`);
    }

    const url = `${apiBaseUrl}/quiz/${strategy}/evaluate`;

    const authHeader = headers().get("Authorization") ?? "";

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: authHeader,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                studentResponse: args.studentResponse,
                correctAnswer: args.correctAnswer,
                maxScore: args.maxScore,
            }),
        });

        return await response.json();
    } catch (error) {
        return {
            isLeft: true,
            error: {
                code: "network_error",
                message: "Failed to validate question",
                status: 500,
            },
        };
    }
}
