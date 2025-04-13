import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common"

import { JwtMiddleware } from "../../../common/jwt.middleware"
import { LoggedMiddleware } from "../../../common/logged.middleware"
import { UseCases } from "../../../utils/constants"
import { AccessModule } from "../../access/access.module"
import { QuizModule } from "../../quiz/quiz.module"
import { SubQuizCreatedModule } from "../../sub_quiz_metadata/sub_quiz_created/sub-quiz-created.module"
import { SubQuizMetadataModule } from "../../sub_quiz_metadata/sub-quiz-metadata.module"
import { UserModule } from "../../user/user.module"
import { ChoiceQuestionModule } from "../choice-question.module"
import { CreateChoiceQuestionController } from "./create-choice-question.controller"
import { CreateChoiceQuestionUseCase } from "./create-choice-question-use-case"

@Module({
  controllers: [CreateChoiceQuestionController],
  imports: [
    AccessModule,
    UserModule,
    QuizModule,
    SubQuizMetadataModule,
    ChoiceQuestionModule,
    SubQuizCreatedModule,
  ],
  providers: [
    {
      provide: UseCases.createChoiceQuestion,
      useClass: CreateChoiceQuestionUseCase,
    },
  ],
})
export class CreateChoiceQuestionModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware, LoggedMiddleware)
      .forRoutes(CreateChoiceQuestionController)
  }
}
