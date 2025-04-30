import { ISubQuiz, SubQuizType } from './sub-quiz.interface';

export abstract class SubQuiz implements ISubQuiz {
    public studentScore: number = 0;
    public studentResponse?: any;
    public completedAt?: Date;
    public isCompleted: boolean = false;
    public idealOption?: any;

    constructor(
        public readonly questionId: string,
        public readonly headline: string,
        public readonly subQuizType: SubQuizType,
        public isDeleted: boolean,
        public createdAt: Date,
        public updatedAt: Date,
        public deletedAt?: Date
    ) { }

    getCompletationStatus() {
        return this.isCompleted;
    }


    completeSubQuiz(response: any): void {
        this.studentResponse = response;
        this.studentScore = this.calculateScore(response);
        this.completedAt = new Date();
        this.isCompleted = true;
        this.updatedAt = new Date();
    }
    getScore(): number {
        return this.isCompleted ? this.studentScore : 0;
    }
    protected abstract calculateScore(response: any): number;
}
