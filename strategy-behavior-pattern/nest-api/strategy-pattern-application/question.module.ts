// src/questions/question.module.ts
import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';
import { QuestionEvaluationContext } from './strategies/question-context';
import { StrategyRegistry } from './strategies/strategy-registry.service';
import { MultipleChoiceQuestionStrategy } from './strategies/implementations/multiple-choice.strategy';
import { UniqueChoiceQuestionStrategy } from './strategies/implementations/unique-choice.strategy';
import { TrueFalseQuestionStrategy } from './strategies/implementations/true-false.strategy';

@Module({
    controllers: [QuestionController],
    providers: [
        QuestionEvaluationContext,
        StrategyRegistry,
        MultipleChoiceQuestionStrategy,
        UniqueChoiceQuestionStrategy,
        TrueFalseQuestionStrategy,
    ],
})
export class QuestionModule { }
