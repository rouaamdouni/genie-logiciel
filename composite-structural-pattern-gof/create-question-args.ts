export type QuestionType = 'choice' | 'true-false' | 'unique-choice';

export interface CreateQuestionArgsBase {
  type: QuestionType;
  headline: string;
  correctAnswerFeedback: string;
  wrongAnswerFeedback: string;
  hints: Array<{ requiredScore: number; content: string }>;
  score: number;
  difficulty: number;
  estimatedTime: number;
}

export interface CreateChoiceQuestionArgs extends CreateQuestionArgsBase {
  type: 'choice';
  options: string[];
  correctOptions: number[];
}

export interface CreateTrueFalseQuestionArgs extends CreateQuestionArgsBase {
  type: 'true-false';
  idealOption: boolean;
}

export interface CreateUniqueChoiceQuestionArgs extends CreateQuestionArgsBase {
  type: 'unique-choice';
  options: string[];
  idealOption: number;
}

export type CreateQuestionArgs =
  | CreateChoiceQuestionArgs
  | CreateTrueFalseQuestionArgs
  | CreateUniqueChoiceQuestionArgs;
