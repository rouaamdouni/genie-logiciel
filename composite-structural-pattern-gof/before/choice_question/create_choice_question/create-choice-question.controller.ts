import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  Res,
  UseGuards,
} from "@nestjs/common"
import { Response } from "express"

import { ConfirmedGuard } from "../../../common/confirmed.guard"
import { RoleGuard } from "../../../common/role.guard"
import { ValidateMongoId } from "../../../common/validate-mongo-id.pipe"
import { Role, Routes, UseCases } from "../../../utils/constants"
import { CreateSubQuizArgs } from "./create-sub-quiz-args"
import { ICreateChoiceQuestionUseCase } from "./i-create-choice-question-use-case"

@Controller(Routes.quizzes)
@UseGuards(new ConfirmedGuard())
@UseGuards(RoleGuard(Role.content_creator))
export class CreateChoiceQuestionController {
  constructor(
    @Inject(UseCases.createChoiceQuestion)
    private readonly createChoiceQuestionUseCase: ICreateChoiceQuestionUseCase,
  ) {}

  @Post(`:quizId/${Routes.choiceQuestions}`)
  async createSubQuiz(
    @Body() args: CreateSubQuizArgs,
    @Param("quizId", new ValidateMongoId()) quizId: string,
    @Res() res: Response,
  ) {
    const createdSubQuiz = await this.createChoiceQuestionUseCase.execute({
      ...args,
      quizId,
    })

    if (createdSubQuiz.isLeft()) {
      const { code, message, status } = createdSubQuiz.error
      throw new HttpException({ code, message }, status)
    }

    return res.status(HttpStatus.CREATED).json(createdSubQuiz.value)
  }
}
