import { Inject, Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model, PipelineStage, Types } from "mongoose"
import { IMapper } from "src/common/mapper"
import { Category, Mappers, Models } from "src/utils/constants"

import { PathDocument } from "../../../../database/mongo/models/path"
import { GetPathByIdArgs, IPathRepo, ListPathsArgs } from "./i-path.repo"
import { Path } from "./path.domain"
import { PathDTO } from "./path.dto"

type BuildFilterAggregatorArgs = {
  category?: Category
  language?: string
  pathId?: string
}

@Injectable()
export class PathRepo implements IPathRepo {
  constructor(
    @InjectModel(Models.paths) private readonly pathModel: Model<PathDocument>,
    @Inject(Mappers.path) private readonly pathMapper: IMapper<Path, PathDTO>,
  ) {}

  async getById(args: GetPathByIdArgs): Promise<null | Path> {
    const [existingPath] = await this.aggregate({
      language: args.language,
      pathId: args.pathId,
    })

    return existingPath ? this.pathMapper.toDomain(existingPath) : null
  }

  async list(args?: ListPathsArgs): Promise<Array<Path>> {
    const paths = await this.aggregate({
      category: args?.category,
      language: args?.language,
    })

    return paths.map(this.pathMapper.toDomain)
  }

  async save(args: Path): Promise<void> {
    await this.pathModel.findOneAndUpdate(
      { _id: new Types.ObjectId(args.pathId) },
      this.pathMapper.toPersistence(args),
      { new: true, upsert: true },
    )
  }

  private aggregate(args: BuildFilterAggregatorArgs) {
    const pipeline: Array<PipelineStage> = []

    if (args.pathId)
      pipeline.push({ $match: { _id: new Types.ObjectId(args.pathId) } })

    if (args.category) pipeline.push({ $match: { category: args.category } })
    pipeline.push({ $match: { deletedAt: { $exists: false } } })

    if (!args.language)
      pipeline.push({
        $set: {
          description: {
            $concatArrays: [
              {
                $filter: {
                  as: "item",
                  cond: {
                    $eq: ["$$item.language", "$defaultLanguage"],
                  },
                  input: "$description",
                },
              },
              {
                $filter: {
                  as: "item",
                  cond: {
                    $ne: ["$$item.language", "$defaultLanguage"],
                  },
                  input: "$description",
                },
              },
            ],
          },
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
          description: {
            $let: {
              in: {
                $cond: {
                  else: {
                    $filter: {
                      as: "item",
                      cond: { $eq: ["$$item.language", "$defaultLanguage"] },
                      input: "$description",
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
                    input: "$description",
                  },
                },
              },
            },
          },
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

    return this.pathModel.aggregate(pipeline)
  }
}
