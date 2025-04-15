import { z } from "zod";
import { Either } from "@/utils/either";

export type QuestionType = 'true_false' | 'unique_choice' | 'multiple_choice';


// Type-specific schemas
export const trueFalseQuestionSchema = baseQuestionSchema.extend({
    studentResponse: z.boolean(),
});

export const uniqueChoiceQuestionSchema = baseQuestionSchema.extend({
    studentResponse: z.coerce.number().int(),
});

export const multipleChoiceQuestionSchema = baseQuestionSchema.extend({
    studentResponse: z.array(z.coerce.number().int()),
});

// Unified validation result type
export type QuestionEvaluationResult<T> = Either<
    {
        code: string;
        message: string;
        status: number;
    },
    {
        isValidResponse: boolean;
        expectedResponse?: T;
        studentResponse?: T;
        score: number;
    }
>;
export type QuestionEvaluationParams<T> = {
    questionType: QuestionType;
    pathId: string;
    quizId: string;
    questionId: string;
    studentResponse: T;
    studentId: string;
};