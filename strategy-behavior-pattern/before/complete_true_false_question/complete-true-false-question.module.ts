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
import { TrueFalseQuestionModule } from "../../true_false_question/true-false-question.module"
import { UserModule } from "../../user/user.module"
import { CompletedTrueFalseQuestionModule } from "../completed-true-false-question.module"
import { CompleteTrueFalseQuestionController } from "./complete-true-false-question.controller"
import { CompleteTrueFalseQuestionUseCase } from "./complete-true-false-question-use-case"

@Module({
  controllers: [CompleteTrueFalseQuestionController],
  imports: [
    AccessModule,
    UserModule,
    CompletedTrueFalseQuestionModule,
    PathModule,
    QuizModule,
    PathItemModule,
    TrueFalseQuestionModule,
    SubQuizMetadataModule,
    EnrolledPathModule,
    CompletedQuizModule,
    CompletedNodeModule,
    CompletedSubQuizModule,
    SubQuizCompletedModule,
  ],
  providers: [
    {
      provide: UseCases.completeTrueFalseQuestion,
      useClass: CompleteTrueFalseQuestionUseCase,
    },
  ],
})
export class CompleteTrueFalseQuestionModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware, LoggedMiddleware)
      .forRoutes(CompleteTrueFalseQuestionController)
  }
}
