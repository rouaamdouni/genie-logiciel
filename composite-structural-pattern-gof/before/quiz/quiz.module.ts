import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { Mappers, Models, Repos } from "src/utils/constants"

import { QuizSchema } from "../../../database/mongo/models/quiz"
import { QuizMapper } from "./config/quiz.mapper"
import { QuizRepo } from "./config/quiz.repo"

const quizModel = MongooseModule.forFeature([
  { name: Models.quizzes, schema: QuizSchema },
])

@Module({
  exports: [
    { provide: Repos.quiz, useClass: QuizRepo },
    { provide: Mappers.quiz, useClass: QuizMapper },
  ],
  imports: [quizModel],
  providers: [
    { provide: Repos.quiz, useClass: QuizRepo },
    { provide: Mappers.quiz, useClass: QuizMapper },
  ],
})
export class QuizModule {}
