// src/questions/strategies/question-context.ts
import { Injectable } from '@nestjs/common';
import { QuestionEvaluationStrategy } from '../strategy/question-strategy.interface';

@Injectable()
export class QuestionEvaluationContext {
    private strategy: QuestionEvaluationStrategy<any>;

    setStrategy(strategy: QuestionEvaluationStrategy<any>): void {
        this.strategy = strategy;
    }

    evaluate<T>(studentResponse: T, correctAnswer: T, maxScore: number) {
        if (!this.strategy) {
            throw new Error('Evaluation strategy not set');
        }
        return this.strategy.evaluate(studentResponse, correctAnswer, maxScore);
    }
}