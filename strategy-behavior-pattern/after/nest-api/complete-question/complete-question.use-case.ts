import { Injectable } from '@nestjs/common';
import { Either, Left, Right } from '../../../utils/either';
import { QuestionEvaluationContext } from '../strategies/question-context';
import { QuestionStrategyFactory } from '../strategies/question-strategy.factory';
import { QuestionType } from '../types/question-types';
import { QuestionValidationError } from '../../../utils/types';

@Injectable()
export class CompleteQuestionUseCase {
    constructor(
        private readonly context: QuestionEvaluationContext,
        private readonly strategyFactory: QuestionStrategyFactory,
        private readonly questionService: QuestionService
    ) { }

    async execute<T>(params: {
        questionType: QuestionType;
        pathId: string;
        quizId: string;
        questionId: string;
        studentResponse: T;
        studentId: string;
    }): Promise<Either<QuestionValidationError, QuestionEvaluationResult<T>>> {
        try {
            // Validate inputs and permissions
            const validation = await this.questionService.validateQuestionAccess(
                params.pathId,
                params.quizId,
                params.questionId,
                params.studentId
            );
            if (validation.isLeft()) return Left.create(validation.error);

            // Get question data
            const questionData = await this.questionService.getQuestionData(
                params.questionId,
                params.questionType
            );
            if (questionData.isLeft()) return Left.create(questionData.error);

            // Evaluate response
            const strategy = this.strategyFactory.getStrategy(params.questionType);
            this.context.setStrategy(strategy);

            const evaluation = await this.context.evaluate(
                params.studentResponse,
                questionData.value.correctAnswer,
                questionData.value.maxScore
            );

            // Save results
            const saveResult = await this.questionService.saveQuestionResult({
                ...params,
                score: evaluation.score,
                isValidResponse: evaluation.isValidResponse
            });
            if (saveResult.isLeft()) return Left.create(saveResult.error);

            return Right.create(evaluation);
        } catch (error) {
            return Left.create({
                code: 'internal_error',
                message: 'Failed to complete question',
                status: 500
            });
        }
    }
}