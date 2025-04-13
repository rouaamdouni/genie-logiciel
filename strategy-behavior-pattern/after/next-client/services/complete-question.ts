// services/question-service.ts
import { headers } from "next/headers";
import { apiBaseUrl } from "@/utils/constants";
import {
    QuestionType,
    QuestionEvaluationResult,
} from "@/types/question-strategy";

export async function validateQuestion<T>(
    questionType: QuestionType,
    args: {
        pathId: string;
        quizId: string;
        questionId: string;
        studentResponse: T;
        userId: string;
    }
): Promise<QuestionEvaluationResult<T>> {
    const url = `${apiBaseUrl}/questions/${questionType}/${args.pathId}/${args.quizId}/${args.questionId}/completed`;
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
                userId: args.userId
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