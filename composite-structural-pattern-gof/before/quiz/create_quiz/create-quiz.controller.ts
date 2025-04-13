import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Post,
  Res,
  UseGuards,
} from "@nestjs/common"
import { Response } from "express"

import { ConfirmedGuard } from "../../../common/confirmed.guard"
import { RoleGuard } from "../../../common/role.guard"
import { Role, Routes, UseCases } from "../../../utils/constants"
import { CreateQuizArgs } from "./create-quiz-args"
import { ICreateQuizUseCase } from "./i-create-quiz-use-case"

@Controller(Routes.quizzes)
@UseGuards(new ConfirmedGuard())
@UseGuards(RoleGuard(Role.content_creator))
export class CreateQuizController {
  constructor(
    @Inject(UseCases.createQuiz)
    private readonly createQuizUseCase: ICreateQuizUseCase,
  ) {}

  @Post()
  async createQuiz(@Body() args: CreateQuizArgs, @Res() res: Response) {
    const createdQuiz = await this.createQuizUseCase.execute(args)
    if (createdQuiz.isRight())
      return res.status(HttpStatus.CREATED).json(createdQuiz.value)
  }
}
