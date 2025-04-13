import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common"

import { JwtMiddleware } from "../../../common/jwt.middleware"
import { LoggedMiddleware } from "../../../common/logged.middleware"
import { UseCases } from "../../../utils/constants"
import { AccessModule } from "../../access/access.module"
import { EntityCreatedModule } from "../../graph/entity_created/entity-created.module"
import { UserModule } from "../../user/user.module"
import { QuizModule } from "../quiz.module"
import { CreateQuizController } from "./create-quiz.controller"
import { CreateQuizUseCase } from "./create-quiz-use-case"

@Module({
  controllers: [CreateQuizController],
  imports: [AccessModule, UserModule, QuizModule, EntityCreatedModule],
  providers: [{ provide: UseCases.createQuiz, useClass: CreateQuizUseCase }],
})
export class CreateQuizModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware, LoggedMiddleware)
      .forRoutes(CreateQuizController)
  }
}
