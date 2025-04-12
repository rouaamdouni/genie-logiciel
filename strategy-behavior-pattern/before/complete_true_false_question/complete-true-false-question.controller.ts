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
import { CompleteTrueFalseQuestionArgs } from "./complete-true-false-question-args"
import { ICompleteTrueFalseQuestionUseCase } from "./i-complete-true-false-question-use-case"

@Controller(Routes.explore)
@UseGuards(new ConfirmedGuard())
@UseGuards(RoleGuard(Role.student))
export class CompleteTrueFalseQuestionController {
  constructor(
    @Inject(UseCases.completeTrueFalseQuestion)
    private readonly completeTrueFalseQuestionUseCase: ICompleteTrueFalseQuestionUseCase,
  ) {}

  @Post(
    `${Routes.paths}/:pathId/${Routes.quizzes}/:quizId/${Routes.trueFalseQuestions}/:questionId/${Routes.completed}`,
  )
  async completeTrueFalseQuestions(
    @Body() args: CompleteTrueFalseQuestionArgs,
    @Body("userId", new ValidateMongoId()) studentId: string,
    @Param("pathId", new ValidateMongoId()) pathId: string,
    @Param("quizId", new ValidateMongoId()) quizId: string,
    @Param("questionId", new ValidateMongoId()) questionId: string,
  ) {
    const completedTrueFalseQuestion =
      await this.completeTrueFalseQuestionUseCase.execute({
        ...args,
        pathId,
        questionId,
        quizId,
        studentId,
      })

    if (completedTrueFalseQuestion.isLeft()) {
      const { code, message, status } = completedTrueFalseQuestion.error
      throw new HttpException({ code, message }, status)
    }

    return completedTrueFalseQuestion.value
  }
}
