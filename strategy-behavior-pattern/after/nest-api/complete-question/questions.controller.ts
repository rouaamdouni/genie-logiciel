import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { CompleteQuestionUseCase } from './use-cases/complete-question.use-case';
import { QuestionType } from './types/question-types';
import { ConfirmedGuard } from '../../../common/confirmed.guard';
import { RoleGuard } from '../../../common/role.guard';
import { Role } from '../../../utils/constants';

@Controller('questions')
@UseGuards(new ConfirmedGuard())
@UseGuards(RoleGuard(Role.student))
export class QuestionsController {
    constructor(
        private readonly completeQuestionUseCase: CompleteQuestionUseCase
    ) { }

    @Post(':type/:pathId/:quizId/:questionId/completed')
    async completeQuestion(
        @Param('type') questionType: QuestionType,
        @Param('pathId') pathId: string,
        @Param('quizId') quizId: string,
        @Param('questionId') questionId: string,
        @Body() body: { studentResponse: any, userId: string }
    ) {
        const result = await this.completeQuestionUseCase.execute({
            questionType,
            pathId,
            quizId,
            questionId,
            studentResponse: body.studentResponse,
            studentId: body.userId
        });

        if (result.isLeft()) {
            const error = result.error;
            throw new HttpException(
                { code: error.code, message: error.message },
                error.status
            );
        }

        return result.value;
    }
}