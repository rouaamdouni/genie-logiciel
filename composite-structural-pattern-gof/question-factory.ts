import ChoiceQuestion from './choice_question/ChoiceQuestion';
import TrueFalseQuestion from './true_false_question/TrueFalseQuestion';
import UniqueChoiceQuestion from './unique_choice_question/UniqueChoiceQuestion';
import Hint from './hint/Hint';
import CourseElement from './interfaces/i-CourseElement';
import { CreateQuestionArgs } from './create-question-args';
import SubQuiz from './SubQuiz';

export class QuestionFactory {
  static create(args: CreateQuestionArgs): SubQuiz  {
    const hints = args.hints.map(h => new Hint(h.requiredScore, h.content));

    switch (args.type) {
      case 'choice':
        return new ChoiceQuestion(
          args.headline,
          args.options,
          args.correctOptions,
          args.correctAnswerFeedback,
          args.wrongAnswerFeedback,
          hints,
          args.score,
          args.difficulty,
          args.estimatedTime,
        );
      case 'true-false':
        return new TrueFalseQuestion(
          args.headline,
          args.idealOption,
          args.correctAnswerFeedback,
          args.wrongAnswerFeedback,
          hints,
          args.score,
          args.difficulty,
          args.estimatedTime,
        );
      case 'unique-choice':
        return new UniqueChoiceQuestion(
          args.headline,
          args.options,
          args.idealOption,
          args.correctAnswerFeedback,
          args.wrongAnswerFeedback,
          hints,
          args.score,
          args.difficulty,
          args.estimatedTime,
        );
      default:
        throw new Error('Unsupported question type');
    }
  }
}
