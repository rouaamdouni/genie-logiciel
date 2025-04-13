import { Injectable } from "@nestjs/common"
import { Types } from "mongoose"
import { IMapper } from "src/common/mapper"

import { SubQuizMetadata } from "./sub-quiz-metadata.domain"
import { SubQuizMetadataDTO } from "./sub-quiz-metadata.dto"

@Injectable()
export class SubQuizMetadataMapper
  implements IMapper<SubQuizMetadata, SubQuizMetadataDTO>
{
  toDomain(raw: any): SubQuizMetadata {
    return new SubQuizMetadata(
      raw.quiz.toString(),
      raw.question.toString(),
      raw.questionType,
      raw.score,
      raw.difficulty,
      raw.estimatedTime,
      new Date(raw.createdAt),
      new Date(raw.updatedAt),
      raw.deletedAt && new Date(raw.deletedAt),
    )
  }

  toDTO(domain: SubQuizMetadata): SubQuizMetadataDTO {
    return new SubQuizMetadataDTO(
      domain.quiz,
      domain.question,
      domain.questionType,
      domain.score,
      domain.difficulty,
      domain.estimatedTime,
      domain.createdAt,
      domain.updatedAt,
    )
  }

  toPersistence(domain: SubQuizMetadata) {
    return {
      createdAt: domain.createdAt,
      deletedAt: domain.deletedAt,
      difficulty: domain.difficulty,
      estimatedTime: domain.estimatedTime,
      question: new Types.ObjectId(domain.question),
      questionType: domain.questionType,
      quiz: new Types.ObjectId(domain.quiz),
      score: domain.score,
      updatedAt: domain.updatedAt,
    }
  }
}
