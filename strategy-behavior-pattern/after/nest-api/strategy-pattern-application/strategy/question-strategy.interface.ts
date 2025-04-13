// interfaces/question-strategy.interface.ts
export interface QuestionEvaluationResult<T> {
    isValid: boolean;
    expectedAnswer: T;
    studentAnswer: T;
    score: number;
}

export interface QuestionEvaluationStrategy<T> {
    evaluate(
        studentResponse: T,
        correctAnswer: T,
        maxScore: number
    ): QuestionEvaluationResult<T>;
}