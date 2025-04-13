import { Injectable } from '@nestjs/common';
import { QuestionType } from '../types/question-types';
import { IQuestionEvaluationStrategy } from '../interfaces/question-strategy.interface';
import { TrueFalseStrategy } from './implementations/true-false.strategy';
import { MultipleChoiceStrategy } from './implementations/multiple-choice.strategy';
import { UniqueChoiceStrategy } from './implementations/unique-choice.strategy';

@Injectable()
export class QuestionStrategyFactory {
    constructor(
        private readonly trueFalseStrategy: TrueFalseStrategy,
        private readonly multipleChoiceStrategy: MultipleChoiceStrategy,
        private readonly uniqueChoiceStrategy: UniqueChoiceStrategy,
    ) { }

    getStrategy(type: QuestionType): IQuestionEvaluationStrategy<any> {
        switch (type) {
            case QuestionType.TRUE_FALSE:
                return this.trueFalseStrategy;
            case QuestionType.MULTIPLE_CHOICE:
                return this.multipleChoiceStrategy;
            case QuestionType.UNIQUE_CHOICE:
                return this.uniqueChoiceStrategy;
            default:
                throw new Error(`Unsupported question type: ${type}`);
        }
    }

    // Optional: Bulk strategy registration
    private readonly strategyMap: Record<
        QuestionType,
        IQuestionEvaluationStrategy<any>
    > = {
            [QuestionType.TRUE_FALSE]: this.trueFalseStrategy,
            [QuestionType.MULTIPLE_CHOICE]: this.multipleChoiceStrategy,
            [QuestionType.UNIQUE_CHOICE]: this.uniqueChoiceStrategy,
        };

    // Alternative implementation using a map
    getStrategyAlternative(type: QuestionType): IQuestionEvaluationStrategy<any> {
        const strategy = this.strategyMap[type];
        if (!strategy) {
            throw new Error(`Unsupported question type: ${type}`);
        }
        return strategy;
    }
}