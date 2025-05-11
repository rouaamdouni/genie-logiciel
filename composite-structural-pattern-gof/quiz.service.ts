import { Injectable } from '@nestjs/common';
import Quiz from './Quiz';
import { CreateQuestionArgs } from './create-question-args';
import { QuestionFactory } from './question-factory';

@Injectable()
export class QuizService {
  private quizzes: Quiz[] = [];
addQuestion(quizId: string, data: CreateQuestionArgs): string {
  const quiz = this.quizzes.find(q => q.quizId === quizId);
  if (!quiz) throw new Error('Quiz not found');

  const question = QuestionFactory.create(data);
  quiz.addSubQuiz(question);
  return `${data.type} question added`;
}

}
