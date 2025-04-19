import { HttpStatus, Inject, Injectable } from "@nestjs/common"

import { Repos } from "../../../utils/constants"
import { Left, Right } from "../../../utils/either"
import { IChallengeRepo } from "../../challenge/config/i-challenge.repo"
import { IEnrolledChallengeRepo } from "../../enrolled_challenge/config/i-enrolled-challenge.repo"
import { IStatisticsRepo } from "../../statistics/config/i-statistics.repo"
import { IUserRepo } from "../../user/config/i-user.repo"
import {
  IRateChallengeUseCase,
  RateChallengeArgs,
  RateChallengeResult,
} from "./i-rate-challenge-use-case"

@Injectable()
export class RateChallengeUseCase implements IRateChallengeUseCase {
  constructor(
    @Inject(Repos.enrolledChallenge)
    private readonly enrolledChallengeRepo: IEnrolledChallengeRepo,
    @Inject(Repos.challenge) private readonly challengeRepo: IChallengeRepo,
    @Inject(Repos.user) private readonly userRepo: IUserRepo,
    @Inject(Repos.statistics) private readonly statisticsRepo: IStatisticsRepo,
  ) {}

  async execute(args: RateChallengeArgs): Promise<RateChallengeResult> {
    const existingUser = await this.userRepo.getById(args.studentId)
    if (!existingUser)
      return Left.create({
        code: "user_not_found",
        message: "student does not exist",
        status: HttpStatus.NOT_FOUND,
      })

    const existingChallenge = await this.challengeRepo.getById(args.challengeId)
    if (!existingChallenge)
      return Left.create({
        code: "challenge_not_found",
        message: "challenge does not exist",
        status: HttpStatus.NOT_FOUND,
      })

    const existingEnrolledChallenge = await this.enrolledChallengeRepo.get(
      args.studentId,
      args.challengeId,
    )

    if (!existingEnrolledChallenge)
      return Left.create({
        code: "challenge_not_enrolled",
        message: "challenge not enrolled",
        status: HttpStatus.BAD_REQUEST,
      })

    if (existingEnrolledChallenge.isRated)
      return Left.create({
        code: "challenge_rated",
        message: "this challenge is already rated",
        status: HttpStatus.BAD_REQUEST,
      })

    await this.enrolledChallengeRepo.save({
      ...existingEnrolledChallenge,
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
