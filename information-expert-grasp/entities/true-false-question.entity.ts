import { SubQuiz } from '../sub_quiz/sub-quiz.entity';
import { SubQuizType } from '../sub_quiz/sub-quiz.interface';
export class UniqueChoiceQuestion extends SubQuiz {
    constructor(
        questionId: string,
        headline: string,
        public readonly options: string[],
        public readonly idealOption: number,
        public readonly requiredScore: number = 1, // Default to 1 point
        isDeleted: boolean = false,
        createdAt: Date = new Date(),
        updatedAt: Date = new Date(),
        deletedAt?: Date
    ) {
        super(
            questionId,
            headline,
            SubQuizType.UNIQUE_CHOICE,
            isDeleted,
            createdAt,
            updatedAt,
            deletedAt
        );
    }

    getMaxScore(): number {
        return this.requiredScore;
    }

    protected calculateScore(response: unknown): number {
        return response === this.idealOption ? this.requiredScore : 0;
    }
}