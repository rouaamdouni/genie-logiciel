import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common"

import { JwtMiddleware } from "../../../common/jwt.middleware"
import { LoggedMiddleware } from "../../../common/logged.middleware"
import { UseCases } from "../../../utils/constants"
import { AccessModule } from "../../access/access.module"
import { CompletedNodeModule } from "../../completed_node/completed-node.module"
import { CompletedQuizModule } from "../../completed_quiz/completed-quiz.module"
import { CompletedSubQuizModule } from "../../completed_sub_quiz/completed-sub-quiz.module"
import { SubQuizCompletedModule } from "../../completed_sub_quiz/sub_quiz_completed/sub-quiz-completed.module"
import { EnrolledPathModule } from "../../enrolled_path/enrolled-path.module"
import { PathModule } from "../../path/path.module"
import { PathItemModule } from "../../path_item/path-item.module"
import { QuizModule } from "../../quiz/quiz.module"
import { SubQuizMetadataModule } from "../../sub_quiz_metadata/sub-quiz-metadata.module"
import { UniqueChoiceQuestion } from "../../unique_choice_question/config/unique-choice-question.domain"
import { UniqueChoiceQuestionModule } from "../../unique_choice_question/unique-choice-question.module"
import { UserModule } from "../../user/user.module"
import { CompletedUniqueChoiceQuestionModule } from "../completed-unique-choice-question.module"
import { CompleteUniqueChoiceQuestionController } from "./complete-unique-choice-question.controller"
import { CompleteUniqueChoiceQuestionUseCase } from "./complete-unique-choice-question-use-case"

@Module({
  controllers: [CompleteUniqueChoiceQuestionController],
  imports: [
    AccessModule,
    UserModule,
    CompletedUniqueChoiceQuestionModule,
    PathModule,
    QuizModule,
    PathItemModule,
    UniqueChoiceQuestionModule,
    SubQuizMetadataModule,
    EnrolledPathModule,
    CompletedQuizModule,
    CompletedNodeModule,
    CompletedSubQuizModule,
    SubQuizCompletedModule,
  ],
  providers: [
    {
      provide: UseCases.completeUniqueChoiceQuestion,
      useClass: CompleteUniqueChoiceQuestionUseCase,
    },
  ],
})
export class CompleteUniqueChoiceQuestionModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware, LoggedMiddleware)
      .forRoutes(CompleteUniqueChoiceQuestionController)
  }
}
