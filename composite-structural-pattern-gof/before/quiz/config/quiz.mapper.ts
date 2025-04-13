import { Injectable } from "@nestjs/common"
import { Types } from "mongoose"
import { IMapper } from "src/common/mapper"

import { Quiz } from "./quiz.domain"
import { QuizDTO } from "./quiz.dto"

@Injectable()
export class QuizMapper implements IMapper<Quiz, QuizDTO> {
  toDomain(raw: any): Quiz {
    return new Quiz(
      raw._id.toString(),
      raw.slug,
      raw.label.map((item: any) => ({
        content: item.content,
        language: item.language,
      })),
      raw.metaTags.map((metaTag: Array<any>) =>
        metaTag.map((translation) => ({
          content: translation.content,
          language: translation.language,
        })),
      ),
      raw.defaultLanguage,
      raw.questionsCount,
      raw.totalTime,
      raw.score,
      raw.difficulty,
      new Date(raw.createdAt),
      new Date(raw.updatedAt),
      raw.deletedAt && new Date(raw.deletedAt),
    )
  }

  toDTO(domain: Quiz): QuizDTO {
    return new QuizDTO(
      domain.quizId,
      domain.slug,
      domain.label,
      domain.metaTags,
      domain.defaultLanguage,
      domain.questionsCount,
      domain.totalTime,
      domain.score,
      domain.difficulty,
      domain.createdAt,
      domain.updatedAt,
    )
  }

  toPersistence(domain: Quiz) {
    return {
      _id: new Types.ObjectId(domain.quizId),
      createdAt: domain.createdAt,
      defaultLanguage: domain.defaultLanguage,
      deletedAt: domain.deletedAt,
      difficulty: domain.difficulty,
      label: domain.label.map((label) => ({
        content: label.content,
        language: label.language,
      })),
      metaTags: domain.metaTags.map((metaTag) =>
        metaTag.map((translation) => ({
          content: translation.content,
          language: translation.language,
        })),
      ),
      questionsCount: domain.questionsCount,
      score: domain.score,
      slug: domain.slug,
      totalTime: domain.totalTime,
      updatedAt: domain.updatedAt,
    }
  }
}
