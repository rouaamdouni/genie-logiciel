import {
  Body,
  Controller,
  HttpException,
  Inject,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common"

import { ConfirmedGuard } from "../../../common/confirmed.guard"
import { RoleGuard } from "../../../common/role.guard"
import { ValidateMongoId } from "../../../common/validate-mongo-id.pipe"
import { Role, Routes, UseCases } from "../../../utils/constants"
import { IRateChallengeUseCase } from "./i-rate-challenge-use-case"
import { RateChallengeArgs } from "./rate-challenge-args"

@Controller(Routes.reviews)
@UseGuards(new ConfirmedGuard())
@UseGuards(RoleGuard(Role.instructor))
export class RateChallengeController {
  constructor(
    @Inject(UseCases.rateChallenge)
    private readonly rateChallengeUseCase: IRateChallengeUseCase,
  ) {}

  @Post(`/${Routes.students}/:studentId/${Routes.challenges}/:challengeId`)
  async rateChallenge(
    @Param("studentId", new ValidateMongoId()) studentId: string,
    @Param("challengeId", new ValidateMongoId()) challengeId: string,
    @Body() args: RateChallengeArgs,
  ) {
    const ratedChallenge = await this.rateChallengeUseCase.execute({
      challengeId,
      studentId,
      ...args,
    })

    if (ratedChallenge.isLeft()) {
      const { code, message, status } = ratedChallenge.error
      throw new HttpException({ code, message }, status)
    }

    return ratedChallenge.value
  }
}
