import { SubQuiz } from '../sub_quiz/sub-quiz.entity';
import { SubQuizType } from '../sub_quiz/sub-quiz.interface';

export class MultipleChoiceQuestion extends SubQuiz {
    constructor(
        questionId: string,
        headline: string,
        public readonly requiredScore: number,
        public readonly allowPartialCredit: boolean,
        public readonly options: string[],
        public readonly idealOptions: number[],
        isDeleted: boolean = false,
        createdAt: Date = new Date(),
        updatedAt: Date = new Date(),
        deletedAt?: Date
    ) {
        super(
            questionId,
            headline,
            SubQuizType.MULTIPLE_CHOICE,
            isDeleted,
            createdAt,
            updatedAt,
            deletedAt
        );
    }

    protected calculateScore(response: any): number {
        if (!Array.isArray(response)) return 0;

        const correctSelections = response.filter(index =>
            this.idealOptions.includes(index as number)
        ).length;

        const incorrectSelections = response.filter(index =>
            !this.idealOptions.includes(index as number)
        ).length;

        if (incorrectSelections > 0) {
            // If any incorrect options are selected, return 0
            return 0;
        }

        if (this.allowPartialCredit) {
            // Calculate partial credit based on percentage of correct options selected
            const percentageCorrect = correctSelections / this.idealOptions.length;
            return Math.round(this.requiredScore * percentageCorrect);
        } else {
            // All-or-nothing scoring
            return correctSelections === this.idealOptions.length
                ? this.requiredScore
                : 0;
        }
    }
}