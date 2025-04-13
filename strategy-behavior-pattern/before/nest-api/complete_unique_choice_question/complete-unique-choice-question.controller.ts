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
import { CompleteUniqueChoiceQuestionArgs } from "./complete-unique-choice-question-args"
import { ICompleteUniqueChoiceQuestionUseCase } from "./i-complete-unique-choice-question-use-case"

@Controller(Routes.explore)
@UseGuards(new ConfirmedGuard())
@UseGuards(RoleGuard(Role.student))
export class CompleteUniqueChoiceQuestionController {
  constructor(
    @Inject(UseCases.completeUniqueChoiceQuestion)
    private readonly completeUniqueChoiceQuestionUseCase: ICompleteUniqueChoiceQuestionUseCase,
  ) {}

  @Post(
    `${Routes.paths}/:pathId/${Routes.quizzes}/:quizId/${Routes.uniqueChoiceQuestions}/:questionId/${Routes.completed}`,
  )
  async completeUniqueChoiceQuestions(
    @Body() args: CompleteUniqueChoiceQuestionArgs,
    @Body("userId", new ValidateMongoId()) studentId: string,
    @Param("pathId", new ValidateMongoId()) pathId: string,
    @Param("quizId", new ValidateMongoId()) quizId: string,
    @Param("questionId", new ValidateMongoId()) questionId: string,
  ) {
    const completedUniqueChoiceQuestion =
      await this.completeUniqueChoiceQuestionUseCase.execute({
        ...args,
        pathId,
        questionId,
        quizId,
        studentId,
      })

    if (completedUniqueChoiceQuestion.isLeft()) {
      const { code, message, status } = completedUniqueChoiceQuestion.error
      throw new HttpException({ code, message }, status)
    }

    return completedUniqueChoiceQuestion.value
  }
}
