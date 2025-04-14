import { ISubQuiz, SubQuizType } from './sub-quiz.interface';

export abstract class SubQuiz implements ISubQuiz {
    public studentScore: number = 0;
    public studentResponse?: unknown;
    public completedAt?: Date;
    public isCompleted: boolean = false;
    public idealOption?: unknown;

    constructor(
        public readonly questionId: string,
        public readonly headline: string,
        public readonly subQuizType: SubQuizType,
        public isDeleted: boolean,
        public createdAt: Date,
        public updatedAt: Date,
        public deletedAt?: Date
    ) { }

    completeSubQuiz(response: unknown): void {
        this.studentResponse = response;
        this.studentScore = this.calculateScore(response);
        this.completedAt = new Date();
        this.isCompleted = true;
        this.updatedAt = new Date();
    }
    abstract getMaxScore(): number;
    protected abstract calculateScore(response: unknown): number;
}