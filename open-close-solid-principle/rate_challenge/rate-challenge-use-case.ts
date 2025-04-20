import { Inject, Injectable } from "@nestjs/common"

import { Repos } from "../../../utils/constants"
import { Right } from "../../../utils/either"
import {
  IRateChallengeUseCase,
  RateChallengeArgs,
  RateChallengeResult,
} from "./i-rate-challenge-use-case"
import { IRateValidator } from "../interfaces/IRateValidator"
import { IEnrolledChallengeRepo } from "../../enrolled_challenge/config/i-enrolled-challenge.repo"
import { IStatisticsRepo } from "../../statistics/config/i-statistics.repo"

@Injectable()
export class RateChallengeUseCase implements IRateChallengeUseCase {
  constructor(
    @Inject(Repos.RateChallengeValidators)
    private readonly validators: IRateValidator<RateChallengeArgs>[],

    @Inject(Repos.enrolledChallenge)
    private readonly enrolledChallengeRepo: IEnrolledChallengeRepo,

    @Inject(Repos.statistics)
    private readonly statisticsRepo: IStatisticsRepo,
  ) { }

  async execute(args: RateChallengeArgs): Promise<RateChallengeResult> {
    for (const validator of this.validators) {
      const result = await validator.validate(args)
      if (result.isLeft()) return result
    }

    const existingEnrolledChallenge = await this.enrolledChallengeRepo.get(
      args.studentId,
      args.challengeId,
    )

    await this.enrolledChallengeRepo.save({
      ...existingEnrolledChallenge!,
      feedbackDocumentURL: args.feedbackDocumentURL,
      isRated: true,
      updatedAt: new Date(),
    })

    const existingStatistics = await this.statisticsRepo.get(args.studentId)
    await this.statisticsRepo.update({
      ...(existingStatistics || {}),
      score: existingStatistics
        ? existingStatistics.score + args.rate
        : args.rate,
      studentId: existingStatistics
        ? existingStatistics.studentId
        : args.studentId,
    })

    return Right.create({
      isSuccess: true,
      message: "Challenge rated successfully",
      payload: { challengeId: args.challengeId, studentId: args.studentId },
    })
  }
}
