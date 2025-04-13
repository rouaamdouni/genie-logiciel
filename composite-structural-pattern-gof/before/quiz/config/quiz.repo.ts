import { Inject, Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model, PipelineStage, Types } from "mongoose"
import { IMapper } from "src/common/mapper"
import { Mappers, Models } from "src/utils/constants"

import { QuizDocument } from "../../../../database/mongo/models/quiz"
import { GetQuizByIdArgs, IQuizRepo } from "./i-quiz.repo"
import { Quiz } from "./quiz.domain"
import { QuizDTO } from "./quiz.dto"

type BuildFilterAggregatorArgs = {
  language?: string
  quizId?: string
}

@Injectable()
export class QuizRepo implements IQuizRepo {
  constructor(
    @InjectModel(Models.quizzes)
    private readonly quizModel: Model<QuizDocument>,
    @Inject(Mappers.quiz) private readonly quizMapper: IMapper<Quiz, QuizDTO>,
  ) {}

  async getById(args: GetQuizByIdArgs): Promise<null | Quiz> {
    const [existingQuiz] = await this.aggregate({
      language: args.language,
      quizId: args.quizId,
    })

    return existingQuiz ? this.quizMapper.toDomain(existingQuiz) : null
  }

  async save(args: Quiz): Promise<void> {
    await this.quizModel.findOneAndUpdate(
      { _id: new Types.ObjectId(args.quizId) },
      this.quizMapper.toPersistence(args),
      { new: true, upsert: true },
    )
  }

  private aggregate(args: BuildFilterAggregatorArgs) {
    const pipeline: Array<PipelineStage> = []

    if (args.quizId)
      pipeline.push({ $match: { _id: new Types.ObjectId(args.quizId) } })
    pipeline.push({ $match: { deletedAt: { $exists: false } } })

    if (!args.language)
      pipeline.push({
        $set: {
          label: {
            $concatArrays: [
              {
                $filter: {
                  as: "item",
                  cond: {
                    $eq: ["$$item.language", "$defaultLanguage"],
                  },
                  input: "$label",
                },
              },
              {
                $filter: {
                  as: "item",
                  cond: {
                    $ne: ["$$item.language", "$defaultLanguage"],
                  },
                  input: "$label",
                },
              },
            ],
          },
          metaTags: {
            $map: {
              as: "metaTagArray",
              in: {
                $concatArrays: [
                  {
                    $filter: {
                      as: "metaTag",
                      cond: { $eq: ["$$metaTag.language", "$defaultLanguage"] },
                      input: "$$metaTagArray",
                    },
                  },
                  {
                    $filter: {
                      as: "metaTag",
                      cond: { $ne: ["$$metaTag.language", "$defaultLanguage"] },
                      input: "$$metaTagArray",
                    },
                  },
                ],
              },
              input: "$metaTags",
            },
          },
        },
      })

    if (args.language)
      pipeline.push({
        $set: {
          label: {
            $let: {
              in: {
                $cond: {
                  else: {
                    $filter: {
                      as: "item",
                      cond: { $eq: ["$$item.language", "$defaultLanguage"] },
                      input: "$label",
                    },
                  },
                  if: { $gt: [{ $size: "$$languageMatch" }, 0] },
                  then: "$$languageMatch",
                },
              },
              vars: {
                languageMatch: {
                  $filter: {
                    as: "item",
                    cond: { $eq: ["$$item.language", args.language] },
                    input: "$label",
                  },
                },
              },
            },
          },
          metaTags: {
            $map: {
              as: "metaTagArray",
              in: {
                $let: {
                  in: {
                    $cond: {
                      else: {
                        $filter: {
                          as: "metaTag",
                          cond: {
                            $eq: ["$$metaTag.language", "$defaultLanguage"],
                          },
                          input: "$$metaTagArray",
                        },
                      },
                      if: { $gt: [{ $size: "$$languageMatch" }, 0] },
                      then: "$$languageMatch",
                    },
                  },
                  vars: {
                    languageMatch: {
                      $filter: {
                        as: "metaTag",
                        cond: { $eq: ["$$metaTag.language", args.language] },
                        input: "$$metaTagArray",
                      },
                    },
                  },
                },
              },
              input: "$metaTags",
            },
          },
        },
      })

    return this.quizModel.aggregate(pipeline)
  }
}
