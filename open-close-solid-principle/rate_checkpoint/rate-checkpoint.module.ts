import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common"

import { JwtMiddleware } from "../../../common/jwt.middleware"
import { LoggedMiddleware } from "../../../common/logged.middleware"
import { UseCases } from "../../../utils/constants"
import { AccessModule } from "../../access/access.module"
import { AffectModule } from "../../affect/affect.module"
import { CheckpointModule } from "../../checkpoint/checkpoint.module"
import { CompletedCheckpointModule } from "../../completed_checkpoint/completed-checkpoint.module"
import { CompletedNodeModule } from "../../completed_node/completed-node.module"
import { NodeCompletedModule } from "../../completed_node/node_completed/node-completed.module"
import { EnrolledPathModule } from "../../enrolled_path/enrolled-path.module"
import { PathModule } from "../../path/path.module"
import { PathItemModule } from "../../path_item/path-item.module"
import { StatisticsModule } from "../../statistics/statistics.module"
import { UserModule } from "../../user/user.module"
import { RateCheckpointController } from "./rate-checkpoint.controller"
import { RateCheckpointUseCase } from "./rate-checkpoint-use-case"
import { Repos } from "../utils/constants"
import {
  StudentExistsValidator,
  StudentIsEnrolledValidator,
  InstructorIsAffectedValidator,
  PathExistsValidator,
  CheckpointInPathValidator,
  CheckpointStartedValidator,
  CheckpointNotRatedValidator,
  CheckpointExistsValidator
}
  from "../validators/index"

@Module({
  controllers: [RateCheckpointController],
  imports: [
    AccessModule,
    UserModule,
    PathModule,
    CheckpointModule,
    PathItemModule,
    AffectModule,
    StatisticsModule,
    EnrolledPathModule,
    CompletedCheckpointModule,
    CompletedNodeModule,
    NodeCompletedModule,

  ],
  providers: [
    {
      provide: Repos.RateCheckpointValidators,
      useFactory: (
        studentValidator: StudentExistsValidator,
        pathValidator: PathExistsValidator,
        instructorValidator: InstructorIsAffectedValidator,
        enrolledValidator: StudentIsEnrolledValidator,
        checkpointValidator: CheckpointExistsValidator,
        inPathValidator: CheckpointInPathValidator,
        startedValidator: CheckpointStartedValidator,
        notRatedValidator: CheckpointNotRatedValidator,
      ) => [
          studentValidator,
          pathValidator,
          instructorValidator,
          enrolledValidator,
          checkpointValidator,
          inPathValidator,
          startedValidator,
          notRatedValidator,
        ],
      inject: [
        StudentExistsValidator,
        PathExistsValidator,
        InstructorIsAffectedValidator,
        StudentIsEnrolledValidator,
        CheckpointExistsValidator,
        CheckpointInPathValidator,
        CheckpointStartedValidator,
        CheckpointNotRatedValidator,
      ],
    },
    CheckpointExistsValidator,
    CheckpointInPathValidator,
    CheckpointStartedValidator,
    CheckpointNotRatedValidator,
    , {
      provide: UseCases.rateCheckpoint,
      useClass: RateCheckpointUseCase,
    },
  ],
})
export class RateCheckpointModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware, LoggedMiddleware)
      .forRoutes(RateCheckpointController)
  }
}
