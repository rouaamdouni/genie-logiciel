import { headers } from "next/headers";
import { apiBaseUrl } from "@/utils/constants";
import { QuestionEvaluationResult } from "@/types/question-strategy";


export async function validateQuestion<T>(
    args: {
        pathId: string;
        quizId: string;
        studentResponse: T;
        questionType: string,
        correctAnswer: T,
        maxScore: number;

    }
): Promise<QuestionEvaluationResult<T>> {
    const url = `${apiBaseUrl}/path/${args.pathId}/quiz/${args.quizId}/evaluate`;

    const authHeader = headers().get("Authorization") ?? "";

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: authHeader,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                type: args.questionType,
                studentAnswer: args.studentResponse,
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
