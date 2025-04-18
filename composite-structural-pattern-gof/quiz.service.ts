import { Injectable } from '@nestjs/common';
import Quiz from './Quiz';
import Hint from './hint/Hint';
import ChoiceQuestion from './choice_question/ChoiceQuestion';
import { CreateChoiceQuestionArgs } from './choice_question/create-choice-question-args';
import { CreateTrueFalseQuestionArgs } from './true_false_question/create-true-false-question';
import TrueFalseQuestion from './true_false_question/TrueFalseQuestion';
import { CreateUniqueChoiceQuestionArgs } from './unique_choice_question/create-unique-choice-args';
import UniqueChoiceQuestion from './unique_choice_question/UniqueChoiceQuestion';

@Injectable()
export class QuizService {
  private quizzes: Quiz[] = [];

  createQuiz(quizId: string, slug: string, label: string): Quiz {
    const quiz = new Quiz(quizId, slug, label);
    this.quizzes.push(quiz);
    return quiz;
  }

  addChoiceQuestion(
    quizId: string,
    data: CreateChoiceQuestionArgs,
  ): string {
    const quiz = this.quizzes.find(q => q.quizId === quizId);
    if (!quiz) throw new Error('Quiz not found');

    const hints = data.hints.map(h => new Hint(h.requiredScore, h.content));

    const question = new ChoiceQuestion(
      data.headline,
      data.options,
      data.correctOptions,
      data.correctAnswerFeedback,
      data.wrongAnswerFeedback,
      hints,
      data.score,
      data.difficulty,
      data.estimatedTime,
    );

    quiz.addSubQuiz(question);
    return 'ChoiceQuestion added';
  }
  addTrueFalseQuestion(
    quizId: string,
    data: CreateTrueFalseQuestionArgs,
  ): string {
    const quiz = this.quizzes.find(q => q.quizId === quizId);
    if (!quiz) throw new Error('Quiz not found');

    const hints = data.hints.map(h => new Hint(h.requiredScore, h.content));

    const question = new TrueFalseQuestion(
      data.headline,
      data.idealOption,
      data.correctAnswerFeedback,
      data.wrongAnswerFeedback,
      hints,
      data.score,
      data.difficulty,
      data.estimatedTime,
    );

    quiz.addSubQuiz(question);
    return 'True False added';
  }
  addUniqueChoiceQuestion(
    quizId: string,
    data: CreateUniqueChoiceQuestionArgs,
  ): string {
    const quiz = this.quizzes.find(q => q.quizId === quizId);
    if (!quiz) throw new Error('Quiz not found');

    const hints = data.hints.map(h => new Hint(h.requiredScore, h.content));

    const question = new UniqueChoiceQuestion(
      data.headline,
      data.options,
      data.idealOption,
      data.correctAnswerFeedback,
      data.wrongAnswerFeedback,
      hints,
      data.score,
      data.difficulty,
      data.estimatedTime,
    );

    quiz.addSubQuiz(question);
    return 'Unique Choice Question added';
  }
  listQuizzes() {
    return this.quizzes.map(q => q.getSummary());
  }
}
