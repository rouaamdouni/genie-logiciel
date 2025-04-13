// src/questions/strategies/implementations/unique-choice.strategy.ts
import { Injectable } from '@nestjs/common';
import { QuestionEvaluationStrategy } from '../strategy/question-strategy.interface';
import { buildEvaluationResult } from '../../utils/evaluation-result.util';

@Injectable()
export class UniqueChoiceQuestionStrategy implements QuestionEvaluationStrategy<number> {
    evaluate(studentResponse: number, correctAnswer: number, maxScore: number) {
        const isValid = studentResponse === correctAnswer;
        return buildEvaluationResult(isValid, studentResponse, correctAnswer, maxScore);
    }
}