import { Inject, Injectable } from "@nestjs/common"

import { IMapper } from "../../../common/mapper"
import { Mappers, Repos } from "../../../utils/constants"
import { Right } from "../../../utils/either"
import { EnrolledPath } from "../config/enrolled-path.domain"
import { EnrolledPathDTO } from "../config/enrolled-path.dto"
import { IEnrolledPathRepo } from "../config/i-enrolled-path.repo"
import {
  IListEnrolledPathsUseCase,
  ListEnrolledPathsResult,
} from "./i-list-enrolled-paths-use-case"

@Injectable()
export class ListEnrolledPathsUseCase implements IListEnrolledPathsUseCase {
  constructor(
    @Inject(Repos.enrolledPath)
    private readonly enrolledPathRepo: IEnrolledPathRepo,
    @Inject(Mappers.enrolledPath)
    private readonly enrolledPathMapper: IMapper<EnrolledPath, EnrolledPathDTO>,
  ) {}

  async execute(studentId: string): Promise<ListEnrolledPathsResult> {
    const paths = await this.enrolledPathRepo.listByStudentId(studentId)
    const mappedPaths = paths.map(this.enrolledPathMapper.toDTO)
    return Right.create(mappedPaths)
  }
}
