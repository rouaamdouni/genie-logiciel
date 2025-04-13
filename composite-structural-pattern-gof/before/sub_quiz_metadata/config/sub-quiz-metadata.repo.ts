import { Inject, Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model, Types } from "mongoose"
import { IMapper } from "src/common/mapper"
import { Mappers, Models } from "src/utils/constants"

import { SubQuizDocument } from "../../../../database/mongo/models/sub-quiz"
import {
  GetQuizMetadataArgs,
  ISubQuizMetadataRepo,
} from "./i-sub-quiz-metadata.repo"
import { SubQuizMetadata } from "./sub-quiz-metadata.domain"
import { SubQuizMetadataDTO } from "./sub-quiz-metadata.dto"

@Injectable()
export class SubQuizMetadataRepo implements ISubQuizMetadataRepo {
  constructor(
    @InjectModel(Models.subQuizzes)
    private readonly subQuizModel: Model<SubQuizDocument>,
    @Inject(Mappers.subQuizMetadata)
    private subQuizMetadataMapper: IMapper<SubQuizMetadata, SubQuizMetadataDTO>,
  ) {}

  async get(args: GetQuizMetadataArgs): Promise<null | SubQuizMetadata> {
    const existingSubQuizMetadata = await this.subQuizModel.findOne({
      deletedAt: { $exists: false },
      question: new Types.ObjectId(args.questionId),
      quiz: new Types.ObjectId(args.quizId),
    })

    return existingSubQuizMetadata
      ? this.subQuizMetadataMapper.toDomain(existingSubQuizMetadata)
      : null
  }

  async list(quizId: string): Promise<Array<SubQuizMetadata>> {
    const subQuizzesMetadata = await this.subQuizModel.find({
      deletedAt: { $exists: false },
      quiz: new Types.ObjectId(quizId),
    })

    return subQuizzesMetadata.map(this.subQuizMetadataMapper.toDomain)
  }

  async save(args: SubQuizMetadata): Promise<SubQuizMetadata> {
    const savedSubQuizMetadata = await this.subQuizModel.findOneAndUpdate(
      {
        question: new Types.ObjectId(args.question),
        quiz: new Types.ObjectId(args.quiz),
      },
      this.subQuizMetadataMapper.toPersistence(args),
      { new: true, upsert: true },
    )

    return this.subQuizMetadataMapper.toDomain(savedSubQuizMetadata)
  }
}
