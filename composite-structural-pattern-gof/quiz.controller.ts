import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  NotFoundException,
} from "@nestjs/common";
import { QuizService } from "./quiz.service";
import { CreateQuestionArgs } from "./create-question-args";

@Controller("quizzes")
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post(":quizId/question")
  addQuestion(
    @Param("quizId") quizId: string,
    @Body() createQuestionDto: CreateQuestionArgs
  ): string {
    try {
      return this.quizService.addQuestion(quizId, createQuestionDto);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
