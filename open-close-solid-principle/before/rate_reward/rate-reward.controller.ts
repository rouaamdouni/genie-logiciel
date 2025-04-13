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
import { IRateRewardUseCase } from "./i-rate-reward-use-case"
import { RateRewardArgs } from "./rate-reward-args"

@Controller(Routes.reviews)
@UseGuards(new ConfirmedGuard())
@UseGuards(RoleGuard(Role.instructor))
export class RateRewardController {
  constructor(
    @Inject(UseCases.rateReward)
    private readonly rateRewardUseCase: IRateRewardUseCase,
  ) {}

  @Post(
    `${Routes.paths}/:pathId/${Routes.students}/:studentId/${Routes.rewards}/:rewardId`,
  )
  async rateReward(
    @Param("pathId", new ValidateMongoId()) pathId: string,
    @Param("studentId", new ValidateMongoId()) studentId: string,
    @Param("rewardId", new ValidateMongoId()) rewardId: string,
    @Body("userId", new ValidateMongoId()) instructorId: string,
    @Body() args: RateRewardArgs,
  ) {
    const ratedReward = await this.rateRewardUseCase.execute({
      instructorId,
      pathId,
      rewardId,
      studentId,
      ...args,
    })

    if (ratedReward.isLeft()) {
      const { code, message, status } = ratedReward.error
      throw new HttpException({ code, message }, status)
    }

    return ratedReward.value
  }
}
