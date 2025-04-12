import {
  Body,
  Controller,
  HttpException,
  Inject,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common"

import { ConfirmedGuard } from "../../../common/confirmed.guard"
import { RoleGuard } from "../../../common/role.guard"
import { ValidateMongoId } from "../../../common/validate-mongo-id.pipe"
import { Role, Routes, UseCases } from "../../../utils/constants"
import { CompleteMultipleChoiceQuestionArgs } from "./complete-multiple-choice-question-args"
import { ICompleteMultipleChoiceQuestionUseCase } from "./i-complete-multiple-choice-question-use-case"

@Controller(Routes.explore)
@UseGuards(new ConfirmedGuard())
@UseGuards(RoleGuard(Role.student))
export class CompleteMultipleChoiceQuestionController {
  constructor(
    @Inject(UseCases.completeMultipleChoiceQuestion)
    private readonly completeMultipleChoiceQuestionUseCase: ICompleteMultipleChoiceQuestionUseCase,
  ) {}

  @Post(
    `${Routes.paths}/:pathId/${Routes.quizzes}/:quizId/${Routes.multipleChoiceQuestions}/:questionId/${Routes.completed}`,
  )
  async completeMultipleChoiceQuestions(
    @Body() args: CompleteMultipleChoiceQuestionArgs,
    @Body("userId", new ValidateMongoId()) studentId: string,
    @Param("pathId", new ValidateMongoId()) pathId: string,
    @Param("quizId", new ValidateMongoId()) quizId: string,
    @Param("questionId", new ValidateMongoId()) questionId: string,
  ) {
    const completedMultipleChoiceQuestion =
      await this.completeMultipleChoiceQuestionUseCase.execute({
        ...args,
        pathId,
        questionId,
        quizId,
        studentId,
      })

    if (completedMultipleChoiceQuestion.isLeft()) {
      const { code, message, status } = completedMultipleChoiceQuestion.error
      throw new HttpException({ code, message }, status)
    }

    return completedMultipleChoiceQuestion.value
  }
}
