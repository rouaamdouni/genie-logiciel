import {
  Controller,
  Get,
  HttpException,
  Inject,
  Param,
  UseGuards,
} from "@nestjs/common"

import { ConfirmedGuard } from "../../../common/confirmed.guard"
import { RoleGuard } from "../../../common/role.guard"
import { ValidateMongoId } from "../../../common/validate-mongo-id.pipe"
import { Role, Routes, UseCases } from "../../../utils/constants"
import { IListSubQuizzesMetadataUseCase } from "./i-list-sub-quizzes-metadata-use-case"

@Controller(Routes.quizzes)
@UseGuards(new ConfirmedGuard())
@UseGuards(RoleGuard(Role.content_creator))
export class ListSubQuizzesMetadataController {
  constructor(
    @Inject(UseCases.listSubQuizzesMetadata)
    private readonly listSubQuizzesMetadataUseCase: IListSubQuizzesMetadataUseCase,
  ) {}

  @Get(`:quizId/${Routes.subQuizzesMetadata}`)
  async listSubQuizzesMetadata(
    @Param("quizId", new ValidateMongoId()) quizId: string,
  ) {
    const subQuizzesMetadata =
      await this.listSubQuizzesMetadataUseCase.execute(quizId)

    if (subQuizzesMetadata.isLeft()) {
      const { code, message, status } = subQuizzesMetadata.error
      throw new HttpException({ code, message }, status)
    }

    return { subQuizzesMetadata: subQuizzesMetadata.value }
  }
}
