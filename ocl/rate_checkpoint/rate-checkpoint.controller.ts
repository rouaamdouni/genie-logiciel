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
import { IRateCheckpointUseCase } from "./i-rate-checkpoint-use-case"
import { RateCheckpointArgs } from "./rate-checkpoint-args"

@Controller(Routes.reviews)
@UseGuards(new ConfirmedGuard())
@UseGuards(RoleGuard(Role.instructor))
export class RateCheckpointController {
  constructor(
    @Inject(UseCases.rateCheckpoint)
    private readonly rateCheckpointUseCase: IRateCheckpointUseCase,
  ) {}

  @Post(
    `${Routes.paths}/:pathId/${Routes.students}/:studentId/${Routes.checkpoints}/:checkpointId`,
  )
  async rateCheckpoint(
    @Param("pathId", new ValidateMongoId()) pathId: string,
    @Param("studentId", new ValidateMongoId()) studentId: string,
    @Param("checkpointId", new ValidateMongoId()) checkpointId: string,
    @Body("userId", new ValidateMongoId()) instructorId: string,
    @Body() args: RateCheckpointArgs,
  ) {
    const ratedCheckpoint = await this.rateCheckpointUseCase.execute({
      checkpointId,
      instructorId,
      pathId,
      studentId,
      ...args,
    })

    if (ratedCheckpoint.isLeft()) {
      const { code, message, status } = ratedCheckpoint.error
      throw new HttpException({ code, message }, status)
    }

    return ratedCheckpoint.value
  }
}
