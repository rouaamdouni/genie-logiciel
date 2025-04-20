import { HttpStatus, Inject, Injectable } from "@nestjs/common"

import {
  CreatePathItemArgs,
  CreatePathItemResult,
} from "../path_item/i-create-path-item-use-case"
import { TEntity } from "../utils/entity"
import { Repos } from "../utils/constants"
import { Left, Right } from "../utils/either"
import { generateId } from "../utils/generate-id"
import { Path } from "../path/path.domain"
import { IGraphRepo } from "../graph/i-graph.repo"
import { IPathRepo } from "../path/i-path.repo"
import { IPathItemRepo } from "./i-path-item.repo"

const entityCounters: Record<TEntity, keyof Path> = {
  skills: "skillsCount",
  superSkills: "superSkillsCount",
  checkpoints: "checkpointsCount",
  quizzes: "quizzesCount",
  rewards: "rewardsCount",
}
@Injectable()
export class CreatePathItemUseCase {
  constructor(
    @Inject(Repos.pathItem) private readonly pathItemRepo: IPathItemRepo,
    @Inject(Repos.path) private readonly pathRepo: IPathRepo,
    @Inject(Repos.graph) private readonly graphRepo: IGraphRepo,
  ) {}

  async execute(args: CreatePathItemArgs): Promise<CreatePathItemResult> {
    const existingPath = await this.pathRepo.getById({ pathId: args.pathId })
    if (!existingPath)
      return Left.create({
        code: "path_not_found",
        message: "path not found",
        status: HttpStatus.NOT_FOUND,
      })

    const existingEntity = await this.graphRepo.getByEntity(args.entityId)
    if (!existingEntity)
      return Left.create({
        code: "entity_not_found",
        message: "target entity not found",
        status: HttpStatus.NOT_FOUND,
      })

    const existingPathItem = await this.pathItemRepo.get({
      entityId: args.entityId,
      pathId: args.pathId,
    })

    if (existingPathItem)
      return Left.create({
        code: "path_item_exists",
        message: "Path item already exists",
        status: HttpStatus.CONFLICT,
      })

    const createdAt = new Date()
    const pathItemId = generateId()

    await this.pathItemRepo.save({
      createdAt,
      deletedAt: undefined,
      entity: args.entityId,
      entityType: existingEntity.entityType,
      path: args.pathId,
      pathItemId,
      updatedAt: createdAt,
    })

    const counterField = entityCounters[existingEntity.entityType]
    if (!counterField) {
      return Left.create({
        code: "invalid_entity_type",
        message: "Unsupported entity type",
        status: HttpStatus.BAD_REQUEST,
      })
    }

    await this.pathRepo.incrementCounter(args.pathId, counterField)
    await this.pathRepo.incrementCounter(args.pathId, "itemsCount")

    return Right.create({
      isSuccess: true,
      message: "Path item created successfully",
      payload: { pathItemId },
    })
  }
}
