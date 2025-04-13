// src/questions/strategies/utils/evaluation-builder.util.ts
import { QuestionEvaluationResult } from "../../next-client/types/question-types";
export class EvaluationBuilder<T> {
    private result: Partial<QuestionEvaluationResult<T>> = {};

    constructor(
        private readonly studentResponse: T,
        private readonly correctAnswer: T,
        private readonly maxScore: number
    ) { }

    withValidation(isValid: boolean): this {
        this.result.isValid = isValid;
        this.result.expectedAnswer = this.correctAnswer;
        this.result.studentAnswer = this.studentResponse;
        this.result.score = isValid ? this.maxScore : 0;
        return this;
    }

    build(): QuestionEvaluationResult<T> {
        return this.result as QuestionEvaluationResult<T>;
    }
}