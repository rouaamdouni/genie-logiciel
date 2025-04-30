import { SubQuiz } from "../sub_quiz/sub-quiz.entity";
import { IQuiz } from './quiz.interface';

export class Quiz implements IQuiz {
    private readonly subQuizzes: SubQuiz[] = [];
    private score: number = 0;
    private subQuizzesCount: number = 0;
    private completedCount: number = 0;
    private isCompleted: boolean = false;
    private completedAt?: Date;

    constructor(
        public readonly quizId: string,
        public readonly label: string,
        public isDeleted: boolean = false,
        public readonly createdAt: Date = new Date(),
        public updatedAt: Date = new Date(),
        public deletedAt?: Date
    ) {
        this.isCompleted = false;
        this.score = 0;
        this.subQuizzesCount = 0;
        this.completedCount = 0;
        this.completedAt = new Date();
    }

    addSubQuiz(subQuiz: SubQuiz): void {
        this.subQuizzes.push(subQuiz);
        this.recalculateStats();
    }

    completeQuiz(): void {
        if (this.isCompleted) {
            console.log(`Quiz ${this.quizId} is already completed.`);
            return;
        }

        const allCompleted = this.subQuizzes.every(subQuiz => subQuiz.getCompletationStatus());

        this.recalculateStats();

        if (!allCompleted) {
            console.log(`Quiz ${this.quizId} cannot be completed: some sub-quizzes are still incomplete.`);
            return;
        }

        this.isCompleted = true;
        this.completedAt = new Date();
        this.updatedAt = new Date();
        console.log(`Quiz ${this.quizId} is now marked as completed.`);
    }


    private recalculateStats(): void {
        let totalScore = 0;
        let completed = 0;

        for (const subQuiz of this.subQuizzes) {
            const score = subQuiz.getScore();
            if (score > 0) {
                completed++;
                totalScore += score;
            }
        }

        this.score = totalScore;
        this.completedCount = completed;
        this.subQuizzesCount = this.subQuizzes.length;
        this.updatedAt = new Date();
    }

    getTotalScore(): number {
        return this.score;
    }

    getsubQuizzesCount(): number {
        return this.subQuizzesCount;
    }

    getcompletedCount(): number {
        return this.completedCount;
    }

    getcompletionPercentage(): number {
        return this.subQuizzesCount > 0
            ? Math.round((this.completedCount / this.subQuizzesCount) * 100)
            : 0;
    }

    getSubQuizzes(): ReadonlyArray<SubQuiz> {
        return this.subQuizzes;
    }

    getCompletedSubQuizzes(): ReadonlyArray<SubQuiz> {
        return this.subQuizzes.filter(subQuiz => subQuiz.getCompletationStatus());
    }
}
