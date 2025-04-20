import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common"

import { JwtMiddleware } from "../../../common/jwt.middleware"
import { LoggedMiddleware } from "../../../common/logged.middleware"
import { UseCases } from "../../../utils/constants"
import { AccessModule } from "../../access/access.module"
import { AffectModule } from "../../affect/affect.module"
import { CompletedNodeModule } from "../../completed_node/completed-node.module"
import { NodeCompletedModule } from "../../completed_node/node_completed/node-completed.module"
import { CompletedRewardModule } from "../../completed_reward/completed-reward.module"
import { EnrolledPathModule } from "../../enrolled_path/enrolled-path.module"
import { PathModule } from "../../path/path.module"
import { PathItemModule } from "../../path_item/path-item.module"
import { RewardModule } from "../../reward/reward.module"
import { StatisticsModule } from "../../statistics/statistics.module"
import { UserModule } from "../../user/user.module"
import { RateRewardController } from "./rate-reward.controller"
import { RateRewardUseCase } from "./rate-reward-use-case"
import { Repos } from "../utils/constants"
import {
  StudentExistsValidator,
  PathExistsValidator,
  InstructorIsAffectedValidator,
  StudentIsEnrolledValidator,
  RewardExistsValidator,
  RewardInPathValidator,
  RewardStartedValidator,
  RewardNotRatedValidator,
}
  from "../validators/index"
@Module({
  controllers: [RateRewardController],
  imports: [
    AccessModule,
    UserModule,
    PathModule,
    RewardModule,
    PathItemModule,
    AffectModule,
    StatisticsModule,
    EnrolledPathModule,
    CompletedRewardModule,
    CompletedNodeModule,
    NodeCompletedModule,
  ],
  providers: [
    {
      provide: Repos.RateRewardValidators,
      useFactory: (
        studentValidator: StudentExistsValidator,
        pathValidator: PathExistsValidator,
        instructorValidator: InstructorIsAffectedValidator,
        enrolledValidator: StudentIsEnrolledValidator,
        rewardValidator: RewardExistsValidator,
        inPathValidator: RewardInPathValidator,
        startedValidator: RewardStartedValidator,
        notRatedValidator: RewardNotRatedValidator,
      ) => [
          studentValidator,
          pathValidator,
          instructorValidator,
          enrolledValidator,
          rewardValidator,
          inPathValidator,
          startedValidator,
          notRatedValidator,
        ],
      inject: [
        StudentExistsValidator,
        PathExistsValidator,
        InstructorIsAffectedValidator,
        StudentIsEnrolledValidator,
        RewardExistsValidator,
        RewardInPathValidator,
        RewardStartedValidator,
        RewardNotRatedValidator,
      ],
    },
    // Register all as providers too
    RewardExistsValidator,
    RewardInPathValidator,
    RewardStartedValidator,
    RewardNotRatedValidator,
    , {
      provide: UseCases.rateReward,
      useClass: RateRewardUseCase,
    },
  ],
})
export class RateRewardModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware, LoggedMiddleware)
      .forRoutes(RateRewardController)
  }
}
