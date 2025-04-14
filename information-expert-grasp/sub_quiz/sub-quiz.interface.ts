export enum SubQuizType {
    MULTIPLE_CHOICE = 'multiple_choice',
    UNIQUE_CHOICE = 'unique_choice',
    TRUE_FALSE = 'true_false'
}

export interface ISubQuiz {
    questionId: string;
    headline: string;
    subQuizType: SubQuizType;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}