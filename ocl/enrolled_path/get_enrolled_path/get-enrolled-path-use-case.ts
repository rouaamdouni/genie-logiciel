import { HttpStatus, Injectable } from "@nestjs/common"
import { Inject } from "@nestjs/common/decorators/core"

import { IMapper } from "../../../common/mapper"
import { Mappers, Repos } from "../../../utils/constants"
import { Left, Right } from "../../../utils/either"
import { EnrolledPath } from "../config/enrolled-path.domain"
import { EnrolledPathDTO } from "../config/enrolled-path.dto"
import { IEnrolledPathRepo } from "../config/i-enrolled-path.repo"
import {
  GetEnrolledPathArgs,
  GetEnrolledPathResult,
  IGetEnrolledPathUseCase,
} from "./i-get-enrolled-path-use-case"

@Injectable()
export class GetEnrolledPathUseCase implements IGetEnrolledPathUseCase {
  constructor(
    @Inject(Mappers.enrolledPath)
    private readonly enrolledPathMapper: IMapper<EnrolledPath, EnrolledPathDTO>,
    @Inject(Repos.enrolledPath)
    private readonly enrolledPathRepo: IEnrolledPathRepo,
  ) {}

  async execute(args: GetEnrolledPathArgs): Promise<GetEnrolledPathResult> {
    const existingEnrolledPath = await this.enrolledPathRepo.get({
      pathId: args.pathId,
      studentId: args.studentId,
    })

    if (!existingEnrolledPath)
      return Left.create({
        code: "not_enrolled",
        message: "student not enrolled",
        status: HttpStatus.BAD_REQUEST,
      })

    const mappedEnrolledPath =
      this.enrolledPathMapper.toDTO(existingEnrolledPath)
    return Right.create(mappedEnrolledPath)
  }
}
