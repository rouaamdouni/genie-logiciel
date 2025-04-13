import { Module } from '@nestjs/common';
import { QuestionsController } from './questions.controller';
import { QuestionService } from './question.service';
import { QuestionEvaluationContext } from './strategies/question-context';
import { QuestionStrategyFactory } from './strategies/question-strategy.factory';
import { TrueFalseStrategy } from './strategies/implementations/true-false.strategy';
import { MultipleChoiceStrategy } from './strategies/implementations/multiple-choice.strategy';
import { UniqueChoiceStrategy } from './strategies/implementations/unique-choice.strategy';
import { PathModule } from '../../path/path.module';
import { QuizModule } from '../../quiz/quiz.module';
import { SubQuizMetadataModule } from '../../sub_quiz_metadata/sub-quiz-metadata.module';
import { CompletedQuestionModule } from '../completed-question.module';

@Module({
  imports: [
    PathModule,
    QuizModule,
    SubQuizMetadataModule,
    CompletedQuestionModule
  ],
  controllers: [QuestionsController],
  providers: [
    QuestionService,
    QuestionStrategyFactory,
    QuestionEvaluationContext,
    QuestionStrategyFactory,
    TrueFalseStrategy,
    MultipleChoiceStrategy,
    UniqueChoiceStrategy,
  ],
  exports: [QuestionService],
})
export class QuestionModule { }