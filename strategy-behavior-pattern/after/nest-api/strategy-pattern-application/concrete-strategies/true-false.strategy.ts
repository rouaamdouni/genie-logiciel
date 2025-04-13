// src/questions/strategies/implementations/true-false.strategy.ts
import { Injectable } from '@nestjs/common';
import { QuestionEvaluationStrategy } from '../strategy/question-strategy.interface';
import { buildEvaluationResult } from '../../utils/evaluation-result.util';

@Injectable()
export class TrueFalseQuestionStrategy implements QuestionEvaluationStrategy<boolean> {
    evaluate(studentResponse: boolean, correctAnswer: boolean, maxScore: number) {
        const isValid = studentResponse === correctAnswer;
        return buildEvaluationResult(isValid, studentResponse, correctAnswer, maxScore);
    }
}