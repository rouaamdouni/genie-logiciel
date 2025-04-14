export interface IQuiz {
    quizId: string;
    label: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}