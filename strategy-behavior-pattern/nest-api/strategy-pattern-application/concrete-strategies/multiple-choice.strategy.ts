// src/questions/strategies/implementations/multiple-choice.strategy.ts
import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import { QuestionEvaluationStrategy } from '../strategy/question-strategy.interface';
import { buildEvaluationResult } from '../../utils/evaluation-result.util';

@Injectable()
export class MultipleChoiceQuestionStrategy implements QuestionEvaluationStrategy<number[]> {
    evaluate(studentResponse: number[], correctAnswer: number[], maxScore: number) {
        const isValid = _.isEqual(_.sortBy(studentResponse), _.sortBy(correctAnswer));
        return buildEvaluationResult(isValid, studentResponse, correctAnswer, maxScore);
    }
}