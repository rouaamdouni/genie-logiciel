import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common"

import { JwtMiddleware } from "../../../common/jwt.middleware"
import { LoggedMiddleware } from "../../../common/logged.middleware"
import { UseCases } from "../../../utils/constants"
import { AccessModule } from "../../access/access.module"
import { ChallengeModule } from "../../challenge/challenge.module"
import { EnrolledChallengeModule } from "../../enrolled_challenge/enrolled-challenge.module"
import { StatisticsModule } from "../../statistics/statistics.module"
import { UserModule } from "../../user/user.module"
import { RateChallengeController } from "./rate-challenge.controller"
import { RateChallengeUseCase } from "./rate-challenge-use-case"

@Module({
  controllers: [RateChallengeController],
  imports: [
    AccessModule,
    UserModule,
    ChallengeModule,
    EnrolledChallengeModule,
    StatisticsModule,
  ],
  providers: [
    {
      provide: UseCases.rateChallenge,
      useClass: RateChallengeUseCase,
    },
  ],
})
export class RateChallengeModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware, LoggedMiddleware)
      .forRoutes(RateChallengeController)
  }
}
