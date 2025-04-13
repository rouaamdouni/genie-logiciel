import { Injectable } from '@nestjs/common';
import { Either, Left, Right } from '../../../utils/either';
import { QuestionValidationError } from '../../../utils/types';
import { QuestionType } from '../types/question-types';

@Injectable()
export class QuestionService {
    constructor(
        private readonly questionRepo: IQuestionRepository,
        private readonly pathRepo: IPathRepository,
        private readonly quizRepo: IQuizRepository,
        private readonly metadataRepo: ISubQuizMetadataRepository
    ) { }

    async validateQuestionAccess(
        pathId: string,
        quizId: string,
        questionId: string,
        studentId: string
    ): Promise<Either<QuestionValidationError, boolean>> {
        // Implementation of validation logic
    }

    async getQuestionData(
        questionId: string,
        questionType: QuestionType
    ): Promise<Either<QuestionValidationError, QuestionData>> {
        // Implementation to get question data
    }

    async saveQuestionResult(params: {
        pathId: string;
        quizId: string;
        questionId: string;
        studentId: string;
        studentResponse: any;
        score: number;
        isValidResponse: boolean;
        questionType: QuestionType;
    }): Promise<Either<QuestionValidationError, boolean>> {
        // Implementation to save results
    }
}