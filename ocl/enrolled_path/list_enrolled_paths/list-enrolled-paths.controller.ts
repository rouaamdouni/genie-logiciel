import { Body, Controller, Get, Inject, UseGuards } from "@nestjs/common"

import { ConfirmedGuard } from "../../../common/confirmed.guard"
import { RoleGuard } from "../../../common/role.guard"
import { ValidateMongoId } from "../../../common/validate-mongo-id.pipe"
import { Role, Routes, UseCases } from "../../../utils/constants"
import { IListEnrolledPathsUseCase } from "./i-list-enrolled-paths-use-case"

@Controller(Routes.explore)
@UseGuards(new ConfirmedGuard())
@UseGuards(RoleGuard(Role.student))
export class ListEnrolledPathsController {
  constructor(
    @Inject(UseCases.listEnrolledPaths)
    private readonly listEnrolledPathsUseCase: IListEnrolledPathsUseCase,
  ) {}

  @Get(`${Routes.paths}/${Routes.enrolled}`)
  async listEnrolledPath(
    @Body("userId", new ValidateMongoId()) studentId: string,
  ) {
    const enrolledPaths = await this.listEnrolledPathsUseCase.execute(studentId)
    if (enrolledPaths.isRight()) return { enrolledPaths: enrolledPaths.value }
  }
}
