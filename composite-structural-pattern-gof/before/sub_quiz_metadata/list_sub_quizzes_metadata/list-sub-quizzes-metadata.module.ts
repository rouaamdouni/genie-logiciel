import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common"

import { JwtMiddleware } from "../../../common/jwt.middleware"
import { LoggedMiddleware } from "../../../common/logged.middleware"
import { UseCases } from "../../../utils/constants"
import { AccessModule } from "../../access/access.module"
import { QuizModule } from "../../quiz/quiz.module"
import { UserModule } from "../../user/user.module"
import { SubQuizMetadataModule } from "../sub-quiz-metadata.module"
import { ListSubQuizzesMetadataController } from "./list-sub-quizzes-metadata.controller"
import { ListSubQuizzesMetadataUseCase } from "./list-sub-quizzes-metadata-use-case"

@Module({
  controllers: [ListSubQuizzesMetadataController],
  imports: [AccessModule, UserModule, QuizModule, SubQuizMetadataModule],
  providers: [
    {
      provide: UseCases.listSubQuizzesMetadata,
      useClass: ListSubQuizzesMetadataUseCase,
    },
  ],
})
export class ListSubQuizzesMetadataModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware, LoggedMiddleware)
      .forRoutes(ListSubQuizzesMetadataController)
  }
}
