import { HttpStatus, Inject, Injectable } from "@nestjs/common"

import { IMapper } from "../../../common/mapper"
import { Mappers, Repos } from "../../../utils/constants"
import { Left, Right } from "../../../utils/either"
import { IQuizRepo } from "../../quiz/config/i-quiz.repo"
import { ISubQuizMetadataRepo } from "../config/i-sub-quiz-metadata.repo"
import { SubQuizMetadata } from "../config/sub-quiz-metadata.domain"
import { SubQuizMetadataDTO } from "../config/sub-quiz-metadata.dto"
import {
  IListSubQuizzesMetadataUseCase,
  ListSubQuizzesMetadataResult,
} from "./i-list-sub-quizzes-metadata-use-case"

@Injectable()
export class ListSubQuizzesMetadataUseCase
  implements IListSubQuizzesMetadataUseCase
{
  constructor(
    @Inject(Repos.subQuizMetadata)
    private readonly subQuizMetadataRepo: ISubQuizMetadataRepo,
    @Inject(Repos.quiz) private readonly quizRepo: IQuizRepo,
    @Inject(Mappers.subQuizMetadata)
    private readonly subQuizMetadataMapper: IMapper<
      SubQuizMetadata,
      SubQuizMetadataDTO
    >,
  ) {}

  async execute(quizId: string): Promise<ListSubQuizzesMetadataResult> {
    const exitingQuiz = await this.quizRepo.getById({ quizId })
    if (!exitingQuiz)
      return Left.create({
        code: "quiz_not_found",
        message: "quiz not found",
        status: HttpStatus.NOT_FOUND,
      })

    const subQuizzesMetadata = await this.subQuizMetadataRepo.list(quizId)
    const mappedSubQuizzesMetadata = subQuizzesMetadata.map(
      this.subQuizMetadataMapper.toDTO,
    )

    return Right.create(mappedSubQuizzesMetadata)
  }
}
