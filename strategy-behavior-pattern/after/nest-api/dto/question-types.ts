// types/question-types.ts
export enum QuestionType {
    TRUE_FALSE = 'true-false',
    MULTIPLE_CHOICE = 'multiple-choice',
    UNIQUE_CHOICE = 'unique-choice'
}

export type QuestionEvaluationParams<T> = {
    questionType: QuestionType;
    pathId: string;
    quizId: string;
    questionId: string;
    studentResponse: T;
    studentId: string;
};