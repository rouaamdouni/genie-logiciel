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
import { MultipleChoiceQuestion } from "../../multiple_choice_question/config/multiple-choice-question.domain"
import { MultipleChoiceQuestionModule } from "../../multiple_choice_question/multiple-choice-question.module"
import { PathModule } from "../../path/path.module"
import { PathItemModule } from "../../path_item/path-item.module"
import { QuizModule } from "../../quiz/quiz.module"
import { SubQuizMetadataModule } from "../../sub_quiz_metadata/sub-quiz-metadata.module"
import { UserModule } from "../../user/user.module"
import { CompletedMultipleChoiceQuestionModule } from "../completed-multiple-choice-question.module"
import { CompleteMultipleChoiceQuestionController } from "./complete-multiple-choice-question.controller"
import { CompleteMultipleChoiceQuestionUseCase } from "./complete-multiple-choice-question-use-case"

@Module({
  controllers: [CompleteMultipleChoiceQuestionController],
  imports: [
    AccessModule,
    UserModule,
    CompletedMultipleChoiceQuestionModule,
    PathModule,
    QuizModule,
    PathItemModule,
    MultipleChoiceQuestionModule,
    SubQuizMetadataModule,
    EnrolledPathModule,
    CompletedQuizModule,
    CompletedNodeModule,
    CompletedSubQuizModule,
    SubQuizCompletedModule,
  ],
  providers: [
    {
      provide: UseCases.completeMultipleChoiceQuestion,
      useClass: CompleteMultipleChoiceQuestionUseCase,
    },
  ],
})
export class CompleteMultipleChoiceQuestionModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware, LoggedMiddleware)
      .forRoutes(CompleteMultipleChoiceQuestionController)
  }
}
