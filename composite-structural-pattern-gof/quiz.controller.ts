import { Controller, Post, Body, Param, Get, NotFoundException } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateChoiceQuestionArgs } from './choice_question/create-choice-question-args';
import { CreateTrueFalseQuestionArgs } from './true_false_question/create-true-false-question';
import { CreateUniqueChoiceQuestionArgs } from './unique_choice_question/create-unique-choice-args';
import Quiz from './Quiz';

@Controller('quizzes')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  createQuiz(
    @Body() createQuizDto: { quizId: string; slug: string; label: string },
  ): Quiz {
    return this.quizService.createQuiz(createQuizDto.quizId, createQuizDto.slug, createQuizDto.label);
  }

  @Post(':quizId/choice-question')
  addChoiceQuestion(
    @Param('quizId') quizId: string,
    @Body() createChoiceQuestionDto: CreateChoiceQuestionArgs,
  ): string {
    try {
      return this.quizService.addChoiceQuestion(quizId, createChoiceQuestionDto);
    } catch (error) {
      throw new NotFoundException('Quiz not found');
    }
  }

  @Post(':quizId/true-false-question')
  addTrueFalseQuestion(
    @Param('quizId') quizId: string,
    @Body() createTrueFalseQuestionDto: CreateTrueFalseQuestionArgs,
  ): string {
    try {
      return this.quizService.addTrueFalseQuestion(quizId, createTrueFalseQuestionDto);
    } catch (error) {
      throw new NotFoundException('Quiz not found');
    }
  }

  @Post(':quizId/unique-choice-question')
  addUniqueChoiceQuestion(
    @Param('quizId') quizId: string,
    @Body() createUniqueChoiceQuestionDto: CreateUniqueChoiceQuestionArgs,
  ): string {
    try {
      return this.quizService.addUniqueChoiceQuestion(quizId, createUniqueChoiceQuestionDto);
    } catch (error) {
      throw new NotFoundException('Quiz not found');
    }
  }

  @Get()
  listQuizzes() {
    return this.quizService.listQuizzes();
  }
}
