// question-strategy.map.ts
import { TrueFalseQuestionStrategy } from './concrete-strategies/true-false.strategy';
import { MultipleChoiceQuestionStrategy } from './concrete-strategies/multiple-choice.strategy';
import { UniqueChoiceQuestionStrategy } from './concrete-strategies/unique-choice.strategy';

export const questionStrategyMap = {
    'true-false': TrueFalseQuestionStrategy,
    'multiple-choice': MultipleChoiceQuestionStrategy,
    'unique-choice': UniqueChoiceQuestionStrategy,
};
