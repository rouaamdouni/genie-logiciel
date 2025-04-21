import { Controller, HttpException, Inject, UseGuards } from "@nestjs/common"
import { Body, Get, Param } from "@nestjs/common/decorators/http"

import { ConfirmedGuard } from "../../../common/confirmed.guard"
import { RoleGuard } from "../../../common/role.guard"
import { ValidateMongoId } from "../../../common/validate-mongo-id.pipe"
import { Role, Routes, UseCases } from "../../../utils/constants"
import { IGetEnrolledPathUseCase } from "./i-get-enrolled-path-use-case"

@Controller(Routes.explore)
@UseGuards(new ConfirmedGuard())
@UseGuards(RoleGuard(Role.student))
export class GetEnrolledPathController {
  constructor(
    @Inject(UseCases.getEnrolledPath)
    private readonly getEnrolledPathUseCase: IGetEnrolledPathUseCase,
  ) {}

  @Get(`${Routes.paths}/:pathId/${Routes.enrolled}`)
  async getEnrolledPath(
    @Param("pathId", new ValidateMongoId()) pathId: string,
    @Body("userId", new ValidateMongoId()) studentId: string,
  ) {
    const enrolledPath = await this.getEnrolledPathUseCase.execute({
      pathId,
      studentId,
    })

    if (enrolledPath.isLeft()) {
      const { code, message, status } = enrolledPath.error
      throw new HttpException({ code, message }, status)
    }

    return { enrolledPath: enrolledPath.value }
  }
}
