// src/questions/strategies/strategy-registry.service.ts
import { Injectable } from '@nestjs/common';
import { QuestionEvaluationStrategy } from './strategy/question-strategy.interface';
import { MultipleChoiceQuestionStrategy } from './concrete-strategies/multiple-choice.strategy';
import { UniqueChoiceQuestionStrategy } from './concrete-strategies/unique-choice.strategy';
import { TrueFalseQuestionStrategy } from './concrete-strategies/true-false.strategy';

@Injectable()
export class StrategyRegistry {
    private strategies = new Map<string, QuestionEvaluationStrategy<any>>();

    constructor(
        multiple: MultipleChoiceQuestionStrategy,
        unique: UniqueChoiceQuestionStrategy,
        tf: TrueFalseQuestionStrategy
    ) {
        this.strategies.set('multiple-choice', multiple);
        this.strategies.set('unique-choice', unique);
        this.strategies.set('true-false', tf);
    }

    getStrategy(type: string): QuestionEvaluationStrategy<any> {
        const strategy = this.strategies.get(type);
        if (!strategy) {
            throw new Error(`No strategy registered for type "${type}"`);
        }
        return strategy;
    }
}
