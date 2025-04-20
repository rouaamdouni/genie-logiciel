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
import { Repos } from "../utils/constants"
import {
  ChallengeExistsValidator,
  StudentExistsValidator,
  StudentIsEnrolledValidator,
  InstructorIsAffectedValidator,
  ChallengeNotRatedValidator
}
  from "../validators/index"
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
    //  Group all validators into a single array and bind it to the token
    {
      provide: Repos.RateChallengeValidators,
      useFactory: (
        studentValidator: StudentExistsValidator,
        enrolledValidator: StudentIsEnrolledValidator,
        challengeValidator: ChallengeExistsValidator,
        notRatedValidator: ChallengeNotRatedValidator,
        instructorValidator: InstructorIsAffectedValidator,
      ) => [studentValidator,
          enrolledValidator,
          challengeValidator,
          notRatedValidator,
          instructorValidator,],
      inject: [
        StudentExistsValidator,
        StudentIsEnrolledValidator,
        ChallengeExistsValidator,
        ChallengeNotRatedValidator,
        InstructorIsAffectedValidator,
      ],
    },

    // ✅ Register each validator class as a provider
    StudentExistsValidator,
    StudentIsEnrolledValidator,
    ChallengeExistsValidator,
    ChallengeNotRatedValidator,
    InstructorIsAffectedValidator,

    // ✅ Register the Use Case
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