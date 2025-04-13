// src/questions/strategies/utils/evaluation-result.util.ts
export function buildEvaluationResult<T>(
    isValid: boolean,
    studentResponse: T,
    correctAnswer: T,
    maxScore: number
) {
    return {
        isValid,
        expectedAnswer: correctAnswer,
        studentAnswer: studentResponse,
        score: isValid ? maxScore : 0,
    };
}