import { SubQuiz } from "../sub_quiz/sub-quiz.entity";
import { IQuiz } from './quiz.interface';

export class Quiz implements IQuiz {
    private subQuizzes: SubQuiz[] = [];
    private _score: number = 0;
    private _subQuizzesCount: number = 0;
    private _completedCount: number = 0;

    constructor(
        public readonly quizId: string,
        public readonly label: string,
        public isDeleted: boolean = false,
        public readonly createdAt: Date = new Date(),
        public updatedAt: Date = new Date(),
        public deletedAt?: Date
    ) { }

    addSubQuiz(subQuiz: SubQuiz): void {
        this.subQuizzes.push(subQuiz);
        this.recalculateStats();
    }

    loadSubQuizzes(subQuizzes: SubQuiz[]): void {
        this.subQuizzes = subQuizzes;
        this.recalculateStats();
    }

    completeSubQuiz(questionId: string, response: unknown): boolean {
        const subQuiz = this.subQuizzes.find(sq => sq.questionId === questionId);

        if (!subQuiz || subQuiz.isCompleted) {
            return false;
        }

        subQuiz.completeSubQuiz(response);
        this.recalculateStats();
        return true;
    }

    private recalculateStats(): void {
        this._score = this.subQuizzes
            .filter(sq => sq.isCompleted)
            .reduce((sum, sq) => sum + sq.studentScore, 0);

        this._subQuizzesCount = this.subQuizzes.length;
        this._completedCount = this.subQuizzes.filter(sq => sq.isCompleted).length;
        this.updatedAt = new Date();
    }

    get score(): number {
        return this._score;
    }

    get subQuizzesCount(): number {
        return this._subQuizzesCount;
    }

    get completedCount(): number {
        return this._completedCount;
    }

    get completionPercentage(): number {
        return this.subQuizzesCount > 0
            ? Math.round((this.completedCount / this.subQuizzesCount) * 100)
            : 0;
    }

    getSubQuizzes(): ReadonlyArray<SubQuiz> {
        return this.subQuizzes;
    }

    getCompletedSubQuizzes(): ReadonlyArray<SubQuiz> {
        return this.subQuizzes.filter(sq => sq.isCompleted);
    }

    delete(): void {
        this.isDeleted = true;
        this.deletedAt = new Date();
        this.updatedAt = new Date();
    }

    restore(): void {
        this.isDeleted = false;
        this.deletedAt = undefined;
        this.updatedAt = new Date();
    }
}